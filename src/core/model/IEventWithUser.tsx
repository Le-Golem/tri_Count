import { IUser } from "./IUser";

export interface IEventWithUser {
    eventId: number;
    label: string;
    description: string;
    isActive: boolean;
    participate: { user: IUser, participateId: number }[];
}