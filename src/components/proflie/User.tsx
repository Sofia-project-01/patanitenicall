import { Row, Col } from 'antd';
import React from 'react';

function ProfileUser() {
  return (
    <Row justify="end" align="middle" gutter={[10, 10]} className="p-2">
        <Col>
        <h2 className="text-xl font-semibold text-gray-800">Sofai Abah</h2>
      </Col>
      <Col>
        <img src="src/assets/img/TPN.png" className="w-[50px] h-[50px] rounded-full border-2 border-gray-300 shadow-md" />
      </Col>
      
    </Row>
  );
}

export default ProfileUser;
