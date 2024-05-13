import { useState } from "react";
import { Modal, Input, Form, DatePicker, Col,Button,Row,Divider } from "antd"
import {UserOutlined,BookOutlined,SaveOutlined,CloseCircleOutlined,LoadingOutlined } from "@ant-design/icons"
import {TypeAction,handleApiResponse} from "../../../helpers"
import { loanService} from '../../../services';
import locale from "antd/lib/date-picker/locale/es_ES";

const LoanModal = ({ showModal, formData, onChange, Type }: PropLoan) => {
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (date: moment.Moment | null) => {
        if (date) {
            const utcDate = date?.utc();
            setSelectedDate(utcDate?.toISOString());
            console.log('Fecha seleccionada en UTC:', utcDate?.toISOString());
        }
    };

    const save = (form: IModelLoanRequest) => {

        const modal = Modal.success({
            icon: <LoadingOutlined />,
            title: "Guardando...",
            centered: true,
            content: "Se esta guardando el prestamo",
            okButtonProps:{ disabled: true }
        });    

        //format date
        form.fecha_Devolucion = selectedDate;

        var result = Type == 3? loanService.NewLoan(form) : loanService.NewLoan(form);
    
        result.then(() => {
            modal.update({
                icon: <SaveOutlined />,
                title: "Guardado",
                content: "🚀 ~ Libro Prestamo!!",
                onOk: onChange,
                okButtonProps:{ disabled: false }
            });
        }).catch((error:any) => {
            
            modal.update({
                icon: <CloseCircleOutlined />,
                type: "error",
                title: "Error",
                content: handleApiResponse(error.response),
                okButtonProps:{ disabled: false }
            });
        });
    } 
    
    return(
        <Modal {...layout} open={showModal} destroyOnClose={true} onCancel={onChange} title={TypeAction(Type,"Prestamo")} footer={false} centered>
            <Form initialValues={formData} onFinish={save}>
                <Col>
                    <Form.Item name="id" required={true} hidden>
                        <Input disabled />
                    </Form.Item>
                </Col >
                <Col>
               
                    <Form.Item label="id_Libro" name="id_Libro" required={true} hidden>
                        <Input type="number" value={formData.id_Libro} />
                    </Form.Item>

                    <Form.Item name="id_Usuario" required={true} hidden>
                        <Input value={formData.id_Usuario} />
                    </Form.Item>

                    {Type === 4 ? (
                        <>
                            <h3> {formData.libro} </h3>
                            <span><UserOutlined/> Autor: {formData.autor}</span><br/>
                            <span><BookOutlined/> Editorial: {formData.editorial}</span>
                        </>
                    ) : (
                        <></>
                    )}
                    <Divider />
                    <Form.Item label="Fecha Devolucion" name="fecha_Devolucion" required={true}>
                        <DatePicker locale={locale}  format={"DD/MM/yyyy"} onChange={handleDateChange}  />
                    </Form.Item>
                    <Divider />
                    <Row justify="space-around">
                        <Button type="default" onClick={onChange} icon={<CloseCircleOutlined />} >
                            Cerrar
                        </Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                            Guardar
                        </Button>
                    </Row>
                </Col>

            </Form>
        </Modal>
        
    );
}

export { LoanModal };