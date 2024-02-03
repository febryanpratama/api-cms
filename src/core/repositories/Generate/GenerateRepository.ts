import OpenAI from "openai";
import { ListGenerateText } from "../../../pages/GeneratePages/models/GenerateModel";
import ResponseCode from "../../utils/ResponseCode";


class GenerateRepository {
    public generateText = async(res:any, data : string) => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {

            const respData : any = await openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [
                    {
                        "role": "user",
                        "content": data
                    }
                ],
                max_tokens: 600
            })
    
    
            return {
                status: true,
                message: "Success",
                data: respData.choices[0].message.content
            }
        } catch (error:any) {
            return {
                status: true,
                message: error.message
            }
        }


    }

    public generateImage = async(res:any, data : string) => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {
            const respData : any = await openai.images.generate({
                model: "dall-e-2",
                prompt: data,
                n: 1,
                size: '256x256',
            })

            // const respData : any = {
            //     created: 1706805505,
            //     data: [
            //       {
            //         url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-AfLrfsWk5j9TUNhcVthVMKJW/user-jT6AhrXZkinmnwhMgDaM4ne5/img-bO8y46vi4hlGkGTKBKmtPWGb.png?st=2024-02-01T15%3A38%3A25Z&se=2024-02-01T17%3A38%3A25Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-01T08%3A50%3A10Z&ske=2024-02-02T08%3A50%3A10Z&sks=b&skv=2021-08-06&sig=gtFo0W9zDgMr%2BkL0P%2B6z5fxGODtp/ipucH7aCSpagQM%3D'
            //       }
            //     ]
            //   }

            return {
                status: true,
                data: respData.data[0].url
            }


        }catch(e:any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : e.message,
                result : null
            })
        }
    }


}

export default new GenerateRepository()