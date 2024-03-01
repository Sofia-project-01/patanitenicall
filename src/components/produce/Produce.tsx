import { Card, Col, Image, Row, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const [quantity, setQuantity] = useState<number>(1);
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
    const itemToAddToCart = {
      ...coffee,
      quantity: quantity
    };
    console.log('Item added to cart:', itemToAddToCart);
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
                <Row className='flex jutify-center'>
                  <Image src={coffee.img} alt={coffee.title} className='rounded-lg' style={{ height: "500px" }} />
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card className='w-full' style={{ height: "100%" }}>
                  <div className='text-2xl font-bold text-[#0E6BA8]'>{coffee.title}</div>
                  <div className='text-2xl font-bold mt-2'>฿ {coffee.price}</div>
                  <div className='text-2xl font-bold mt-2'>Size : {coffee.Size} g</div>
                  <div className='text-xl font-bold mt-2'>Roastlevel : <span className='font-simibold pl-1'>{coffee.Roastlevel}</span></div>
                  <div className='mt-8'>{coffee.about}</div>
                  <div className='text-l font-bold mt-4'>Origin : <span className='font-simibold pl-1'>{coffee.Origin}</span></div>
                  <div className='text-l font-bold mt-2'>Process : <span className='font-simibold pl-1'>{coffee.Process}</span></div>
                  <div className='text-l font-bold mt-2'>Tasting Notes : <span className='font-simibold pl-1'>{coffee.technos}</span></div>
                  <div className='font-sx'> จังหวัด{coffee.province}</div>

                  <div className='space-x-4 text-black box-border mt-8 '>
                    <Button onClick={decreaseQuantity}>-</Button>
                    <span>{quantity}</span>
                    <Button onClick={increaseQuantity}>+</Button>
                    <Button type="primary" onClick={addToCart} className='bg-sky-500'>Add to Cart</Button>
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

export default Produce;
