import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css'
import { IoAlbumsSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import SyncLoader from "react-spinners/SyncLoader";
import Navbar from 'react-bootstrap/Navbar';

export default function Home() {
    const navigate = useNavigate()
    const [albums, setAlbums] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")


    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/albums"
        axios.get(url)
            .then((res) => {
                if (res) {
                    console.log(res.data)
                    setLoading(false)
                    setAlbums(res.data)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const filteredAlbums = albums.filter((album) => {
        if (searchValue == "") {
            return album
        }
        else if (album.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return album

        }
    })



    return (

        <>
        {/* Header section */}

            <Navbar bg="success" fixed='top'>
                <Container>
                    <Navbar.Brand href="#" className='text-white'>
                        <IoAlbumsSharp size={25} className="mb-1 pe-1" />
                        Albums
                    </Navbar.Brand>

                    <Form className="">
                    <div className='d-flex align-items-center rounded-pill shadow search-bar-container bg-light button p-1'>
                    <AiOutlineSearch size={24} />
                        <Form.Control
                            type="search"
                            placeholder="Search Albums"
                            className="search-bar bg-transparent border-0"
                            aria-label="Search"
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                        </div>

                    </Form>
                </Container>
            </Navbar>
            <Container>

                {/* cards-section */}

                <Row>
                    {loading ?

                        (
                            <Col>
                                <div className='spinner-main-container w-100'>
                                    <div className='spinner-container'>
                                        <SyncLoader size={20} color="blue" />
                                    </div>
                                </div>
                            </Col>
                        ) : (
                            <ul className="cards-container d-flex mt-5">
                                {filteredAlbums.map((val) =>
                                    <Col xs={12} md={6} lg={6} xl={4}>
                                        <div>
                                            <li className='m-3 list'>
                                                <Card onClick={() => navigate(`/photos/${val.id}`)} className="album-card bg-body shadow  p-2">
                                                    <div className='img-container'>
                                                        <Card.Img variant="top" className='w-100 img-fluid card-img' src="https://img.freepik.com/free-photo/cafe-tea-time-break-relaxation-photography-concept_53876-47101.jpg?w=740&t=st=1663485458~exp=1663486058~hmac=910c0b1b4eaff7d9a7ffe6b0a555923095f90243562b897a8e887b82993dc6a5" />
                                                    </div>
                                                    <Card.Body className='card-body d-flex justify-content-start'>
                                                        <Card.Title className='p-1'>Card:{val.id}</Card.Title>
                                                        <Card.Subtitle className="p-1">{val.title}</Card.Subtitle>
                                                        <Card.Text className='p-1'>
                                                            UserId:{val.userId}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </li>
                                        </div>
                                    </Col>
                                )}
                            </ul>
                        )
                    }
                </Row>
            </Container>
        </>
    )
}
