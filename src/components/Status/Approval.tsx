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

function Approval() {
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
      await axios.post("http://localhost:3000/coffee", editedCoffee);
      form.resetFields();
      const result = await Swal.fire({
        title: 'Do you want to go back to the homepage?',
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
      <Row>
        {editedCoffee ? (
          <Card className='w-full h-full'>
            <div className="text-black box-border mt-4 flex justify-end">
              <Button type="primary" onClick={saveChanges} className="bg-sky-500 ml-2">
                Approval
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

export default Approval;
