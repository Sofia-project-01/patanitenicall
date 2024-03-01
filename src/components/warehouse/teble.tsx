import  { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space, Image, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; 
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Post {
  province: string;
  id: number;
  title: string;
  technos: string;
  Size: number;
  Roastlevel: string;
  price: number;
  img: string;
}

function TablePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [_, setTechnos] = useState<string[]>([]);
  const [, setError] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  // const [selectedTechno, setSelectedTechno] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Post[]>('http://localhost:3000/coffee');
        console.log('Response:', response);

        setPosts(response.data);
        setFilteredPosts(response.data);
        setError('');
        const uniqueTechnos = Array.from(new Set(response.data.map(post => post.technos)));
        setTechnos(uniqueTechnos);
      } catch (error) {
        setError('Something went wrong while fetching data.');
      }
    };

    fetchData();
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const handleSearch = () => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // const handleFilterByTechno = (selectedTechno: string) => {
  //   setSelectedTechno(selectedTechno);
  //   if (selectedTechno === 'all') {
  //     setFilteredPosts(posts);
  //   } else {
  //     const filteredPosts = posts.filter(post => post.technos.includes(selectedTechno));
  //     setFilteredPosts(filteredPosts);
  //   }
  // };



  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      icon: 'warning',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id);
      }
    });
  };
  
  const deletePost = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/coffee/${id}`);
      const response = await axios.get<Post[]>('http://localhost:3000/coffee');
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      setError('Something went wrong while deleting data.');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (img: string) => <Image className='rounded-full' src={img} width={50} />
    },
    {
      title: 'Name Produce',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Roast Level',
      dataIndex: 'Roastlevel',
      key: 'Roastlevel',
    },
    {
      title: 'Size (g)',
      dataIndex: 'Size',
      key: 'Size',
    },
    {
      title: 'Price (฿)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: <EditOutlined />,
      key: 'actions',
      render: (text: any, record: Post) => (
        <Space size="middle">
          <Link to={`/coffee/${record.id}`}><EditOutlined /></Link>
        </Space>
      ),
    },
    {
      title: <DeleteOutlined />,
      key: 'actions',
      render: (text: any, record: Post) => (
        <Space size="middle">
          <span onClick={() => handleDelete(record.id)}><DeleteOutlined /></span>
        </Space>
      ),
    },
  ];

  return (
    <div>
       <Row className='justify-end' gutter={8} align="middle">
       <Col className='space-x-2'>
          <Input
            style={{ width: "200px" }}
            placeholder="Search"
            type="text"
            id="titleInput"
            value={searchTitle}
            onChange={handleTitleChange}
          />
          <Button type="primary" onClick={handleSearch} className='bg-sky-600'>
            Search
          </Button>
        </Col>
      {/* <div className='filter-buttons'>
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={handleFilterByTechno}
        >
          <Select.Option value="all">หมวดหมู่</Select.Option>
          {technos.map((techno, index) => (
            <Select.Option key={index} value={techno}>{techno}</Select.Option>
          ))}
        </Select>
      </div> */}
      </Row>
      <div className='mt-4'>
      <Table columns={columns} dataSource={filteredPosts} />
      </div>
    </div>
  );
}

export default TablePage;
