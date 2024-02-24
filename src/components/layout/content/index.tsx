import { Outlet } from "react-router-dom";
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
const ContentLayout: React.FC = () => {

  return (
    <Layout.Content className="p-4">
          <Content>
            <Outlet/>
          </Content>
          </Layout.Content>
  );
};

export default ContentLayout;
