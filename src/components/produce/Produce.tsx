import { Card, Col, Image, Row, Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Approval from '../Status/Approval';

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

function Produce() {
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // State เพื่อเก็บจำนวนสินค้าที่ผู้ใช้เลือก
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`http://localhost:3000/coffee/${id}`)
      .then(response => {
        setCoffee(response.data);
      })
      .catch(error => {
        console.error('Error fetching coffee:', error);
      });
  }, [id]);

  const addToCart = () => {
    // ทำการส่งข้อมูลไปยังตะกร้าสินค้า ตามที่คุณต้องการ
    const itemToAddToCart = {
      ...coffee,
      quantity: quantity
    };
    console.log('Item added to cart:', itemToAddToCart);
    // ส่วนของการเพิ่มสินค้าไปยังตะกร้าสินค้าจะต้องเขียนเพิ่มเติมตามที่คุณใช้งานระบบตะกร้าสินค้าของคุณ
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
      <Row justify={'space-between'} className='p-4'>
        {coffee ? (
          <Col span={24} className='p-4'>
            <Row gutter={20}>
              <Col span={12}>
                <Card className='h-full flex justify-center'>
                  <Image src={coffee.img} alt={coffee.title} className='rounded-lg' style={{ height: "500px" }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card className='w-full' style={{ height: "100%" }}>
                  <div className='text-2xl font-bold text-[#0E6BA8]'>{coffee.title}</div>
                  <div className='text-sx font-bold mt-2'>หมายเลขครุภัณฑ์ :{coffee.technos}</div>
                  <div className='text-sx font-bold mt-2'>ประเภทอุปกรณ์ : <span className='font-simibold pl-1'>{coffee.Origin}</span></div>
                  <div className='text-l font-bold mt-4'>สถานที่: <span className='font-simibold pl-1'>{coffee.Process}</span></div>
                  <div className='text-l font-bold mt-2'>วันที่พบปัญหา : <span className='font-simibold pl-1'>{coffee.Size}</span></div>
                  <div className='text-l font-bold mt-2'>ความเร่งด่วน : <span className='font-simibold pl-1'>{coffee.Roastlevel}</span></div>
                  <div className='text-l font-bold mt-2'>แจ้งโดย : <span className='font-simibold pl-1'>{coffee.price}</span></div>
                  <div className='text-l font-bold mt-2'>ผู้ดูแล : <span className='font-simibold pl-1'>{coffee.province}</span></div>
                  <div className='mt-8'>{coffee.about}</div>
                  <div className='flex space-x-4 text-black box-border mt-8'>
                  <Button type="primary" onClick={addToCart} className='bg-red-500'>Revise</Button>
                    <Button type="primary" onClick={addToCart} className='bg-sky-500'>Approved</Button>
                  </div>
                  <Approval> 

                  </Approval>

                 
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

export default Produce;
