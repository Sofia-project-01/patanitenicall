import React from 'react';
import {  Row, Button } from 'antd';
import TeblePage from './teble';
import { Link } from 'react-router-dom';
const Warehouse: React.FC = () => {

  return (
   /*/ <Row className='space-x-2 flex justify-end'>
    <Link to="/AddProduce"> <Button className='text-white bg-sky-600 w-[100px] pr-2 pl-2'>Add Produce</Button></Link>
    </Row>
    /*/
  
    <div>
     
      <div className='mt-4'>
        <TeblePage />
      </div>
    </div>
  );
};

export default Warehouse;