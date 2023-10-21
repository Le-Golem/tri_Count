import { IParticipate } from "./IParticipate";

export interface IUser {
    userId : number ,
    username : string ,
    password : string ,  
    email : string , 
    participate: IParticipate[]
}