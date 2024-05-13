import axios from "axios"
import {PayloadToken} from "../helpers/PayloadToken"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AccountService{
    static async Authenticate(model:IModelLogin)
    {
        const response:IModelLoginRequest= {} as IModelLoginRequest;
        await axios.post(`${API_BASE_URL}v1/Account/Login`, model)
        .then( reponsePost => {

            const dataToken = PayloadToken(reponsePost.data.token)
            if(dataToken == null){
                response.authenticate = false;
                response.message = "Error al leer el token.";
            }
            else{
                response.authenticate = true;
                response.token = reponsePost.data.token;
                response.expiration = reponsePost.data.expiration;
                response.authenticate = true;
                response.userName = dataToken.userName;
                response.email = dataToken.email;
                response.role = dataToken.role;
                response.idUser = dataToken.idUser;
            }
        })
        .catch( error => {
            response.authenticate = false;
            response.message = error.response.data;
        });
       return response;
    }
}

export {AccountService};