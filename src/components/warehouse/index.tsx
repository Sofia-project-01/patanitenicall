import React from 'react';
import {  Row, Button } from 'antd';
import TeblePage from './teble';
import { Link } from 'react-router-dom';
const Warehouse: React.FC = () => {

  return (
    <div>
      <Row className='space-x-2 flex justify-end'>
        <Link to="/AddProduce"> <Button className='bg-sky-500 w-[100px] pr-2 pl-2'>Add Produce</Button></Link>
        <Link to="/EditPageTable"><Button className='bg-sky-500 w-[100px] pr-2 pl-2'>Edit Produce</Button></Link>
      </Row>
      <div className='mt-4'>
        <TeblePage />
      </div>
    </div>
  );
};

export default Warehouse;