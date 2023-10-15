import axios from "axios"
import { IAddTransaction } from "../model/IAddTransactions";

export class TransactionService {
    private readonly url : string = "http://localhost:3001"

    async getAll() {
        try {
            const response = await axios.get(`${this.url}/transactions`)
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; 
        }
    }

    async create(transaction : IAddTransaction) {
        try {
            const response = await fetch('http://localhost:3001/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(transaction),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create the transaction');
            }
    
            const responseData = await response.json();
            console.log('transaction created:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

const transactionService = new TransactionService()

export default transactionService