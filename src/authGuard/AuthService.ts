import { format } from "path";
import { HttpClient } from "../shared/HttpClient";
import { Environment } from "../environment";
import { SuccessfulResponse, ErrorResponse } from "./AuthResponse";

export class AuthService{
    private url: string = Environment.apiUrl;
    public async getCredential(name: string, password: string) : Promise<SuccessfulResponse>{
        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', name);
        formData.append('password', password);
        formData.append('client_id', 'ppm.WEB');
        formData.append('client_secret', 'secret');

        const result = await fetch(`${this.url}/connect/token`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formData.toString()
        }).then(async result=>{
            if(result.ok){
                return result;
            }else{
                const errorMessage = await result.json();
                throw new ErrorResponse(errorMessage.error, errorMessage.error_description);
            }
        });
        return result.json() as Promise<SuccessfulResponse>;

    }
}