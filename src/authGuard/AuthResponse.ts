export interface SuccessfulResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

export class ErrorResponse extends Error{ 
    public error: string;
    public errorDescription: string;
    constructor(error: string, error_description: string){
        super(error_description);
        this.error = error;
        this.errorDescription = error_description;
    }
}