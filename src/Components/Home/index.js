import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './index.css'
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import InputGroup from 'react-bootstrap/InputGroup';
import SyncLoader from "react-spinners/SyncLoader";
import Navbar from 'react-bootstrap/Navbar';

export default function Home() {
    const navigate = useNavigate()
    const [albums, setAlbums] = useState([])
    const [finalAlbum, setFinalAlbum] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [opacityVal, setOpacityVal] = useState("0.25")


    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/albums"
        axios.get(url)
            .then((res) => {
                if (res) {
                    console.log(res.data)
                    setLoading(false)
                    setAlbums(res.data)
                    setFinalAlbum(res.data)
                    setOpacityVal("1")
                }
            })
            .catch(err => console.log(err))
    }, [])



    const searchFilteredAlbums = () => {
        console.log(searchValue)
        let finalSearch = [...albums]
        const filteredAlbums = finalSearch.filter((album) => {
            if (searchValue ==="") {
                return album


            }
            else if (album.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return album

            }
        })

        setFinalAlbum(filteredAlbums)
        console.log(filteredAlbums)

    }


    return (


        <div style={{ opacity: opacityVal }}>
            {/* Header section */}

            <Navbar bg="success" fixed='top'>
                <Container>

                    <Navbar.Brand href="" className='text-white d-flex'>
                        <BsFillJournalBookmarkFill size={25} className="mb-1 mt-2 pe-1" />
                        <h2 className='d-none d-md-block logo-text'>Albums</h2>
                    </Navbar.Brand>
                    <Form>

                        <div className='d-flex align-items-center'>
                            <InputGroup className="form-container bg-light">
                                <Form.Control
                                    placeholder="Search by name"
                                    type="search"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    className='rounded bg-transparent border-0'
                                    onChange={(event) => setSearchValue(event.target.value)}
                                />
                                <a  className='bg-warning p-1 search-icon-container d-flex align-items-center justify-content-center' id="button-addon2" onClick={searchFilteredAlbums}>
                                    <AiOutlineSearch size={25} className="search-icon text-dark " />
                                </a>
                            </InputGroup>
                        </div>
                    </Form>

                </Container>
            </Navbar>
            <Container className='mt-5'>

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
                                {finalAlbum.map((val) =>
                                    <Col xs={12} md={6} lg={6} xl={4}>
                                        <div>
                                            <li className='m-2 list' key={val.id}>
                                                <Card onClick={() => navigate(`/photos/${val.id}`)} className="album-card bg-body shadow  p-2">
                                                    <div className='img-container'>
                                                        <Card.Img variant="top" className='w-100 img-fluid card-img' src="https://img.freepik.com/free-photo/cafe-tea-time-break-relaxation-photography-concept_53876-47101.jpg?w=740&t=st=1663485458~exp=1663486058~hmac=910c0b1b4eaff7d9a7ffe6b0a555923095f90243562b897a8e887b82993dc6a5" />
                                                    </div>
                                                    <Card.Body className='card-body d-flex justify-content-start'>
                                                        <Card.Title className='p-1'>Card:{val.id}</Card.Title>
                                                        <Card.Subtitle className="p-1">{val.title}</Card.Subtitle>
                                                        <Card.Text className='p-1'>
                                                            UserId: {val.userId}
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
        </div>
    )
}
