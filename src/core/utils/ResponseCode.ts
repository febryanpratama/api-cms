import { Response } from "express";


class ResponseResult {
    public successPost = ( res : Response, message : string ) => {
        return res.status( 201 ).json( {
            code : 201,
            status : true,
            message : message,
            result : null
        } );
    }

    public successGet = ( res : Response, data : any ) => {
        return res.status( 200 ).json( {
            code: 200,
            status : true,
            message : "Success",
            result : data
        } );
    }

    public error = ( res : Response, props : {
        code : number,
        status : boolean,
        message : string,
        result : any
    } ) => {
        return res.status( props.code ).json( {
            errorCode : props.code,
            status : false,
            message : props.message,
            data : props.result
        } );
    }
}

export default new ResponseResult()
