import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BeatLoader from "react-spinners/BeatLoader";
import Navbar from 'react-bootstrap/Navbar';
import { MdPhotoSizeSelectActual } from "react-icons/md";
import './index.css'

export default function Photos() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
   
            axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
                .then((res) => {
                    if (res) {
                        console.log(res.data)
                        setPhotos(res.data)
                        setLoading(false)
                    }
                })
                .catch(err => console.log(err))
    }, [])

    return (
        <>
         <Navbar bg="primary" fixed='top'>
      <Container fluid>
        <Navbar.Brand href="#" className='text-white'>
        <MdPhotoSizeSelectActual className='me-2 logo'/>
            photos
            </Navbar.Brand>
        <Button variant="outline-success rounded-pill text-white border-white button" onClick={()=>navigate('/')}>Back to albums</Button>
      </Container>
    </Navbar>
        <Container >
            <Row>

            {loading ?

                (
                    <Col>
                            <div className='spinner-main-container w-100'>
                                <div className='spinner-container'>
                                <BeatLoader size={20}  color="blue"/>
                                </div>
                            </div>
                        </Col>
                ) : (
                    <>
                    <ul className="cards-container mt-5">
                  
                        {photos.map((val) =>
                          <Col xs={12} sm={6} md={6} lg={4} xl={4}>
                            <li className='m-3' key={val.id}>
                                <Card  className="card bg-body shadow">
                                    <Card.Img variant="top" src={val.url} className="w-100" />
                                    <Card.Body>
                                        <Card.Title>photoId:{val.id}</Card.Title>
                                        <Card.Text className='d-flex'>
                                           {val.title}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                            </li>
                        </Col>
                           
                        )}
                    </ul>
                    
                    </>
                )
            }
             </Row>
        </Container>
        </>
    )
}
