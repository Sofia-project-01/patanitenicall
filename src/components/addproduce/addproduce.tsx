import { Card, Col, Input, InputNumber, Form, Row, Select, Typography, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cimage from '../upload/upload';
const { Option } = Select;
const { TextArea } = Input;

interface Coffee {
  Origin: string;
  Process: string;
  technos: string;
  about: string;
  title: string;
  id: number;
  Size: number;
  img: string;
  price: number;
  Roastlevel: string;
  province: string;
}

function AddProduce() {
  const [editedCoffee, setEditedCoffee] = useState<Coffee | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCoffeeData();
  }, []);

  const fetchCoffeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/coffee`);
      setEditedCoffee(response.data);
    } catch (error) {
      console.error('Error fetching coffee data:', error);
    }
  };

  const handleInputChange = (changedValues: any, allValues: any) => {
    setEditedCoffee({ ...editedCoffee, ...allValues });
  };

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:3000/coffee`, editedCoffee);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div>
      <Row>
        {editedCoffee ? (
          <Card className='w-full h-full' >
            <Form
              form={form}
              layout="vertical"
              onValuesChange={handleInputChange}
              className='p-8'
            >
              <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Cimage onImageChange={function (imageUrl: string): void {
                  throw new Error('Function not implemented.');
                }} onImageUploadError={function (): void {
                  throw new Error('Function not implemented.');
                }} />
              </Col>
              <Row className='space-x-4' justify={'space-evenly'}>
                <Col>
                  <Row className='space-x-4'>
                    <Col>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the Title!' }]}>
                      <Input min={0} className='w-[250px]' />
                    </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="technos" label="Technos" rules={[{ required: true, message: 'Please input the technos!' }]}>
                      <Input min={0} className='w-[250px]' />
                    </Form.Item>
                    </Col>
                  </Row>
                  <Row className='space-x-4'>
                  <Col>
                    <Form.Item name="Origin" label="Origin" rules={[{ required: true, message: 'Please input the Origin!' }]}>
                      <Input min={0} className='w-[250px]' />
                    </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="Process" label="Process" rules={[{}]}>
                      <Input min={0} className='w-[250px]' />
                    </Form.Item>
                    </Col>
                  </Row>
                  <Row className='space-x-4'>
                  <Col>
                    <Form.Item name="Roastlevel" label="Roast Level" rules={[{ required: true, message: 'Please select the roast level!' }]}>
                      <Select style={{ width: '100%' }}>
                        <Option value="Light">Light</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="Dark">Dark</Option>
                      </Select>
                    </Form.Item>
                    </Col>
                    <Col>
                    </Col>
                    <Form.Item name="Size" label="Size" rules={[{required: true, message: 'Please input the price!' }]}>
                      <InputNumber min={0} className='w-[100px]' />
                    </Form.Item>
                    
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                      <InputNumber min={0} className='w-[94px]' />
                    </Form.Item>
                    <Form.Item name="province" label="Province">
                      <Input />
                    </Form.Item>
                  </Row>
                </Col>
                <Col>
                  <Form.Item name="about" label="About">
                    <TextArea className='w-[600px]' rows={9} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div className='text-black box-border mt-4 flex justify-end '>
              <Button type="primary" onClick={saveChanges} className='bg-sky-500'>Update</Button>
            </div>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </div>
  );
}

export default AddProduce;
