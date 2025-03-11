import  { useState, useEffect, ChangeEvent, ReactNode } from 'react';
import axios from 'axios';
import { Card, Row, Col, Input, Button, Image, Select } from 'antd';
import { BankOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined, UserSwitchOutlined, WarningOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface Post {
  Process: ReactNode;
  province: string;
  id: number;
  title: string;
  technos: string;
  Size: number;
  Roastlevel: string;
  price: number;
  img: string;
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [technos, setTechnos] = useState<string[]>([]);
  const [_, setError] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [, setSelectedTechno] = useState<string>('');

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

  const handleFilterByTechno = (selectedTechno: string) => {
    setSelectedTechno(selectedTechno);
    if (selectedTechno === 'all') {
      setFilteredPosts(posts);
    } else {
      const filteredPosts = posts.filter(post => post.technos.includes(selectedTechno));
      setFilteredPosts(filteredPosts);
    }
  };

  return (
    <div>
      <Row justify='space-between' align="middle">
      <div className='filter-buttons pl-4 pr-4 '>
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
      </div>
      
        <Col className='space-x-2 pr-4'>
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
      </Row>

      <Row gutter={[20, 20]} className='p-4'>
        {filteredPosts.map(post => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={post.id}>
            <Link to={`/Produce/${post.id}`}>
              <Card className='h-full w-full'>
                <Col className='flex justify-center'>
                  <Image src={post.img} alt={post.title} className='rounded-lg' style={{ height: "150px" }} />
                </Col>
                <Col className='mt-4'>
                  <div className='text-l font-bold truncate ...'>{post.title}</div>
                  <div className='font-bold mt-4'><UserOutlined />  {post.price}</div>
                  <div className='text-sx mt-4'><BankOutlined /> {post.Process}</div>
                  <div className='text-sx'><WarningOutlined />  {post.Roastlevel}</div>
                  <div className='text-sx'><ClockCircleOutlined /> {post.Size}</div>
                  
                </Col>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;