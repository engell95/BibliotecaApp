import axios from 'axios';
import { SessionData } from '../helpers';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class BookService {

    static async GetListBook() {
        const sessionData = SessionData() as IModelLoginRequest;
        let response: Array<IModelBook> = [] as Array<IModelBook>;
        await axios.get(`${API_BASE_URL}v1/Libro`,{
                headers: {
                    Authorization: `Bearer ${sessionData.token}`
                }
            })
            .then(reponsePost => {
                response = reponsePost.data.datos;
            })
            .catch(error => {
                console.log("🚀 ~ file: book.services.tsx ~ line 19 ~ BookService ~ GetListBook ~ error", error)
            });
        return response;
    }

    static NewBook = async (model: IModelBookRequest) => {
        
        const sessionData = SessionData() as IModelLoginRequest;
        const { data } = await axios.post(`${API_BASE_URL}v1/Libro`, model,{
            headers: {
                Authorization: `Bearer ${sessionData.token}`
            }
        });

        return data;
    }

    static EditBook = async (model: IModelBookRequest) => {
        
        const sessionData = SessionData() as IModelLoginRequest;
        const { data } = await axios.put(`${API_BASE_URL}v1/Libro/${model.id}`, model,{
            headers: {
                Authorization: `Bearer ${sessionData.token}`
            }
        });

        return data;
    }

    static DeleteBook = async (id :number) => {
        
        const sessionData = SessionData() as IModelLoginRequest;
        const { data } = await axios.delete(`${API_BASE_URL}v1/Libro/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionData.token}`
            }
        });

        return data;
    }

}

export { BookService };