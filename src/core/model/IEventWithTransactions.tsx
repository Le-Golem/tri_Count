import { IEvent } from "./IEvent";

export interface IEventWithTransactions {
    event : IEvent,
    totalExpenses : number,
    expensesDetails : any
}