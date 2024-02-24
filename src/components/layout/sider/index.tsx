import {  Layout, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import MenuProduce from '../menu';
import ProfileAdmin from '../../proflie';
const SiderLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
        <Layout.Sider className='h-[100vh] '>
            <Sider className=' bg-white h-[100vh] '  width={200} style={{ background: colorBgContainer }}>
            <p className='p-4'>
                <ProfileAdmin />
            </p>
              <Layout>
                <MenuProduce />
              </Layout>
            </Sider>
        </Layout.Sider>
  );
};

export default SiderLayout;