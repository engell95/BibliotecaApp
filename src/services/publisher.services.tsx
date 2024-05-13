import axios from 'axios';
import { SessionData } from '../helpers';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class PublisherService {

    static async GetListPublisher() {
        const sessionData = SessionData() as IModelLoginRequest;
        let response: Array<IModelAuthor> = [] as Array<IModelAuthor>;
        await axios.get(`${API_BASE_URL}v1/Editorial`,{
                headers: {
                    Authorization: `Bearer ${sessionData.token}`
                }
            })
            .then(reponsePost => {
                response = reponsePost.data.datos;
            })
            .catch(error => {
                console.log("🚀 ~ file: publisher.services.tsx ~ line 19 ~ publisherService ~ GetListPublisher ~ error", error)
            });
        return response;
    }

}

export { PublisherService };