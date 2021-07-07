import React, { useState, useEffect } from 'react'
import { Card, Image, Form, Button, Row, Col, CardColumns, Tabs, Tab, InputGroup} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Skeleton from 'react-loading-skeleton';
import {getPatientDetails, listPatients} from '../actions/patientActions'

const PatientProfile = ({ match, history }) => {
  const patientId = match.params.id
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [genotype, setGenotype] = useState('')
  const [bloodgroup, setBloodGroup] = useState('')
  const [rating, setRating] = useState('')

  const dispatch = useDispatch()

  const patientDetails = useSelector((state) => state.patientDetails)
  const { loading, error, patient } = patientDetails

  const patientList = useSelector((state) => state.patientList)
  const { patients } = patientList

  let next, previous

  if (patients && patient){
    const ids = patients.map(patient => patient._id)
    const index = ids.indexOf(patientId)
    next = ids[(index + 1)] || ids[0]
    previous = ids[index -1 ] || ids[(ids.length - 1)]
  }

  useEffect(() => {
    dispatch(listPatients())
      if(!patient || !patient.firstname || patient._id !== patientId){
          dispatch(getPatientDetails(patientId))
      }else {
        setFirstname(patient.firstname)
        setLastname(patient.lastname)
        setDisplayname(patient.displayname)
        setPhone(patient.phone)
        setEmail(patient.email)
        setDOB(patient.dob.split("T")[0])
        setGender(patient.gender)
        setHeight(patient.height)
        setWeight(patient.weight)
        setGenotype(patient.genotype)
        setBloodGroup(patient.bloodgroup)
        setRating(patient.averageRating)
      }
  }, [dispatch, patientId, patient])

  return (
    <>
        {error && <Message variant='danger'>{error}</Message>}
        <Link to='/user' className='btn btn-light float-left'>
            Back
        </Link>
        {next && <Link to={`/user/${next}/view`} className='btn btn-light float-right'>
            <i className='fas fa-forward'></i>
        </Link>}
        {previous && <Link to={`/user/${previous}/view`} className='btn btn-light float-right'>
            <i className='fas fa-backward'></i>
        </Link>}
        <div style={{padding:"5%"}}>
            <CardColumns>
                {loading ?
                <Skeleton height={180} width={'80%'}/>:
                <Card xs={6} md={4} className="text-dark" border="success" style={{ width: '80%'}}>
                    <Card.Header><h6>Profile Picture</h6></Card.Header>
                    <Row>
                        <Col/>
                        <Col xs={4} md={6}>
                            {patient && patient.photo ?
                            <Image style= {{padding:"5%", borderRadius:"50%"}} src={patient.photo} roundedCircle fluid/>:
                            <Image style= {{padding:"5%", borderRadius:"50%"}} src={"https://res.cloudinary.com/germiny/image/upload/v1588101822/profile-pic_mebjxq.png"} roundedCircle fluid/>
                            }
                        </Col>
                        <Col/>
                    </Row>
                </Card>}
                {loading ?
                <Skeleton width={'200%'} height={400}/>:
                <Card border="dark" style={{ width: '200%' }} className="text-center text-dark">
                    <Card.Header><h5>User Profile</h5></Card.Header>
                    <Form style={{ padding: '10px'}} className="text-dark">
                        <Form.Row>
                            <Col>
                                <Form.Group controlId='firstname'>
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control
                                        type='firstname'
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='lastname'>
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control
                                        type='lastname'
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId='displayname'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type='displayname'
                                        value={displayname}
                                        onChange={(e) => setDisplayname(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId='phone'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type='phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='lastname'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId='dob'>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type='dob'
                                        value={dob}
                                        onChange={(e) => setDOB(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='gender'>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        type='gender'
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId='height'>
                                    <Form.Label>Height</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Append>
                                        <InputGroup.Text>Meters</InputGroup.Text>
                                        </InputGroup.Append>
                                        <Form.Control
                                            type='height'
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='weight'>
                                    <Form.Label>Weight</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Append>
                                        <InputGroup.Text>Kg</InputGroup.Text>
                                        </InputGroup.Append>
                                        <Form.Control
                                            type='weight'
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId='genotype'>
                                    <Form.Label>Genotype</Form.Label>
                                    <Form.Control
                                        type='genotyoe'
                                        value={genotype}
                                        onChange={(e) => setGenotype(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='bloodgroup'>
                                    <Form.Label>Blood Group</Form.Label>
                                    <Form.Control
                                        type='bloodgroup'
                                        value={bloodgroup}
                                        onChange={(e) => setBloodGroup(e.target.value)}
                                        readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                
                </Card>}
            </CardColumns>
        </div>
       
    </>
     
  )
}

export default PatientProfile