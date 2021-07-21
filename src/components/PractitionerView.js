import React, { useState, useEffect } from 'react'
import { Card, Image, Form, Button, ButtonGroup, Row, Col, CardColumns, Tabs, Tab, InputGroup, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Skeleton from 'react-loading-skeleton';
import {getPractitionerDetails, verifyPractitioner, deactivatePractitioner, activatePractitioner, invitePractitioner, declinePractitioner, rejectPractitioner, listPractitioners} from '../actions/practitionerActions'


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
  const [doc, setDoc] = useState([])
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
        setDoc(practitioner.doc)
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
    dispatch(verifyPractitioner(email))
    
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

  return (
    <>
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

        <Link to='/practitioner' className='btn btn-light float-left'>
            Back
        </Link>
        {next && <Link to={`/practitioner/${next}/view`} className='btn btn-light float-right'>
            <i className='fas fa-forward'></i>
        </Link>}
        {previous && <Link to={`/practitioner/${previous}/view`} className='btn btn-light float-right'>
            <i className='fas fa-backward'></i>
        </Link>}
        <div style={{padding:"3%"}}>
            
           {!loading && practitioner && practitioner.status === 'New' &&
           <ButtonGroup >
               <Button variant='info' className='btn btn-primary' onClick={handleShowInvite}>
                    Invite
                </Button>
                <Button variant='warning' className='btn btn-primary' onClick={handleShowDecline}>
                    Decline
                </Button>
           </ButtonGroup>}
                      
           {!loading && practitioner && practitioner.status === 'Invited' &&
           <ButtonGroup>
               <Button variant='primary' className='btn btn-primary' onClick={handleVerify}>
                    Verify
                </Button>
                <Button variant='danger' className='btn btn-primary' onClick={handleShowReject}>
                    Reject
                </Button>
           </ButtonGroup>}
           
           {!loading && practitioner && practitioner.status === 'Verified' && practitioner.active && <Button variant='warning' className='btn btn-primary pull-right' onClick={handleDeactivate}>
                Deactivate
            </Button>}

           {!loading && practitioner && practitioner.status === 'Deactivated' && !practitioner.active && <Button variant='success' className='btn btn-primary pull-right' onClick={handleActivate}>
                Activate
            </Button>}
        </div>
        
        <Tabs defaultActiveKey="profile">
            <Tab eventKey="profile" title="Personal Information" style= {{padding:"1%"}}>
                <CardColumns>
                {loading ?
                <Skeleton height={180} width={'80%'}/>:
                    <Card xs={6} md={4} className="text-dark" border="success" style={{ width: '80%'}}>
                        <Card.Header><h6>Profile Picture</h6></Card.Header>
                        <Row>
                            <Col/>
                            <Col xs={4} md={6}>
                                {practitioner && practitioner.photo ?
                                <Image style= {{padding:"5%", borderRadius:"50%"}} src={practitioner.photo} roundedCircle fluid/>:
                                <Image style= {{padding:"5%", borderRadius:"50%"}} src={"https://res.cloudinary.com/germiny/image/upload/v1588101822/profile-pic_mebjxq.png"} roundedCircle fluid/>
                                }
                            </Col>
                            <Col/>
                        </Row>
                    </Card>}
                    {loading ?
                    <Skeleton width={'200%'} height={400}/>:
                    <Card xs={6} md={4} border="dark" style={{ width: '200%' }} className="text-center text-dark">
                        <Card.Header><h5>Practitioner Profile</h5></Card.Header>
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
                        </Form>
                    
                    </Card>}
                </CardColumns>

            </Tab>
            <Tab eventKey="professional" title="Professional Information" style= {{padding:"1%"}}>
                <CardColumns>
                    {loading ?
                    <Skeleton width={'80%'} height={250}/>:
                        <Card xs={6} md={4} className="text-dark" border="success" style={{ width: '80%', padding:'2%'}}>
                            <Card.Header><h6>Documents</h6></Card.Header>
                            <Row>
                            {practitioner && practitioner.doc && practitioner.doc.length > 0 && practitioner.doc.map(doc => (
                                <Col key={doc.url}>
                                    <h5 className="text-uppercase">{doc.name}</h5>
                                    <a href={doc.url} target='_blank'>
                                        <Button variant='secondary' className='btn-lg'>
                                            {doc.url && doc.url.split('.')[3] === 'pdf'? <i className='fas fa-2x fa-file-pdf'></i>:
                                            doc.url && doc.url.split('.')[3] === 'docx'? <i className='fas fa-2x fa-file-word'></i>:
                                            doc.url && doc.url.split('.')[3] === 'ppt'? <i className='fas fa-2x fa-file-powerpoint'></i>:
                                            doc.url && doc.url.split('.')[3] === 'jpg'? <i className='fas fa-2x fa-file-image'></i>:
                                            doc.url && doc.url.split('.')[3] === 'png'? <i className='fas fa-2x fa-file-image'></i>:
                                            <i className='fas fa-2x fa-file-alt'></i>}
                                        </Button>
                                    </a>
                                </Col>
                                
                            ))}
                            {practitioner && practitioner.doc && practitioner.doc.length === 0 && <h6>No Documents Uploaded</h6>}
                            </Row>
                        </Card>}
                        {loading ?
                        <Skeleton width={'200%'} height={300}/>:
                        <Card xs={6} md={4} className=" text-center text-dark" border="dark" style={{ padding:'2%', width: '200%'}}>
                          <Form style={{ padding: '10px'}} className="text-dark">
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId='practclass'>
                                        <Form.Label>Practitioner Class</Form.Label>
                                        <Form.Control
                                            type='practclass'
                                            value={practclass}
                                            onChange={(e) => setPractClass(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='specialization'>
                                        <Form.Label>Specialization</Form.Label>
                                        <Form.Control
                                            type='specialization'
                                            value={specialization}
                                            onChange={(e) => setSpecialization(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId='yearofgrad'>
                                        <Form.Label>Year of Graduation</Form.Label>
                                        <Form.Control
                                            type='yearofgrad'
                                            value={yearofgrad}
                                            onChange={(e) => setYearOfGrad(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='yearofhouse'>
                                        <Form.Label>Year of Housemanship</Form.Label>
                                        <Form.Control
                                            type='yearofhouse'
                                            value={yearofhouse}
                                            onChange={(e) => setYearOfHouse(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='yearofexp'>
                                        <Form.Label>Years of Experience</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Append>
                                            <InputGroup.Text>Years</InputGroup.Text>
                                            </InputGroup.Append>
                                            <Form.Control
                                                type='yearofexp'
                                                value={yearofexp}
                                                onChange={(e) => setYearOfExp(e.target.value)}
                                                readOnly>
                                            </Form.Control>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId='licenseNo'>
                                        <Form.Label>License Number</Form.Label>
                                        <Form.Control
                                            type='licenseNo'
                                            value={licenseNo}
                                            onChange={(e) => setLicenseNo(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='licenseExpire'>
                                        <Form.Label>License Expiry Date</Form.Label>
                                        <Form.Control
                                            type='licenseExpire'
                                            value={licenseExpire}
                                            onChange={(e) => setLicenseExpire(e.target.value)}
                                            readOnly>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                        </Form>
                                
                      </Card>}
                    </CardColumns>
              
            </Tab>
            <Tab eventKey="activity" title="Activities" style= {{padding:"1%"}}>
            {loading ?
            <Skeleton width={'100%'} height={400}/>:
            <Card xs={6} md={4} className="text-dark" border="dark" style={{ padding:'2%'}}>
              <Form style={{ padding: '10px'}} className="text-dark">
                <Form.Row>
                    <Col>
                        <Form.Group controlId='verified'>
                            <Form.Check
                            type='checkbox'
                            label='Verified'
                            checked={verified}
                            onChange={(e) => setVerified(e.target.checked)}
                            disabled>
                            </Form.Check>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='online'>
                            <Form.Check
                            type='checkbox'
                            label='Online'
                            checked={online}
                            onChange={(e) => setOnline(e.target.checked)}
                            disabled>
                            </Form.Check>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='engaged'>
                            <Form.Check
                            type='checkbox'
                            label='Engaged'
                            checked={engaged}
                            onChange={(e) => setEngaged(e.target.checked)}
                            disabled>
                            </Form.Check>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='active'>
                            <Form.Check
                            type='checkbox'
                            label='Active'
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                            disabled>
                            </Form.Check>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId='createdAt'>
                        <Form.Label>Registration Date</Form.Label>
                            <Form.Control
                                type='createdAt'
                                value={createdAt}
                                onChange={(e) => setCreatedAt(e.target.value)}
                                readOnly>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='channel'>
                        <Form.Label>Registration Channel</Form.Label>
                            <Form.Control
                                type='channel'
                                value={channel}
                                onChange={(e) => setChannel(e.target.value)}
                                readOnly>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId='totaljobs'>
                            <Form.Label>Total Number of Jobs</Form.Label>
                            <Form.Control
                                type='totaljobs'
                                value={totaljobs}
                                onChange={(e) => setTotalJobs(e.target.value)}
                                readOnly>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='totalrejects'>
                            <Form.Label>Total Number of Rejects</Form.Label>
                            <Form.Control
                                type='totalrejects'
                                value={totalreject}
                                onChange={(e) => setTotalReject(e.target.value)}
                                readOnly>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='totalearned'>
                            <Form.Label>Total Earned</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>NGN</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type='totalearned'
                                    value={totalearned}
                                    onChange={(e) => setTotalEarned(e.target.value)}
                                    readOnly>
                            </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>   
                    <Col>
                        <Form.Group controlId='wallet'>
                            <Form.Label>Amount in Wallet</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>NGN</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type='wallet'
                                    value={wallet}
                                    onChange={(e) => setWallet(e.target.value)}
                                    readOnly>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='totaldistance'>
                            <Form.Label>Total Distance</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>KM</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type='totaldistance'
                                    value={totaldistance}
                                    onChange={(e) => setTotalDistance(e.target.value)}
                                    readOnly>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='hoursonline'>
                            <Form.Label>Hours Online</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>HOURS</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type='hoursonline'
                                    value={hoursonline}
                                    onChange={(e) => setHoursOnline(e.target.value)}
                                    readOnly>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId='membershipclass'>
                            <Form.Label>Membership Class</Form.Label>
                            <Form.Control
                                type='membershipclass'
                                value={membershipclass}
                                onChange={(e) => setMembershipClass(e.target.value)}
                                readOnly>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='rating'>
                            <Form.Label>Average Rating</Form.Label>
                            <Form.Control
                                type='rating'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                readOnly>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
              </Form>
              </Card>}
            </Tab>
        </Tabs>

        <Modal show={showInvite} onHide={handleCloseInvite} size="lg" centered>
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
        <Modal show={showDecline} onHide={handleCloseDecline} centered>
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
        <Modal show={showReject} onHide={handleCloseReject} centered>
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
    </>
     
  )
}

export default PractitionerProfile