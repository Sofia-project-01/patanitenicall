import { Button, Input, Select } from 'antd';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react'
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

  const [posts, setPosts] = useState<Post[]>([]);
  const [, setTechnos] = useState<string[]>([]);
  const [, setError] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [_, setFilteredPosts] = useState<Post[]>([]);

function OptionSearch() {

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
  return (
    <div className='filter-buttons pl-4 pr-4 '>
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
  </div>
  )
}
export default OptionSearch
