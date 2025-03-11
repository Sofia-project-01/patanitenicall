import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Row, Image, Form, Input, InputNumber, Select } from 'antd';
import { Link, useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;
interface Coffee {
  id: number;
  title: string;
  technos: string;
  Size: number;
  Roastlevel: string;
  price: number;
  img: string;
  province: string;
}

const EditProduce: React.FC = () => {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [newCoffee, setNewCoffee] = useState<Coffee>({
    id: 0,
    title: '',
    technos: '',
    Size: 0,
    Roastlevel: '',
    price: 0,
    img: '',
    province: '',
  });
  const [_, setEditMode] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>(); // Get ID from URL parameters

  useEffect(() => {
    fetchData();
  }, [id]);
  
  useEffect(() => {
    if (coffees.length > 0) {
      setNewCoffee(coffees[0]);
    }
  }, [coffees]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/coffee/${id}`);
      setCoffees([response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleInputChange = (changedValues: any) => {
    setNewCoffee({
      ...newCoffee,
      ...changedValues,
    });
  };
  
  const updateCoffee = async () => {
    try {
      await axios.patch(`http://localhost:3000/coffee/${id}`, newCoffee);
      fetchData(); // เรียกใช้ fetchData เพื่อรีเฟรชข้อมูลหลังจากการอัปเดต
      setEditMode(null);
    } catch (error) {
      console.error('Error updating coffee:', error);
    }
  };
  

  return (
    <div>
      {/* <Card className='m-4 p-0' style={{ padding: "0px" }}>
        <h1 className='text-xl font-bold'>Your Account</h1>
        <Row>
          <p className='textsm text-neutral-600'>บัญชีของคุณ</p>
          <p className='textsm text-neutral-600'>/</p>
          <p className='textsm text-neutral-600'>แก้ไข</p>
        </Row>
        <Row className='mt-4'>
          <p className='textsm font-bold text-blue-700'>EditProduce</p>
          <p className='textsm font-bold text-neutral-600'>/</p>
          <p className='textsm font-bold text-neutral-600'><Link to="/AddProduce">AddProduce</Link></p>
        </Row>
      </Card> */}
      <Row gutter={[20, 20]} className='p-4'>
        {coffees.map(coffee => (
          <Col xs={24} sm={12} md={12} lg={24} xl={24} key={coffee.id}>
            <Card className='h-full w-full'>
              <Col className='flex justify-center'>
                <Col span={24} className='mt-4'>
                  <Col className='flex justify-center'>
                    <Image src={coffee.img} alt={coffee.title} className='rounded-lg' style={{ height: "200px" }} />
                  </Col>

                  <Form
                    layout="vertical"
                    initialValues={coffee}
                    onValuesChange={handleInputChange}
                  >
                    
                    <Row className='mt-8' gutter={8} justify={'space-between'}>
                <Col>
                  <Row gutter={8}>
                    <Col span={12}>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the Title!' }]}>
                      <Input min={0} className='w-[full]' />
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item name="technos" label="Technos" rules={[{ required: true, message: 'Please input the technos!' }]}>
                      <Input min={0} className='w-[full]' />
                    </Form.Item>
                    </Col>
                  </Row>
                  <Row  gutter={8}>
                  <Col span={12}>
                    <Form.Item name="Origin" label="Origin" rules={[{ required: true, message: 'Please input the Origin!' }]}>
                      <Input min={0} className='w-[full]' />
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item name="Process" label="Process" rules={[{}]}>
                      <Input min={0} className='w-[full]' />
                    </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col span={6}>
                    <Form.Item name="Size" label="Size" rules={[{required: true, message: 'Please input the price!' }]}>
                      <InputNumber min={0} className='w-[full]' />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                      <InputNumber min={0} className='w-[full]' />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item name="Roastlevel" label="Roast Level" rules={[{ required: true, message: 'Please select the roast level!' }]}>
                      <Select className='w-[full]'>
                        <Option value="Light">Light</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="Dark">Dark</Option>
                      </Select>
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item name="province" label="Province">
                      <Input className='w-[full]' />
                    </Form.Item>
                    </Col>
                    
                  </Row>
                </Col>
                <Col>
                  <Form.Item name="about" label="About">
                    <TextArea className='w-[600px]' rows={9} />
                  </Form.Item>
                </Col>
              </Row>
                    <Form.Item>
                      <Row className='justify-end space-x-4'>
                        <Link to="/Warehouse">
                          <Button className='bg-red-500 text-white'>
                            CANCELL
                          </Button>
                        </Link>
                        <Button className='bg-sky-500 text-white' onClick={updateCoffee}>
                          UPDATE
                        </Button>
                      </Row>
                    </Form.Item>

                  </Form>
                </Col>
              </Col>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EditProduce;
