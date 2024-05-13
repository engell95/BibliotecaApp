interface IModelLogin {
    username: string = '';
    password: string = '';
}

interface IModelLoginRequest {
    token: string = '';
    expiration: string = '';
    authenticate:boolean = false;
    message: string = '';
    userName : string = '';
    email : string = '';
    role : string = '';
    idUser : string = '';
}

interface IModelAuthorized {
    auth: boolean;
}

interface IModelReducer {
    type: string;
    payload: IModelLoginRequest;
}

interface IModelAlert {
    message: string;
    type: string = "error" | "success" | "info" | "warning" | undefined;
}

interface IModelBook {
    id: number = 0;
    nombre: string;
    descripcion: string;
    copias: number;
    fecha_Publicacion: string; 
    id_Autor: number;
    autor: string;
    id_Editorial: number;
    editorial: string;
}

interface PropBook {
    showModal: boolean;
    formData: IModelBook;
    onChange: (event: React.MouseEvent) => void;
    Type: number;
    onSave: (form: any) => void;
    onLoad: (data: IModelBook) => void;
}

interface IModelBookRequest {
    id:number;
    id_Autor: number;
    id_Editorial: number;
    nombre: string;
    descripcion: string;
    copias: number;
    fecha_Publicacion: string; 
}

interface IModelAuthor {
    id: number;
    nombre: string;
    estado: boolean;
}

interface IModelPublisher {
    id: number;
    nombre: string;
    estado: boolean;
}

interface PropLoan {
    showModal: boolean;
    formData: IModelLoanModal;
    onChange: (event: React.MouseEvent) => void;
    Type: number;
}

interface IModelLoan {
    id: number;
    fecha_Prestamo: string;
    fecha_Devolucion_Esperada: string;
    fecha_Devolucion_Real: string | null;
    libro: IModelBook;
    id_Usuario: string;
    usuario: string;
}

interface IModelLoanRequest {
    fecha_Devolucion: date;
    id_Usuario: string;
    id_Libro:number
}

interface IModelLoanModal {
    id:number = 0;
    fecha_Devolucion: string;
    id_Usuario: string;
    id_Libro:number;
    autor:string;
    libro:string;
    editorial:string;
}

