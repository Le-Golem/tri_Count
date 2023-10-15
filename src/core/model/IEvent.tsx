import { IUser } from "./IUser"

export interface IEvent {
    eventId : number , 
    Label : string , 
    description : string , 
    users : IUser[],
    isActive : boolean
}