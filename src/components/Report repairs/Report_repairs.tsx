import { Card, Col, Input, Form, Row, Select, Button, DatePicker } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cimage from '../upload/upload';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  imageUrl: string;
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
      const response = await axios.get("http://localhost:3000/coffee");
      setEditedCoffee(response.data);
    } catch (error) {
      console.error('Error fetching coffee data:', error);
    }
  };

  const handleInputChange = (changedValues: any, allValues: any) => {
    setEditedCoffee({ ...editedCoffee, ...allValues });
  };

  const handleImageChange = (imageUrl: string) => {
    setEditedCoffee((prevEditedCoffee: Coffee | null) => {
      if (prevEditedCoffee) {
        return { ...prevEditedCoffee, img: imageUrl };
      }
      return null;
    });
  };

  const saveChanges = async () => {
    try {
      await axios.post("http://localhost:3000/college", editedCoffee);
      form.resetFields();
      const result = await Swal.fire({
        title: 'ส่งคำร้องเพื่อซ่อมแซม เรียบร้อย',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        window.location.href = "/Warehouse";
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-left mb-4">แจ้งซ่อมอุปกรณ์</h2>
      <Row>
        {editedCoffee ? (
          <Card className='w-full h-full'>
            <Form
              form={form}
              layout="vertical"
              onValuesChange={handleInputChange}
              className='p-8'
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="title" label="ชื่ออุปกรณ์" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="technos" label="หมายเลขครุภัณฑ์" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Origin" label="ประเภทอุปกรณ์" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Process" label="สถานที่">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="Size" label="วันที่พบปัญหา" rules={[{ required: true }]}>
                    <DatePicker className="w-full" format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="Roastlevel" label="ความเร่งด่วน" rules={[{ required: true }]}>
                    <Select>
                      <Option value="ปกติ">ปกติ</Option>
                      <Option value="ด่วน">ด่วน</Option>
                      <Option value="ด่วนมาก">ด่วนมาก</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="price" label="ผู้แจ้ง" rules={[{ required: true }]}>
                    <Input className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="province" label="ผู้ดูแล">
                    <TextArea rows={1} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="about" label="รายละเอียดอาการเสีย">
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div className="text-black box-border mt-4 flex justify-end">
              <Link to="/">
                <Button className="bg-red-500 text-white">CANCEL</Button>
              </Link>
              <Button type="primary" onClick={saveChanges} className="bg-sky-500 ml-2">
                SAVE
              </Button>
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
