import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Row,Table, Modal, Input,Tooltip } from "antd";
import { CheckCircleOutlined,LoadingOutlined ,CloseCircleOutlined,SaveOutlined} from '@ant-design/icons';
import { loanService } from '../../services';
import { IsAdmin,SessionData,handleApiResponse } from '../../helpers';
const Search = Input.Search;
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

const LoanPage = () => {
    const sessionData = SessionData() as IModelLoginRequest;
    const [loading, setLoading] = useState(false);
    const [lstLoan, setLstLoan] = useState([] as Array<IModelLoan>);
    const [lstFilter, setLstFilter] = useState([] as Array<IModelLoan>);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchListLoan();
    }, []);

    const changeModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const fetchListLoan = async () => {
        setLoading(true);
        let result = await loanService.GetListloan(IsAdmin(sessionData.role)?"":sessionData.idUser);
        setLstLoan(result);
        setLoading(false);
    }

    const search = (value: string) => {
        const filteredList = lstFilter.filter(item =>
            item.libro.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setLstFilter(filteredList);
    };

    const ActionRender = (text: string, record: IModelLoan, index: number) => {
        return (
            <React.Fragment>
                <Tooltip placement="topRight" title={"Devolver Libro"}>
                    <Button key={record.id} icon={<CheckCircleOutlined/>} type="ghost" onClick={e => { e.stopPropagation(); returnBook(record.id); }}/>
                </Tooltip>
            </React.Fragment>
        );
    }

    const returnBook = (id: number) => {
        const modal = Modal.success({
            icon: <LoadingOutlined />,
            title: "Regresando...",
            centered: true,
            content: "",
            okButtonProps:{ disabled: true }
        });

        loanService.ReturnLoan(id).then(() => {
            modal.update({
                icon: <SaveOutlined />,
                title: "Finalizado",
                content: "🚀 ~ Libro Devuelto!!",
                okButtonProps:{ disabled: false }
            });
            fetchListLoan();
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

    const columns: ColumnsType<IModelLoan> = [
        {
          title: 'Libro',
          render:(item) => <>{item.libro.nombre}</>
        },
        {
            title: 'Autor',
            render:(item) => <>{item.libro.autor}</>
        },
        {
            title: 'Fecha Prestamo',
            render:(item) => <>{ moment(item.fecha_Prestamo).format('DD/MM/YYYY')}</>
        },
        {
            title: 'Devolucion Esperada',
            render:(item) => <>{ moment(item.fecha_Devolucion_Esperada).format('DD/MM/YYYY')}</>
        },
        {
            title: 'Devolucion Real',
            render:(item) => <>{ item.fecha_Devolucion_Real?moment(item.fecha_Devolucion_Real).format('DD/MM/YYYY'):""}</>
        },
        {
            title: 'Usuario',
            dataIndex:'usuario'
        },
        {
            title: 'Acciones',
            dataIndex: 'ACCIONES',
            align:"center",
            render:ActionRender
        }
    ];

    return (
        <React.Fragment>
            <Row gutter={[16, 16]} justify="end" align="middle">
                <Col>
                    <Search type="search" placeholder="Buscar" onChange={e => search(e.target.value)}/>
                </Col>
            </Row>
            <Divider />
            <Row justify="center" align="middle">
                <Col flex="auto">
                    <Table scroll={{x:500}} columns={columns} rowKey="id" dataSource={ lstFilter.length > 0 ? lstFilter : lstLoan} size="small" loading={loading} />              
                </Col>
            </Row>
        </React.Fragment>
    )

}

export { LoanPage };