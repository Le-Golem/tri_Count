export interface ITransaction {
    transactionId: number;
    date: string;
    label: string;
    amount: number;
    sender: {
        userId: number;
    };
    receivers?: {
        userId: number;
    }[];
}