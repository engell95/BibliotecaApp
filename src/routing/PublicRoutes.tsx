import { Navigate,Route,Routes } from "react-router-dom";
import { AuthPage,Login} from '../modules/auth/Index';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}>
                <Route path="login" element={<Login/>}></Route>
                <Route index element={<Navigate to="/login" />}/>
                <Route path="*" element={<Navigate to="/login"/>} />
            </Route>
        </Routes>
    )
}

export {PublicRoutes}