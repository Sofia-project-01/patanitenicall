import { Card, Col, Image, Row, Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

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

function EditForm() {
  const [form] = Form.useForm();
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [editedCoffee, setEditedCoffee] = useState<Coffee | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`http://localhost:3000/coffee/${id}`)
      .then(response => {
        setCoffee(response.data);
        setEditedCoffee(response.data);
        form.setFieldsValue(response.data);
      })
      .catch(error => {
        console.error('Error fetching coffee:', error);
      });
  }, [id, form]);

  const addToCart = () => {
    const itemToAddToCart = {
      ...editedCoffee,
      quantity: quantity
    };
    console.log('Item added to cart:', itemToAddToCart);
  };

  const handleInputChange = (changedValues: any, allValues: any) => {
    setEditedCoffee(allValues);
  };

  const saveChanges = () => {
    form.validateFields().then(values => {
      axios.put(`http://localhost:3000/coffee/${id}`, values)
        .then(response => {
          console.log('Changes saved successfully:', response.data);
          setCoffee(response.data);
          setEditedCoffee(response.data);
        })
        .catch(error => {
          console.error('Error saving changes:', error);
        });
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <Row justify={'space-around'}>
        {editedCoffee ? (
          <Col span={24} className=''>
            <Row gutter={20}>
              <Col>
                <div className='h-full flex justify-center'>
                    <img src={editedCoffee.img} alt={editedCoffee.title} className='rounded-full' style={{ height: "200px" }}/>
                </div>
              </Col>
              <Col span={12}>
                <Card className='w-full h-full' >
                  <Form
                    form={form}
                    layout="vertical"
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
                  </Form>
                  <div className='space-x-4 text-black box-border mt-8 '>
                    <Button onClick={decreaseQuantity}>-</Button>
                    <span>{quantity}</span>
                    <Button onClick={increaseQuantity}>+</Button>
                    <Button type="primary" onClick={addToCart} className='bg-sky-500'>Add to Cart</Button>
                    <Button type="primary" onClick={saveChanges} className='bg-sky-500'>Save</Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </div>
  );
}

export default EditForm;
