import {
    BrowserRouter as Router,
    Route,
    Routes as Switch

} from "react-router-dom";
import { useSelector } from "react-redux";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";


const Routes = () => {
    const baseNameUrl =  localStorage.getItem('ruta') ?? "";
    const isAuthorized:IModelAuthorized =  useSelector((state:IModelAuthorized) => state);
    return (
        <Router basename={baseNameUrl}>
            <Switch>
                <Route  path="*" element={!isAuthorized.auth ? <PublicRoutes/> : <PrivateRoutes/>} />
            </Switch>
        </Router>
    );
}


export { Routes };