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
        // Gestion spécifique pour une erreur 401 (Unauthorized)
        console.error('Erreur 401: Unauthorized');
        // Vous pouvez choisir de rejeter l'erreur ou de la gérer autrement
        throw error;
      } else {
        // Gérez les autres erreurs ici
        console.error('Erreur lors de la requête POST:', error);
        throw error; // Vous pouvez choisir de rejeter l'erreur ou de la gérer autrement
      }
    }
  }


  async find(params: string) {
    try {
      // Extraire l'access code de params
      const accessCode = params;
      console.clear();
      console.log(accessCode);
      
      // Effectuer la requête GET en utilisant l'access code comme en-tête Bearer
      if (accessCode) {
        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessCode}` // Utilisation du jeton Bearer
          }
        });
  
        if (response.status === 200) {
          // La requête a réussi
          console.log('Données récupérées:', response.data);
          return response.data;
        } else {
          // Gérez les autres codes de statut HTTP ici si nécessaire
          console.error('La requête a échoué avec le code de statut:', response.status);
          throw new Error('Erreur de requête');
        }
      }
    } catch (error) {
      // Gérez les erreurs ici
      console.error('Erreur lors de la requête GET:', error);
      throw error; // Vous pouvez choisir de rejeter l'erreur ou de la gérer autrement
    }
  }
 
}

const authService = new AuthService();

export default authService