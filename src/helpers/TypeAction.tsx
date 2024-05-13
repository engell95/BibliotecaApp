
function TypeAction(type: number,objeto:string): string {
let Result:string;
switch (type) {
    case 1:
      Result = `Detalle`;
      break;
    case 2:
      Result = `Crear ${objeto}`;
      break;
    case 3:
     Result = `Editar ${objeto}`;
      break;
    case 4:
      Result = `Prestar libro`;
      break;
    default:
      Result = "accion desconocida";
      break;
  }

  return Result;
}
export { TypeAction };