import { useNavigate } from "react-router-dom";
import { HomeOutlined, ControlOutlined , ContainerOutlined, UserOutlined, ScheduleOutlined , ReadOutlined } from "@ant-design/icons"
import { Layout, Menu, MenuProps,Row } from "antd";
import logo from "../../assets/img/logo.png";
import { IsAdmin,SessionData } from '../../helpers';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const Sider = () => {
  const navigate = useNavigate();
 
  const onMenuClick: MenuProps['onClick'] = e => {
    let url =  e.key.split(',');
    navigate(url[0])
  }

  const sessionData = SessionData() as IModelLoginRequest;

  const items: MenuProps['items'] = [

    getItem('Inicio', '/home', <HomeOutlined />),
    getItem('Libros', '', <ReadOutlined  />, [
      getItem('Libros', 'book', <ReadOutlined  />),
      getItem('Prestamos', 'loan', <ScheduleOutlined />),
    ]),
    ...(IsAdmin(sessionData.role) ? [
      getItem('Autores', '/authors', <UserOutlined />),
      getItem('Editoriales', '/publishers', <ContainerOutlined />),
      getItem('Usuarios', '/users', <ControlOutlined />),
    ] : []),
  ];

  return (
    <Layout.Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Row justify="center" align="middle" gutter={[10, 10]}>
        <img src={logo} alt="logo" className="logo-layout" />
      </Row>
      <Menu
        defaultSelectedKeys={['/Home']}
        defaultOpenKeys={['/Home']}
        mode="inline"
        items={items}
        onClick={onMenuClick}
      />
    </Layout.Sider>
  )
}

export { Sider };