import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import ResponseCode from "../../../core/utils/ResponseCode";
const prisma = new PrismaClient();




class ExporController {

    public indexExport = async (req: Request, res: Response) : Promise<Response> => {
        try {
            const navigation = req.params.id;
            const data = await prisma.artikel.findMany({
                where: {
                    applicationId: parseInt(navigation),
                    isDownloaded: 'no'
                },
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
}

export default new ExporController();