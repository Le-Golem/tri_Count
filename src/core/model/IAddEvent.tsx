import { IUser } from "./IUser";

export interface IAddEvent {
    Label : string , 
    description : string , 
    users : IUser[] | null , 
    isActive : boolean , 
}