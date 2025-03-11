import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import MenuProduce from '../menu';
import ProfileAdmin from '../../proflie';

const SiderLayout: React.FC = () => {
  return (
    <Layout.Sider className='h-[100vh]'>
      <Sider style={{ backgroundColor: '#eaeaea' }} className='h-[100vh]' width={200}>
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
