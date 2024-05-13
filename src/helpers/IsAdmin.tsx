const Admin = import.meta.env.VITE_ROL_ADMIN;

function IsAdmin(role: string): boolean {
 return role == Admin?true:false;
}

export { IsAdmin };