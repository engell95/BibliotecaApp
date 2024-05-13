import axios from 'axios';
import { SessionData } from '../helpers';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AuthorService {

    static async GetListAuthor() {
        const sessionData = SessionData() as IModelLoginRequest;
        let response: Array<IModelEditorial> = [] as Array<IModelEditorial>;
        await axios.get(`${API_BASE_URL}v1/Autor`,{
                headers: {
                    Authorization: `Bearer ${sessionData.token}`
                }
            })
            .then(reponsePost => {
                response = reponsePost.data.datos;
            })
            .catch(error => {
                console.log("🚀 ~ file: author.services.tsx ~ line 19 ~ AuthorService ~ GetListAuthor ~ error", error)
            });
        return response;
    }

}

export { AuthorService };