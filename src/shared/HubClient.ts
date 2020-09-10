import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { Environment } from "../environment";
import { TokenManager } from "../authGuard/TokenMenager";

export class HubClient{
    private readonly _tokenManager: TokenManager;
    private readonly _connection : HubConnection;
    private readonly apiUrl : string;

    constructor(hubName: string){
        this.apiUrl = `${Environment.apiUrl}/${hubName}`;
        this._tokenManager = new TokenManager();
        this._connection = this.createConnection(this.apiUrl);
    }
    private  createConnection(apiUrl: string): HubConnection{
        const builder = this.configureConnection(apiUrl);
        const connection = builder.build();
        return connection;
    }
    private configureConnection(apiUrl: string) : HubConnectionBuilder{
        console.log(this._tokenManager.getToken());
        const builder = new HubConnectionBuilder()
        .withUrl(apiUrl, {accessTokenFactory: () => this._tokenManager.getToken() })
        .withAutomaticReconnect();
        return builder;
    }
    public start() : void{
        this._connection.start();
    }
    public joinGroup(group : string) : void{
    
        this._connection.start().then(()=>{
            if(this._connection.state === HubConnectionState.Connected)
            {
                this._connection.send('createResource',group);
            }
        });
    }
    public subscribe<T>(resource: string, callback: (data: T) => void) {
        this._connection.on(resource, callback);    
    }
}