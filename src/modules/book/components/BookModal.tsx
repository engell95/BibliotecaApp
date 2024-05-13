import { useEffect, useState } from "react";
import { Modal, Input, Form, Row, Button, Divider, Col ,Select} from "antd"
import { SaveOutlined, CloseCircleOutlined ,UserOutlined,BookOutlined,ScheduleOutlined,NumberOutlined,LoadingOutlined } from "@ant-design/icons"
import {TypeAction,handleApiResponse} from "../../../helpers"
import TextArea from "antd/lib/input/TextArea";
import {AuthorService,PublisherService } from '../../../services';


const BookModal = ({ showModal, formData, onChange, Type, onSave,onLoad }: PropBook) => {

    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const [lstAuthor, setLstAuthor] = useState([] as Array<IModelAuthor>);
    const [lstPublisher, setPublisher] = useState([] as Array<IModelPublisher>);

    const fetchSelect = async () => {

        await AuthorService.GetListAuthor().then(response => {
            setLstAuthor(response)
        }).catch(error => {
            Modal.error({
                icon: <CloseCircleOutlined />,
                type: "error",
                title: "Error",
                content: handleApiResponse(error.response),
                okButtonProps:{ disabled: false }
            });
        });
        
        await PublisherService.GetListPublisher().then(response => {
            setPublisher(response)
        }).catch(error => {
            Modal.error({
                icon: <CloseCircleOutlined />,
                type: "error",
                title: "Error",
                content: handleApiResponse(error.response),
                okButtonProps:{ disabled: false }
            });
        });
        
        
    }

    const { Option } = Select;
    const children = lstAuthor.map((item)=> {
        return <Option key={item.id} value={item.id} >{item.nombre}</Option>
    }) 
    
    const childrenF = lstPublisher.map((item)=> {
        return <Option key={item.id} value={item.id} >{item.nombre}</Option>
    }) 

    useEffect(() => {
        fetchSelect();
    },[showModal]);

    return(
            <Modal {...layout} open={showModal} destroyOnClose={true} onCancel={onChange} title={TypeAction(Type,"Libro")} footer={false} centered>
                <Form initialValues={formData} onFinish={onSave}>
                    <Col>
                        <Form.Item name="id" required={true} hidden>
                            <Input disabled />
                        </Form.Item>
                    </Col >
                    <Col>
                        {Type === 1 ? (
                            <h3>{formData.nombre}</h3>
                        ) : (
                            <Form.Item label="Nombre" name="nombre" rules={[{ required: true,min:5,max:100}]}>
                                <Input /> 
                            </Form.Item>
                         )}
                    </Col>
                    <Col>
                        {Type === 1 ? (
                            <span><UserOutlined/> Autor: {formData.autor}</span>
                        ) : (
                            <Form.Item label="Autor" name="id_Autor" rules={[{ required: true, message: "Indique el Autor" }]} >
                                <Select placeholder="Seleccione" >
                                    {children}
                                </Select>
                            </Form.Item>
                        )}
                    </Col>
                    <Col>
                        {Type === 1 ? (
                            <span><BookOutlined /> Editorial: {formData.editorial}</span>
                        ) : (
                            <Form.Item label="Editorial" name="id_Editorial" rules={[{ required: true, message: "Indique la Editorial" }]} >
                                <Select placeholder="Seleccione" >
                                    {childrenF}
                                </Select>
                            </Form.Item>
                        )}
                    </Col>
                    <Col>
                        {Type === 1 ? (
                            <span><NumberOutlined/> Copias: {formData.copias}</span>
                        ) : (
                            <Form.Item label="Copias" name="copias" rules={[{ required: true}]}>
                                <Input type="number"/>
                            </Form.Item>
                        )}
                    </Col>
                    <Col>
                        {Type === 1 ? 
                        (
                            <>
                                <Divider/>
                                <span>Descripción: </span><br/>
                                <span>{formData.descripcion}</span>
                            </>
                        ) : 
                        (
                            <Form.Item label="Descripción" name="descripcion">
                                <TextArea />
                            </Form.Item>
                        )}
                       
                    </Col>
                    <Divider />
                    <Row justify="space-around">
                        <Button type="default" onClick={onChange} icon={<CloseCircleOutlined />} >
                            Cerrar
                        </Button>
                        { Type == 1?
                            <Button type="primary" onClick={() => onLoad(formData)} icon={<ScheduleOutlined />} >
                                Prestar
                            </Button>
                            :<></>
                        }
                        { Type == 2 || Type == 3?
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Guardar
                        </Button>
                        :<></>
                        }
                    </Row>
                </Form>
            </Modal>
    );
}

export { BookModal };