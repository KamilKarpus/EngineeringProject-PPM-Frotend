import { UserData } from "./model/UserData";
import jwt_decode from "jwt-decode";
import { TokenDTO } from "./model/TokenDTO";
const initial : UserData = {
    token: "",
    userEmail: "",
    permissions: []
}

export class TokenManager{
    getUserData() : UserData{
        const token = localStorage.getItem('token');
        if(token){
            const encodedToken = jwt_decode<TokenDTO>(token);
            return new UserData(token, encodedToken.login, encodedToken.permissions);
        }
        return initial;
    }
    getToken() : string{
        const token = localStorage.getItem('token');
        return token ? token : "";
    }
    saveToken(token: string) : void{
        localStorage.setItem('token', token);
    }
    clear() :void{
        localStorage.clear();
    }
}