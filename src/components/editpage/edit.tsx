import { EditOutlined, EnvironmentOutlined } from '@ant-design/icons';

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
  const [editMode, setEditMode] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>(); // Get ID from URL parameters

  useEffect(() => {
    fetchData();
    if (coffees.length > 0) {
      setEditMode(coffees[0].id);
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
      fetchData();
      setEditMode(null);
    } catch (error) {
      console.error('Error updating coffee:', error);
    }
  };

  return (
    <div>
      <Card className='m-4 p-0' style={{ padding: "0px" }}>
        <h1 className='text-xl font-bold'>Your Account</h1>
        <Row>
          <p className='textsm text-neutral-600'>บัญชีของคุณ</p>
          <p className='textsm text-neutral-600'>/</p>
          <p className='textsm text-neutral-600'>แก้ไข</p>
        </Row>
        <Row className='mt-4'>
          <p className='textsm font-bold text-blue-700'>EditProduce</p>
          <p className='textsm font-bold text-neutral-600'>/</p>
          <p className='textsm font-bold text-neutral-600'><Link to="/AddProducePage">AddProduce</Link></p>
        </Row>
      </Card>
      <Row gutter={[20, 20]} className='p-4'>
        {coffees.map(coffee => (
          <Col xs={24} sm={12} md={12} lg={12} xl={24} key={coffee.id}>
            <Card className='h-full w-full'>
              <Col className='flex justify-center'>
                <Image src={coffee.img} alt={coffee.title} className='rounded-lg' style={{ height: "200px" }} />
              </Col>
              <Col className='mt-4'>
                <Form
                  layout="vertical"
                  initialValues={coffee}
                  onValuesChange={handleInputChange}
                >
                 <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the Title!' }]}>
                      <Input min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="technos" label="Technos" rules={[{ required: true, message: 'Please input the technos!' }]}>
                      <Input min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="Roastlevel" label="Roast Level" rules={[{ required: true, message: 'Please select the roast level!' }]}>
                      <Select style={{ width: '100%' }}>
                        <Option value="Light">Light</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="Dark">Dark</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="Origin" label="Origin" rules={[{ required: true, message: 'Please input the Origin!' }]}>
                      <Input min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="Process" label="Process" rules={[]}>
                        <Input min={0} style={{}}></Input>
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="Size" label="Size" rules={[{}]}>
                        <InputNumber min={0} style={{}}/>
                    </Form.Item>
                   
                    <Form.Item name="about" label="About">
                      <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="province" label="Province">
                      <Input />
                    </Form.Item>
                  <Form.Item>
                    <Row className='justify-end space-x-4'>
                    <Link to="/Warehouse">
                      <Button className='bg-red-500 text-white' onClick={updateCoffee}>
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
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EditProduce;
