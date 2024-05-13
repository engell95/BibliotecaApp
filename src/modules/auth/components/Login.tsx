import { useState } from "react";
import { Alert, Button, Form, Input, Row, Spin,Card, Typography } from "antd";
import logo from "../../../assets/img/logo.png";
import { AccountService } from "../../../services/index";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import { InitSession} from '../../../actions/index';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<IModelAlert | undefined>(undefined);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogin = async (data: IModelLogin) => {
        setIsLoading(true);
        const result = await AccountService.Authenticate(data);
        setIsLoading(false);
        if(result.authenticate)
        {
            dispatch(InitSession(result));
            navigate("/home");
        }else{
            setAlertMessage({ message: result.message as string, type: "error" });
        }
    }

    return (
        <Card
            hoverable 
            style={{width:350}}
            className="login-container"
        >
            <Row
                justify="center" 
            >
                <Spin spinning={isLoading}>
                    <Row justify="center" align="middle">
                        <img className="logo-auth" src={logo} alt="logo"/>
                    </Row>
                    <Row justify="center" >
                        <Typography.Title level={4}>Biblioteca App</Typography.Title>
                    </Row>
                    <Form
                        name="basic"
                        layout="vertical"
                        initialValues={{remember:true}}
                        onFinish={onLogin}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Usuario"
                            name="username"
                            rules={[{required:true,message:"Debe ingresar su usuario!"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Contraseña"
                            name="password"
                            rules={[{required:true,message:"Debe ingresar su contraseña!"}]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset:8,span:16}}>
                            <Button type="primary" htmlType="submit">
                                Ingresar
                            </Button>
                        </Form.Item>
                        {alertMessage?.message && <Alert message={alertMessage.message} type="error" />}
                    </Form>
                </Spin>
            </Row>
        </Card>
    );
}

export { Login };
