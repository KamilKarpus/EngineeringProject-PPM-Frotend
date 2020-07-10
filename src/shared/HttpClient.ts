import { ErrorResponse } from "./ErrorResponse";

export class HttpClient{
    public async Post<Body, Response>(url : string, body : Body) : Promise<Response> {
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers:{'Content-Type': 'application/json'}
            }).then(async result=>{
                if(result.ok){
                    return result;
                }else{
                    const errorMessage = await result.json();
                    throw new ErrorResponse(errorMessage.errorCode, errorMessage.message);
                }
            })
        return await result.json() as Promise<Response>;
        
    }
    public async Get<Response>(url : string) : Promise<Response>{
        const result = await fetch(url,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'}
        }).then(async result=>{
            if(result.ok){
                return result;
            }else{
                const errorMessage = await result.json();
                throw new ErrorResponse(errorMessage.errorCode, errorMessage.message);
            }
        })
        return await result.json() as Promise<Response>;
    }

}