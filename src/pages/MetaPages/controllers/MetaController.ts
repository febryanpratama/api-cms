import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import ResponseCode from "../../../core/utils/ResponseCode";
const prisma = new PrismaClient();

interface InterfaceMeta {
    application_id: number,
    type: string,
    keyword: string

}


class MetaController {

    public indexMeta = async (req: Request, res: Response) : Promise<Response> => {
        try {
            const navigation = req.params.id;
            console.log(navigation);
            const data = await prisma.metaAi.findMany({
                where: {
                    applicationId: parseInt(navigation)
                }
            });
            return ResponseCode.successGet(res, data);
        } catch (error:any) {
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: error.message,
                result: null
            })
        }
    }

    public storeMeta = async (req: Request, res: Response) : Promise<Response> => {

        const {application_id, type, keyword } = req.body;

        try {
            if(!application_id || !type || !keyword) return ResponseCode.error(res, {
                code: 400,
                status: false,
                message: 'Required Parameter',
                result: null
            })

            const checkApp = await prisma.application.findFirst({
                where: {
                    id: application_id,
                }
            })

            if(!checkApp) return ResponseCode.error(res, {
                code: 400,
                status: false,
                message: 'Application already exist',
                result: null
            })

            const data = await prisma.metaAi.create({
                data: {
                    applicationId: application_id,
                    type: type,
                    keyword: keyword
                }
            })

            return ResponseCode.successPost(res, 'Success create application');
        } catch (error:any) {
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: error.message,
                result: null
            })
        }

    }

}

export default new MetaController();