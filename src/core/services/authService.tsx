import axios from "axios";
import { IPostLogin } from "../model/IPostLogin";
export class AuthService {

  async GetAccess(IPostLogin: IPostLogin) {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', IPostLogin);
    
      const accessCode = response.data.access_token;
      console.log(accessCode);
      return accessCode;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erreur 401: Unauthorized');
        throw error;
      } else {
        console.error('Erreur lors de la requête POST:', error);
        throw error; 
      }
    }
  }


  async find(params: string) {
    try {
      const accessCode = params;
      if (accessCode) {
        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessCode}` 
          }
        });
  
        if (response.status === 200) {
          console.log('Données récupérées:', response.data);
          return response.data;
        } else {
          console.error('La requête a échoué avec le code de statut:', response.status);
          throw new Error('Erreur de requête');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la requête GET:', error);
      throw error; 
    }
  }
 
}

const authService = new AuthService();

export default authService