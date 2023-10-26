import { ITransaction } from "./ITransaction";

export interface IEvent {
    eventId: number;
    date: string;
    label: string;
    description: string;
    isActive: boolean;
    transactions: ITransaction[];
}
