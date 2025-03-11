import { Link } from 'react-router-dom'
import HomePage from './home'
import { Button, Layout, Row } from 'antd'
import Dashboard from '../Dashboard/Dashboard'
import ImageSlider from '../Dashboard/ImageSlider'
import Card from 'antd/es/card/Card'

function HomePageProduce() {
  return (
    
     // <HomePage/>
     /*/<Row className='space-x-2 flex justify-end'>
        <Link to="/AddProduce"> <Button className='text-white bg-sky-600 w-[100px] pr-2 pl-2'>แจ้งซ่อม</Button></Link>
    </Row>/*/
     <Card className='h-full'>
      <Row>
        <Dashboard/>
      </Row>
      <Row>
        <ImageSlider/>
      </Row>
      

     
    </Card>
  )
}

export default HomePageProduce
