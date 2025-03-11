import React from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';

const { Header } = Layout;

const menu = (
  <Menu
    items={[
      { key: '1', label: 'Profile' },
      { key: '2', label: 'Settings' },
      { key: '3', label: 'Logout' },
    ]}
  />
);

const HeaderLayout: React.FC = () => {
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> {/* ลด gap */}
          <BellOutlined style={{ fontSize: '20px', color: 'white', cursor: 'pointer' }} />
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar
              size="large"
              icon={<UserOutlined style={{ color: 'white' }} />}
              style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
            />
          </Dropdown>
        </div>
      </Header>
    </Layout>
  );
};

export default HeaderLayout;
