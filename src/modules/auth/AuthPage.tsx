import { Row } from "antd";
import { Outlet } from "react-router-dom";
import {useEffect} from "react";

const AuthPage = () => {

    useEffect(() =>{
        document.body.className ="bg-pattern";
        return () => {
            document.body.className ="";
        }
    });
    return ( 
        <div className="">
            <div>
                <Row justify="center" className="row-auth"  align="middle">
                    <div>
                        <Outlet />
                    </div>
                </Row>
            </div>
        </div>
    );
}

export { AuthPage };