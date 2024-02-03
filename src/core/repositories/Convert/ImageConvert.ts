import fs from 'fs';
import axios from 'axios';
import { Request,Response } from 'express';
import { randomUUID } from 'crypto';


class ImageConvert {
    public downloadImage = async(res : Response, url : string) => {

        try {
            const responseImage : any = await axios.get(url, {responseType: 'arraybuffer'});
    
            const nameImage = new Date().getTime();
            const imagePath = 'public/images/'+nameImage+'.png'; // Set the desired path
            fs.writeFileSync(imagePath, responseImage.data);
    
            return {
                status: true,
                data: imagePath
            }
            
        } catch (error:any) {
            return {
                status: false,
                messages: error.message
            }            
        }
    }
}

export default new ImageConvert();