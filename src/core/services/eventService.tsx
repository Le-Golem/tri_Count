import axios from "axios";
import { IAddEvent } from "../model/IAddEvent";

export class EventService {
    private readonly url: string = "http://localhost:3001";

    async getAll() {
        try {
            const response = await axios.get(`${this.url}/event`);
            return response.data; // Return the data obtained from the server.
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; 
        }
    }

    async getByEventId(eventId : number) {
        try {
            const response = await axios.get(`${this.url}/events/${eventId}?eventId=${eventId}`);
            return response.data; 
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; 
        }
    }

    async create(event: IAddEvent) {
        try {
            const response = await axios.post(`${this.url}/events`, event);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error; 
        }
    }

    async deleteEvent(eventId: number) {
        try {
            const response = await axios.delete(`${this.url}/events/?eventId=${eventId}`);
            return response.data; // Vous pouvez retourner la réponse du serveur si nécessaire.
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}


const eventService = new EventService();

export default eventService;