import { IEvent } from "./IEvent";
import { IUser } from "./IUser";
export interface ITransaction{
    transactionId : number , 
    date : Date, 
    label : string , 
    amount : string , 
    sender : IUser,
    event : IEvent,
    receiver : IUser
} 