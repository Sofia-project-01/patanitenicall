import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const MenuProduce: React.FC = () => {
  const items1 = [
    { key: '1', label: 'หน้าแรก', to: '/' },
    { key: '2', label: 'แจ้งซ่อม', to: '/Report_repairs' },
    { key: '3', label: 'ประวัติการแจ้ง', to: '/Warehouse' },
    // { key: '3', label: 'Category', to: '/CatigoryPageProduce' },
  ];

  return (
    <Layout>
      <Menu
        className='bg-white'
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ flex: 1, minWidth: 0,  backgroundColor:"#eaeaea"}}
      >
        {items1.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.to}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout>

  );
};
export default MenuProduce;

