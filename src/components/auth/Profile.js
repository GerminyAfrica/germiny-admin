import React, { useState, useEffect } from 'react'
import { Card, Image, Form, Button, Row, Col, CardColumns} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Skeleton from 'react-loading-skeleton';
import {getUserDetails, userProfileUpdate} from '../../actions/userActions'

const UserProfile = ({ location, history }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const profileUpdate = useSelector((state) => state.profileUpdate)
  const {success, error:updateError, loading:updateLoading} = profileUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        if(!user || !user.firstname){
            dispatch(getUserDetails())
        }else {
            setFirstname(user.firstname)
            setLastname(user.lastname)
            setEmail(user.email)
            setDisplayname(user.displayname)
        }
        
      
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userProfileUpdate({id:user._id, firstname, lastname, displayname, email}))
  }

  return (

    <>
    <div style={{padding:"5%"}}>
        {error && <Message variant='danger'>{error}</Message>}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {updateLoading && <Skeleton/>}
        {success && <Message variant='success'>Profile Updated Successfully</Message>}
        <CardColumns>
            {loading ?
            <Skeleton height={180} width={'80%'}/>:
            <Card xs={6} md={4} className="text-dark" border="success" style={{ width: '80%'}}>
                <Card.Header><h6>Profile Picture</h6></Card.Header>
                        <Row>
                            <Col/>
                            <Col xs={4} md={6}>
                                {user && user.photo ?
                                <Image style= {{padding:"5%", borderRadius:"50%"}} src={user.photo} roundedCircle fluid/>:
                                <Image style= {{padding:"5%", borderRadius:"50%"}} src={"https://res.cloudinary.com/germiny/image/upload/v1588101822/profile-pic_mebjxq.png"} roundedCircle fluid/>
                                }
                            </Col>
                            <Col/>
                        </Row>
                <Card.Footer>
                    <Form>
                        <Form.Group>
                            <Form.File id="picture" label="Upload Profile Picture" />
                        </Form.Group>
                    </Form>
                </Card.Footer>
            </Card>}

            {loading ?
            <Skeleton width={'200%'} height={400}/>:
            <Card border="dark" style={{ width:'200%' }} className="text-center text-dark">
            <Card.Header><h4>User Profile</h4></Card.Header>
            <Form xs={3} md={4} style={{ padding: '10px' }} onSubmit={submitHandler}>
                <Form.Row>
                    <Col>
                        <Form.Group controlId='firstname'>
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                type='firstname'
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='lastname'>
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                type='lastname'
                                placeholder='Enter Lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group controlId='displayname'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='displayname'
                    placeholder='Enter Displayname'
                    value={displayname}
                    onChange={(e) => setDisplayname(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            <Card.Footer>
                
            </Card.Footer>
            </Card>}
        </CardColumns>
          
    </div> 
    </>
  )
}

export default UserProfile