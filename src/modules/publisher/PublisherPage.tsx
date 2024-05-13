import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Row,Table, Input } from "antd";
import { EditOutlined,ClearOutlined} from '@ant-design/icons';
import { PublisherService } from '../../services';
const Search = Input.Search;
import type { ColumnsType } from 'antd/es/table';

const PublisherPage = () => {
    const [loading, setLoading] = useState(false);
    const [lstPublisher, setLsPublisher] = useState([] as Array<IModelPublisher>);
    const [lstFilter, setLstFilter] = useState([] as Array<IModelPublisher>);

    useEffect(() => {
        fetchLisAuthor();
    }, []);

    const fetchLisAuthor = async () => {
        setLoading(true);
        let result = await PublisherService.GetListPublisher();
        setLsPublisher(result);
        setLoading(false);
    }

    const search = (value: string) => {
        const filteredList = lstFilter.filter(item =>
            item.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setLstFilter(filteredList);
    };

    const ActionRender = (text: string, record: IModelAuthor, index: number) => {
        return (
            <React.Fragment>
                <Button key={record.id} icon={<EditOutlined />} type="ghost" onClick={e => { e.stopPropagation();}}/>
                <Divider type="vertical" />
                <Button key={record.id} icon={<ClearOutlined />} type="ghost" onClick={e => { e.stopPropagation();}}/>
            </React.Fragment>
        );
    }

    const columns: ColumnsType<IModelAuthor> = [
        {
          title: 'Editorial',
          dataIndex:'nombre'
        },
        {
            title: 'Acciones',
            dataIndex: 'ACCIONES',
            align:"center",
            render:ActionRender
        }
    ];
    
    return(
        <React.Fragment>
            <Row gutter={[16, 16]} justify="end" align="middle">
                <Col>
                    <Search type="search" placeholder="Buscar" onChange={e => search(e.target.value)}/>
                </Col>
            </Row>
            <Divider />
            <Row justify="center" align="middle">
                <Col flex="auto">
                    <Table scroll={{x:500}} columns={columns} rowKey="id" dataSource={ lstFilter.length > 0 ? lstFilter : lstPublisher} size="small" loading={loading} />              
                </Col>
            </Row>
        </React.Fragment>
    );
}

export{PublisherPage}