import { jwtDecode } from 'jwt-decode';

function PayloadToken(token: string): IModelLoginRequest | null {
    try {
        const payload: IModelLoginRequest = jwtDecode(token);
        return payload;
    } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        return null;
    }
}
export { PayloadToken };