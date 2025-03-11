import { Card, Row, Col } from 'antd';
import { ShoppingCartOutlined, HomeOutlined, FileDoneOutlined, BarChartOutlined } from '@ant-design/icons';

const statusData = [
  { title: 'รออนุมัติ', count: '3', color: 'bg-sky-500', icon: <ShoppingCartOutlined className="text-6xl text-white/40" /> },
  { title: 'กำลังซ่อม', count: '2', color: 'bg-yellow-500', icon: <HomeOutlined className="text-6xl text-white/40" /> },
  { title: 'ส่งมอบงานแล้ว', count: '6', color: 'bg-green-500', icon: <FileDoneOutlined className="text-6xl text-white/40" /> },
  { title: 'ยกเลิก', count: '1', color: 'bg-red-500', icon: <BarChartOutlined className="text-6xl text-white/40" /> }
];

const Dashboard = () => {
  return (
    <div className="p-4 w-full">
      <Row gutter={[16, 16]} justify="space-between">
        {statusData.map((item, index) => (
          <Col xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
            <Card
              className={`shadow-md rounded-md ${item.color} text-white flex items-center justify-between`}
              bordered={false}
              style={{ height: '100px', display: 'flex', padding: '12px' }}
            >
              <div>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm">จำนวน {item.count} รายการ</p>
              </div>
              <div className="absolute bottom-2 right-4 opacity-30">{item.icon}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
