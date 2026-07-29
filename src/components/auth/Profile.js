import React, { useState, useEffect } from 'react'
import { Card, Image, Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Skeleton from 'react-loading-skeleton';
import {getUserDetails, userProfileUpdate} from '../../actions/userActions'
import { useCustomTheme } from '../../hooks/useCustomTheme'
import '../peoplePages.css'

const UserProfile = ({ location, history }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const { isDarkMode, colors } = useCustomTheme()

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
    <div className={`people-detail-shell ${isDarkMode ? 'people-detail-shell--dark' : ''}`} style={{
      padding: '5%',
      color: colors.text.primary
    }}>
        <div className="people-detail-hero">
          <div>
            <div className="people-detail-hero__eyebrow">Account settings</div>
            <h1 className="people-detail-hero__title">Profile</h1>
            <div className="people-detail-hero__subtitle">Manage your admin identity, update profile details, and keep account information tidy.</div>
          </div>
          <div className="people-detail-hero__meta">
            <div className="people-detail-hero__pill">Email <strong>{email || '--'}</strong></div>
            <div className="people-detail-hero__pill">Username <strong>{displayname || '--'}</strong></div>
          </div>
        </div>
        {error && <Message variant='danger'>{error}</Message>}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {updateLoading && <Skeleton/>}
        {success && <Message variant='success'>Profile Updated Successfully</Message>}
        {loading ? (
          <>
            <Skeleton height={220} style={{ marginBottom: '1rem' }} />
            <Skeleton height={420} />
          </>
        ) : (
          <div className="account-profile-grid">
            <Card
              className={`people-form-card account-identity-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
              style={{
                background: colors.card,
                borderColor: colors.border
              }}
            >
              <Card.Body>
                <div className="patient-avatar-wrap">
                  <Image
                    src={user && user.photo ? user.photo : 'https://res.cloudinary.com/germiny/image/upload/v1588101822/profile-pic_mebjxq.png'}
                    roundedCircle
                    fluid
                    className="patient-avatar"
                  />
                </div>
                <h3 className="patient-name">{firstname || '--'} {lastname || ''}</h3>
                <p className="patient-handle">@{displayname || 'admin-user'}</p>
                <div className="patient-vitals-strip">
                  <span className="patient-vital-chip">Role: Administrator</span>
                  <span className="patient-vital-chip">Status: Active</span>
                </div>
              </Card.Body>
              <Card.Footer className="account-upload-footer">
                <Form>
                  <Form.Group className="mb-0">
                    <Form.File id="picture" label="Upload profile picture" custom />
                  </Form.Group>
                </Form>
              </Card.Footer>
            </Card>

            <Card
              className={`people-form-card account-edit-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
              style={{
                background: colors.card,
                borderColor: colors.border
              }}
            >
              <Card.Header>
                <h4 className="m-0">Edit Profile</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler} className={isDarkMode ? 'text-light' : 'text-dark'}>
                  <Form.Row>
                    <Col md={6}>
                      <Form.Group controlId='firstname'>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter firstname'
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId='lastname'>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter lastname'
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col md={6}>
                      <Form.Group controlId='displayname'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter username'
                          value={displayname}
                          onChange={(e) => setDisplayname(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Enter email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <div className="account-edit-actions">
                    <Button type='submit' variant='primary'>
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

          </div>
        )}
          
    </div> 
    </>
  )
}

export default UserProfile