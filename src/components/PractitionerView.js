import React, { useState, useEffect } from 'react'
import { Card, Image, Form, Button, ButtonGroup, Col, Modal, Tabs, Tab } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Skeleton from 'react-loading-skeleton';
import {getPractitionerDetails, verifyPractitioner, deactivatePractitioner, activatePractitioner, invitePractitioner, declinePractitioner, rejectPractitioner, listPractitioners, profileUpdate} from '../actions/practitionerActions'
import { useCustomTheme } from '../hooks/useCustomTheme'
import './peoplePages.css'


const PractitionerProfile = ({ match, history }) => {
  const practId = match.params.id
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [practclass, setPractClass] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [yearofgrad, setYearOfGrad] = useState('')
  const [yearofhouse, setYearOfHouse] = useState('')
  const [yearofexp, setYearOfExp] = useState('')
  const [licenseNo, setLicenseNo] = useState('')
  const [licenseExpire, setLicenseExpire] = useState('')
  const [wallet, setWallet] = useState('')
  const [totalreject, setTotalReject] = useState('')
  const [totalearned, setTotalEarned] = useState('')
  const [totaljobs, setTotalJobs] = useState('')
  const [totaldistance, setTotalDistance] = useState('')
  const [hoursonline, setHoursOnline] = useState('')
  const [active, setActive] = useState(false)
  const [online, setOnline] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const [verified, setVerified] = useState(false)
  const [membershipclass, setMembershipClass] = useState('')
  const [rating, setRating] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [channel, setChannel] = useState('')

  const dispatch = useDispatch()
  const { isDarkMode, colors } = useCustomTheme()


  const practitionerDetails = useSelector((state) => state.practitionerDetails)
  const { loading, error, practitioner } = practitionerDetails

  const practitionerList = useSelector((state) => state.practitionerList)
  const { practitioners } = practitionerList

  const practitionerVerify = useSelector((state) => state.practitionerVerify)
  const { loading:loadingVerify, error:errorVerify, verify } = practitionerVerify

  const practitionerDeactivate = useSelector((state) => state.practitionerDeactivate)
  const { loading:loadingDeactivate, error:errorDeactivate, deactivate } = practitionerDeactivate

  const practitionerActivate = useSelector((state) => state.practitionerActivate)
  const { loading:loadingActivate, error:errorActivate, activate } = practitionerActivate

  const practitionerInvite = useSelector((state) => state.practitionerInvite)
  const { loading:loadingInvite, error:errorInvite, invite } = practitionerInvite

  const practitionerDecline = useSelector((state) => state.practitionerDecline)
  const { loading:loadingDecline, error:errorDecline, decline } = practitionerDecline

  const practitionerReject = useSelector((state) => state.practitionerReject)
  const { loading:loadingReject, error:errorReject, reject } = practitionerReject

  let next, previous

  if (practitioners && practitioner){
    const ids = practitioners.map(pract => pract._id)
    const index = ids.indexOf(practId)
    next = ids[(index + 1)] || ids[0]
    previous = ids[index -1 ] || ids[(ids.length - 1)]
  }

  useEffect(() => {
      dispatch(listPractitioners())
      if(!practitioner || !practitioner.firstname || practitioner._id !== practId){
          dispatch(getPractitionerDetails(practId))
      }else {
        setFirstname(practitioner.firstname)
        setLastname(practitioner.lastname)
        setDisplayname(practitioner.displayname)
        setPhone(practitioner.phone)
        setEmail(practitioner.email)
        setDOB(practitioner.dob.split("T")[0])
        setGender(practitioner.gender)
        setPractClass(practitioner.practclass)
        setSpecialization(practitioner.field)
        setYearOfGrad(practitioner.yearOfGrad)
        setYearOfHouse(practitioner.yearOfHouse)
        setYearOfExp(practitioner.yearOfExp)
        setLicenseNo(practitioner.licenseNo)
        setLicenseExpire(practitioner.licenseExpire.split("T")[0])
        setWallet(practitioner.wallet)
        setTotalReject(practitioner.totalReject)
        setTotalEarned(practitioner.totalEarned)
        setTotalJobs(practitioner.totalJobs)
        setTotalDistance(practitioner.totalDistance)
        setHoursOnline(practitioner.hoursOnline)
        setActive(practitioner.active)
        setOnline(practitioner.online)
        setEngaged(practitioner.engaged)
        setVerified(practitioner.verified)
        setMembershipClass(practitioner.membershipClass)
        setRating(practitioner.averageRating)
        setCreatedAt(practitioner.createdAt.split("T")[0])
        setChannel(practitioner.channel)
      }
  }, [dispatch, practId, practitioner])

  const [showInvite, setShowInvite] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [venue, setVenue] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [declineReason, setDeclineReason] = useState('')
  const [rejectReason, setRejectReason] = useState('')
    
  const handleCloseInvite = () => {
    setShowInvite(false)
  }

  const handleCloseDecline = () => {
    setShowDecline(false)
  }

  const handleCloseReject = () => {
    setShowReject(false)
  }
  
  const handleShowInvite = () => {
    setShowInvite(true)
        
    }
  const handleShowDecline= () => {
    setShowDecline(true)
            
    }
  const handleShowReject= () => {
    setShowReject(true)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    dispatch(verifyPractitioner(practId))
    
  }

  const handleDeactivate = (e) => {
    e.preventDefault()
    dispatch(deactivatePractitioner(practId))
    
  }

  const handleActivate = (e) => {
    e.preventDefault()
    dispatch(activatePractitioner(practId))
    
  }

  const handleReject = (e) => {
    e.preventDefault()
    dispatch(rejectPractitioner(practId, rejectReason))
    handleCloseReject()
  }

  const handleDecline = (e) => {
    e.preventDefault()
    dispatch(declinePractitioner(practId, declineReason))
    handleCloseDecline()
    
  }

  const handleInvite = (e) => {
    e.preventDefault()
    dispatch(invitePractitioner(practId, venue, date, time))
    handleCloseInvite()
  }

  const updateProfile = (e) => {
    e.preventDefault()
    dispatch(profileUpdate({id:practitioner._id, firstname, lastname, email, dob, gender, practclass, specialization, yearofgrad, yearofhouse, yearofexp, licenseNo, licenseExpire}))
    dispatch(getPractitionerDetails(practId))
  }

  return (
    <>
            <div className={`people-detail-shell ${isDarkMode ? 'people-detail-shell--dark' : ''}`} style={{ color: colors.text.primary }}>
        {loadingVerify && <Skeleton/>}
        {loadingDeactivate && <Skeleton/>}
        {loadingActivate && <Skeleton/>}
        {loadingInvite && <Skeleton/>}
        {loadingDecline && <Skeleton/>}
        {loadingReject && <Skeleton/>}
        {error && <Message variant='danger'>{error}</Message>}
        {errorVerify && <Message variant='danger'>{errorVerify}</Message>}
        {errorDeactivate && <Message variant='danger'>{errorDeactivate}</Message>}
        {errorActivate && <Message variant='danger'>{errorActivate}</Message>}
        {errorInvite && <Message variant='danger'>{errorInvite}</Message>}
        {errorDecline && <Message variant='danger'>{errorDecline}</Message>}
        {errorReject && <Message variant='danger'>{errorReject}</Message>}
        {verify && verify.message && <Message variant='success'>{verify.message}</Message>}
        {deactivate && deactivate.message && <Message variant='success'>{deactivate.message}</Message>}
        {activate && activate.message && <Message variant='success'>{activate.message}</Message>}
        {invite && invite.message && <Message variant='success'>{invite.message}</Message>}
        {decline && decline.message && <Message variant='success'>{decline.message}</Message>}
        {reject && reject.message && <Message variant='success'>{reject.message}</Message>}

                <div className="people-detail-shell__backbar">
                <Link to='/practitioner' className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
            Back to practitioners
        </Link>
        <div className="people-detail-actions">
                {previous && <Link to={`/practitioner/${previous}/view`} className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
            <i className='fas fa-backward'></i>
        </Link>}
                {next && <Link to={`/practitioner/${next}/view`} className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
            <i className='fas fa-forward'></i>
        </Link>}
        </div>
        </div>
                <div style={{padding:"0 0 3%"}}>
                    {!loading && practitioner && (
                        <div className="people-detail-actions" style={{ marginBottom: '0.8rem', gap: '0.8rem' }}>
                            {(practitioner.status === 'New' || practitioner.status === 'Review') &&
                                <ButtonGroup className="people-detail-actions">
                                    <Button variant='info' onClick={handleShowInvite}>
                                        Invite
                                    </Button>
                                    <Button variant='warning' onClick={handleShowDecline}>
                                        Decline
                                    </Button>
                                </ButtonGroup>
                            }

                            {(practitioner.status === 'Invited' || practitioner.status === 'New' || practitioner.status === 'Review') &&
                                <ButtonGroup className="people-detail-actions">
                                    <Button variant='primary' onClick={handleVerify}>
                                        Verify
                                    </Button>
                                    <Button variant='danger' onClick={handleShowReject}>
                                        Reject
                                    </Button>
                                </ButtonGroup>
                            }

                            {practitioner.status === 'Verified' && practitioner.active && (
                                <Button variant='warning' onClick={handleDeactivate}>
                                    Deactivate
                                </Button>
                            )}

                            {(practitioner.status === 'Deactivated' || practitioner.status === 'Expired') && (
                                <Button variant='success' onClick={handleActivate}>
                                    Activate
                                </Button>
                            )}
                        </div>
                    )}

                    {loading ? (
                        <>
                            <Skeleton height={230} style={{ marginBottom: '1rem' }} />
                            <Skeleton height={500} />
                        </>
                    ) : (
                        <Tabs defaultActiveKey="profile" className="people-detail-tabs">
                            <Tab eventKey="profile" title="Personal Information" style={{ padding: '1% 0' }}>
                                <div className="practitioner-overview-grid">
                                    <Card
                                        className={`people-form-card practitioner-avatar-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                        style={{ background: colors.card, borderColor: colors.border }}
                                    >
                                        <Card.Body>
                                            <div className="patient-avatar-wrap">
                                                <Image
                                                    src={practitioner && practitioner.photo ? practitioner.photo : 'https://res.cloudinary.com/germiny/image/upload/v1588101822/profile-pic_mebjxq.png'}
                                                    roundedCircle
                                                    fluid
                                                    className="patient-avatar"
                                                />
                                            </div>
                                            <h3 className="patient-name">{firstname || '--'} {lastname || ''}</h3>
                                            <p className="patient-handle">@{displayname || 'unknown-practitioner'}</p>
                                            <div className="patient-vitals-strip">
                                                <span className="patient-vital-chip">Status: {practitioner?.status || '--'}</span>
                                                <span className="patient-vital-chip">Class: {practclass || '--'}</span>
                                                <span className="patient-vital-chip">Specialty: {specialization || '--'}</span>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card
                                        className={`people-form-card practitioner-info-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                        style={{ background: colors.card, borderColor: colors.border }}
                                    >
                                        <Card.Header><h5 className="m-0">Personal Information</h5></Card.Header>
                                        <Card.Body>
                                            <Form className={isDarkMode ? 'text-light' : 'text-dark'}>
                                                <Form.Row>
                                                    <Col md={6}>
                                                        <Form.Group controlId='firstname'>
                                                            <Form.Label>Firstname</Form.Label>
                                                            <Form.Control type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId='lastname'>
                                                            <Form.Label>Lastname</Form.Label>
                                                            <Form.Control type='text' value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col md={6}>
                                                        <Form.Group controlId='displayname'>
                                                            <Form.Label>Username</Form.Label>
                                                            <Form.Control type='text' value={displayname} onChange={(e) => setDisplayname(e.target.value)} readOnly />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId='phone'>
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control type='text' value={phone} onChange={(e) => setPhone(e.target.value)} readOnly />
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col md={6}>
                                                        <Form.Group controlId='email'>
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId='dob'>
                                                            <Form.Label>Date of Birth</Form.Label>
                                                            <Form.Control type='text' value={dob} onChange={(e) => setDOB(e.target.value)} placeholder='YYYY-MM-DD' />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId='gender'>
                                                            <Form.Label>Gender</Form.Label>
                                                            <Form.Control type='text' value={gender} onChange={(e) => setGender(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Button variant='primary' onClick={updateProfile}>Update Profile</Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Tab>

                            <Tab eventKey="professional" title="Professional Information" style={{ padding: '1% 0' }}>
                                <div className="practitioner-professional-grid">
                                    <Card
                                        className={`people-form-card practitioner-info-card practitioner-pro-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                        style={{ background: colors.card, borderColor: colors.border }}
                                    >
                                        <Card.Header><h5 className="m-0">Professional Information</h5></Card.Header>
                                        <Card.Body>
                                            <Form className={isDarkMode ? 'text-light' : 'text-dark'}>
                                                <Form.Row>
                                                    <Col md={6}>
                                                        <Form.Group controlId='practclass'>
                                                            <Form.Label>Practitioner Class</Form.Label>
                                                            <Form.Control type='text' value={practclass} onChange={(e) => setPractClass(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId='specialization'>
                                                            <Form.Label>Specialization</Form.Label>
                                                            <Form.Control type='text' value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col md={4}>
                                                        <Form.Group controlId='yearofgrad'>
                                                            <Form.Label>Year of Graduation</Form.Label>
                                                            <Form.Control type='text' value={yearofgrad} onChange={(e) => setYearOfGrad(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group controlId='yearofhouse'>
                                                            <Form.Label>Year of Housemanship</Form.Label>
                                                            <Form.Control type='text' value={yearofhouse} onChange={(e) => setYearOfHouse(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group controlId='yearofexp'>
                                                            <Form.Label>Years of Experience</Form.Label>
                                                            <Form.Control type='text' value={yearofexp} onChange={(e) => setYearOfExp(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col md={6}>
                                                        <Form.Group controlId='licenseNo'>
                                                            <Form.Label>License Number</Form.Label>
                                                            <Form.Control type='text' value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId='licenseExpire'>
                                                            <Form.Label>License Expiry Date</Form.Label>
                                                            <Form.Control type='text' value={licenseExpire} onChange={(e) => setLicenseExpire(e.target.value)} placeholder='YYYY-MM-DD' />
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Button variant='primary' onClick={updateProfile}>Update Profile</Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>

                                    <Card
                                        className={`people-form-card practitioner-info-card practitioner-docs-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                        style={{ background: colors.card, borderColor: colors.border }}
                                    >
                                        <Card.Header><h5 className="m-0">Documents</h5></Card.Header>
                                        <Card.Body>
                                            {practitioner && practitioner.doc && practitioner.doc.length > 0 ? (
                                                <div className="practitioner-docs-grid">
                                                    {practitioner.doc.map((document) => (
                                                        <a key={document.url} href={document.url} target='_blank' rel='noreferrer' className="practitioner-doc-tile">
                                                            <div className="practitioner-doc-title">{document.name}</div>
                                                            <div className="practitioner-doc-icon"><i className='fas fa-file-alt'></i></div>
                                                        </a>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="patient-info-item patient-info-item--full">
                                                    <span className="patient-info-value">No documents uploaded.</span>
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Tab>

                            <Tab eventKey="activity" title="Activities" style={{ padding: '1% 0' }}>
                                <Card
                                    className={`people-form-card practitioner-info-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                    style={{ background: colors.card, borderColor: colors.border }}
                                >
                                    <Card.Header><h5 className="m-0">Activity & Metrics</h5></Card.Header>
                                    <Card.Body>
                                        <div className="patient-vitals-strip" style={{ justifyContent: 'flex-start', marginBottom: '0.7rem' }}>
                                            <span className="patient-vital-chip">Verified: {verified ? 'Yes' : 'No'}</span>
                                            <span className="patient-vital-chip">Online: {online ? 'Yes' : 'No'}</span>
                                            <span className="patient-vital-chip">Engaged: {engaged ? 'Yes' : 'No'}</span>
                                            <span className="patient-vital-chip">Active: {active ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="practitioner-metrics-grid">
                                            <div className="patient-info-item"><span className="patient-info-label">Registration Date</span><span className="patient-info-value">{createdAt || '--'}</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Registration Channel</span><span className="patient-info-value">{channel || '--'}</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Total Jobs</span><span className="patient-info-value">{totaljobs || 0}</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Total Rejects</span><span className="patient-info-value">{totalreject || 0}</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Total Earned</span><span className="patient-info-value">NGN {totalearned || 0}</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Wallet</span><span className="patient-info-value">NGN {wallet || 0}</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Distance</span><span className="patient-info-value">{totaldistance || 0} km</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Hours Online</span><span className="patient-info-value">{hoursonline || 0} hrs</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Membership Class</span><span className="patient-info-value">{membershipclass || '--'}</span></div>
                                            <div className="patient-info-item"><span className="patient-info-label">Average Rating</span><span className="patient-info-value">{rating || '--'}</span></div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Tab>
                        </Tabs>
                    )}
                </div>

        <Modal show={showInvite} onHide={handleCloseInvite} size="lg" centered className="people-modal">
                <Modal.Header closeButton>
                <Modal.Title>Invite Practitioner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ padding: '10px'}} className="text-dark">
                    <Form.Group controlId="venue">
                        <Form.Label>Venue</Form.Label>
                        <Form.Control type="text" placeholder="Enter Venue"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}>
                                
                        </Form.Control>
                    </Form.Group>
                    <Form.Row>
                    <Col>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}>
                                    
                            </Form.Control>
                            
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="text"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}>
                                    
                            </Form.Control>
                            
                        </Form.Group>
                    </Col>
                    </Form.Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleInvite}>
                        Send Invitation
                    </Button>
                </Modal.Footer>
        </Modal>
        <Modal show={showDecline} onHide={handleCloseDecline} centered className="people-modal">
                <Modal.Header closeButton>
                <Modal.Title>Decline Practitioner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ padding: '10px'}} className="text-dark">
                    <Form.Group controlId="venue">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control type="text" placeholder="Enter Reason for Decline"
                                value={declineReason}
                                onChange={(e) => setDeclineReason(e.target.value)}>
                                
                        </Form.Control>
                    </Form.Group>
                    
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleDecline}>
                        Decline
                    </Button>
                </Modal.Footer>
        </Modal>
        <Modal show={showReject} onHide={handleCloseReject} centered className="people-modal">
                <Modal.Header closeButton>
                <Modal.Title>Reject Practitioner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ padding: '10px'}} className="text-dark">
                    <Form.Group controlId="venue">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control type="text" placeholder="Enter Reason for Rejection"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}>
                                
                        </Form.Control>
                    </Form.Group>
                    
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleReject}>
                        Reject
                    </Button>
                </Modal.Footer>
        </Modal>
            </div>
    </>
     
  )
}

export default PractitionerProfile