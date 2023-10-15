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

    async create(event : IAddEvent) {
        try {
            const response = await fetch('http://localhost:3001/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(event),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create the event');
            }
    
            const responseData = await response.json();
            console.log('Event created:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

const eventService = new EventService();

export default eventService;