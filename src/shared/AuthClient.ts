import { HttpClient } from "./HttpClient";
import { AuthService } from "../authGuard/AuthService";
import { TokenManager } from "../authGuard/TokenMenager";
import { MOVED_TO_THE_NEXT_PAGE } from "../core.module/actions/productionFlowActions";

export default class AuthClient{
    private readonly _httpClient: HttpClient;
    private readonly _authService : AuthService;
    private readonly _tokenManager: TokenManager;

    constructor(){
        this._tokenManager = new TokenManager();
        this._authService =  new AuthService();
        this._httpClient = new HttpClient();
    }

    public async Post<Body, Response>(url : string, body : Body) : Promise<Response> {
       var result = await this._httpClient.Post<Body,Response>(url, body)
                    .catch(async err =>{
                        if(err.message === '"User context is not available"'){
                            await this._authService.refreshToken(this._tokenManager.getRefreshToken())
                            .then(response =>{
                                this._tokenManager.saveToken(response.access_token, response.refresh_token);
                            });
                            return await this.Post<Body, Response>(url, body);
                        }
                        else{
                            throw err;
                        }
                    });
        return result as Response;
        
    }
    public async Get<Response>(url : string) : Promise<Response>{
        var result = await this._httpClient.Get<Response>(url)
                    .catch(async err =>{
                        console.log(err);
                        if(err.message === "User context is not available"){
                        
                            await this._authService.refreshToken(this._tokenManager.getRefreshToken())
                            .then(response =>{
                                this._tokenManager.saveToken(response.access_token, response.refresh_token);
                            });
                            return await this.Get<Response>(url);
                        }
                    });
        return result as Response;
    }
    public async Put<Body>(url: string, body: Body){
        await this._httpClient.Put<Body>(url, body)
                    .catch(async err =>{
                        if(err.message === '"User context is not available"'){
                            await this._authService.refreshToken(this._tokenManager.getRefreshToken())
                            .then(response =>{
                                this._tokenManager.saveToken(response.access_token, response.refresh_token);
                            });
                            return await this.Put<Body>(url, body);
                        }
                    });
    }


}