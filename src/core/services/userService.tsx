import axios from "axios";
import { IAddUser } from "../model/IAddUser";
import { IUser } from "../model/IUser";

export class UserService {
    private readonly url: string = "http://localhost:3001";

    async getAllUsers(){
        try {
            const response = await axios.get(this.url + "/users");
            return response.data
        } catch (error) {
            return "error"
        }
    }

    async getUserById(userId : number) {
        try {
            const response = await axios.get(`${this.url}/users/${userId}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; 
        }
    }

    async create(user: IAddUser) {
        try {
            const response = await axios.post(`${this.url}/users`, user);

            if (response.status === 404){
                return "pb"
            }else {
                return response
            }
        } catch (error) {
            return error 
        }
    }

    async getById(userId : number) {
        try {
            const response = await axios.get(`${this.url}/user/${userId}`)
            if (response){
                return response
            }
        } catch (error) {
            return error 
        }
    }
}
const userService = new UserService(); 

export default userService