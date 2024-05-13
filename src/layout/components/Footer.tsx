import {Layout} from "antd";

const Footer = () =>
{
    return(
        <Layout.Footer  style={{textAlign:'center', overflowY:'hidden'}}>
            Biblioteca App {new Date().getFullYear()} .
        </Layout.Footer>
    );
};

export {Footer};