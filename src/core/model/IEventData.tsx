import { IEvent } from "./IEvent";
import { IParticipate } from "./IParticipate";

export interface IEventData {
    event: IEvent;
    totalExpenses: number;
    participate: IParticipate[];
}