import { IParticipate } from "./IParticipate";
import { ITransaction } from "./ITransaction";

export interface IEvent {
    eventId : number , 
    label : string , 
    description : string , 
    isActive : boolean , 
    date : Date , 
    participate : IParticipate[], 
    transactions : ITransaction[]
}