import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import ResponseCode from "../../../core/utils/ResponseCode";
const prisma = new PrismaClient();




class ApplcationController {

    public storeApp = async (req: Request, res: Response) : Promise<Response> => {

        const {name} = req.body;

        try {

            if(!name) return ResponseCode.error(res, {
                code: 400,
                status: false,
                message: 'Required Parameter',
                result: null
            })

            const data = await prisma.application.create({
                data: {
                    name: name
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

export default new ApplcationController();