export interface IAddTransaction {
    date: Date;
    label: string;
    amount: number;
    senderId: number;
    eventId: number;
    receiverId?: number[];
}
