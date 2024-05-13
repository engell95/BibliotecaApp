import {Layout} from 'antd';
import {Outlet} from 'react-router-dom';
import {Header,Sider,Footer} from './components'
const {Content} = Layout;

const MasterLayout = () =>
{
    return(
        <Layout style={{minHeight:"100vh"}}>
            <Sider/>
            <Layout className="layout-right">
                <Header/>
                <Content className="container">
                    <div className="site-layout-background">
                        <Outlet />
                    </div>
                </Content>
                <Footer/>
            </Layout>
        </Layout>
    );
};

export {MasterLayout};