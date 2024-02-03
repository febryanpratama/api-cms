import { Request, Response } from "express";
import OpenAI from "openai";
import { config as dotenv } from 'dotenv';
import ResponseCode from "../../../core/utils/ResponseCode";
import { ListGenerateText } from "../models/GenerateModel";
import GenerateRepository from "../../../core/repositories/Generate/GenerateRepository";
import ImageConvert from "../../../core/repositories/Convert/ImageConvert";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


interface InterfacePrompt {
    prompt: string,
}




class GenerateController {

    public generateAiText = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});
        
        try {
            const {prompt} : InterfacePrompt = req.body;

            if(!prompt) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Prompt is required',
                result : null
            })

            const respText : any = await GenerateRepository.generateText(res, prompt);

            if(respText === false) return ResponseCode.error(res, respText.message);

            return ResponseCode.successGet(res, respText.data);

        } catch (e:any) {

            return ResponseCode.error( res, {
                code : 500,
                status : false,
                message : e.message,
                result : null
            })
            
        }

    }

    public generateAiImage = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {

            const {prompt} : InterfacePrompt = req.body;

            if(!prompt) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Prompt is required',
                result : null
            })

            const respImage : any = await GenerateRepository.generateImage(res, prompt);

            if(respImage === false) return ResponseCode.error(res, respImage.message);

            const respConvert :any = await ImageConvert.downloadImage(res, respImage.data);

            if(respConvert === false) return ResponseCode.error(res, respConvert.message);

            const respData : any = {
                urlimage : respConvert.data,
            }
            return ResponseCode.successGet(res, respData);

        }catch(err: any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : err.message,
                result : null
            })
        }
    }

    public generateArtikel = async(req: Request, res: Response) : Promise<Response> => {
        const {application_id} = req.body;
        try{

            if(!application_id) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Application ID is required',
                result : null
            })
            const respMeta = await prisma.metaAi.findMany({
                where: {
                    applicationId: application_id,
                }
            })

            if(!respMeta) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Application not found',
                result : null
            })

            let getRandMeta = respMeta[Math.floor(Math.random() * respMeta.length)];

            if(!getRandMeta) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Meta not found',
                result : null
            })

            let prompt :string = "sebagai seorang profesional pembuat konten web, tolong buatkan suatu artikel dan sajikan dalam maksimal 50 kata dan dibagi menjadi tiga paragraf serta sajikan dalam bentuk code WYSIWYG untuk tampil di halaman pertama mesin pencarian berdasarkan deskripsi berikut ini: " + getRandMeta.keyword;


            const respText : any = await GenerateRepository.generateText(res, prompt);

            let promptTitle : string  = "Buatkan Title Konten dari artikel berikut : "+respText.data;

            const respTitle : any = await GenerateRepository.generateText(res, promptTitle);

            let promptImage = "sebagai seorang graphic designer profesional, buatkan gambar tanpa ada teks di dalam gambar, dengan size maksimal 100kb dengan deskripsi berikut : Kantor Pusat, Berikat";

            const responseImage : any = await GenerateRepository.generateImage(res, promptImage);

            const respConvert :any = await ImageConvert.downloadImage(res, responseImage.data);

            let responseData : any = {
                title: respTitle.data,
                content: respText.data,
                image: respConvert.data
            }

            const storeData : any = await prisma.artikel.create({
                data: {
                    applicationId: application_id,
                    title: respTitle.data,
                    content: respText.data,
                    image: respConvert.data,
                    isDownloaded: 'no'
                }
            })

            return ResponseCode.successGet(res, storeData);
            // return ResponseCode.successGet(res, getRandMeta);
        }catch(err: any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : err.message,
                result : null
            })
        }
    }
}

export default new GenerateController();