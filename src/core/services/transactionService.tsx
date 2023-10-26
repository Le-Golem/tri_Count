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
            const response = await axios.post(`${this.url}/transactions`, transaction)
            return response
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getUserById(userId: number) {
        try {
            const response = await axios.get(`${this.url}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    async deleteTransaction(transactionId: number) {
        try {
            const response = await axios.delete(`${this.url}/transactions/${transactionId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting transaction:', error);
            throw error;
        }
    }
    
}

const transactionService = new TransactionService()

export default transactionService