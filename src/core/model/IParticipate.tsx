import { IEvent } from "./IEvent";
import { IUser } from "./IUser";

export interface IParticipate {
    event : IEvent 
    user  : IUser
    participateId: number
}