import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Button, Modal, Form, Col, InputGroup, DropdownButton, ButtonGroup, Dropdown, Row} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import { Typography } from "@material-ui/core";
import {listPractitioners, deletePractitioner, emailPractitioner} from '../actions/practitionerActions'
import {createEmail, listEmails, getEmailDetails, updateEmail} from '../actions/emailActions'
import { MDBDataTableV5 } from 'mdbreact';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { EMAIL_RESET } from '../constants/emailConstants'

const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()))

const PractitionerList = () => {
    const dispatch= useDispatch()

    const practitionerList = useSelector(state => state.practitionerList)
    const {loading, error, practitioners} = practitionerList

    const practitionerDelete = useSelector(state => state.practitionerDelete)
    const {success, error:errorDelete} = practitionerDelete

    const practitionerEmail = useSelector((state) => state.practitionerEmail)
    const { loading: loadingEmail, error:errorEmail, email } = practitionerEmail

    const emailList = useSelector(state => state.emailList)
    const {emails} = emailList

    const emailDetails = useSelector((state) => state.emailDetails)
    const { loading:detailLoading, error:detailError, email:detailEmail } = emailDetails

    const [practEmail, setPractEmail] = useState([])
    const [filter, setFilter] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [subject, setSubject] = useState('')
    const [show, setShow] = useState(false);
    const [showEmail, setShowEmail] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [showSend, setShowSend] = useState(false)
    const [emailSubject, setEmailSubject] = useState('')
    const [updateEditorState, setUpdateEditorState] = useState(EditorState.createEmpty())

    const message = getHtml(editorState)
    const emailMessage = getHtml(updateEditorState)

    useEffect(() => {
      dispatch(listPractitioners())
      dispatch(listEmails())
    }, [dispatch, success, filter])
  
    useEffect(() => {
      let message = detailEmail && detailEmail.message
      if (detailEmail && detailEmail.subject){
          setEmailSubject(detailEmail.subject)
      }
      console.log(message)
  
      if(message){
          const blocksFromHTML = convertFromHTML(message);
          const state = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
          )
          setUpdateEditorState(EditorState.createWithContent(state))
      }
    }, [detailEmail])

    const handleSetEmail = (e, email) => {
      setPractEmail((prev) => 
      e.target.checked === false && prev.includes(email) ? prev.filter((item) => item !== email) : [...prev, email])
    }
    const handleSetAllEmails = (e) => {
      if(e.target.checked){
        const emails = practitioners && practitioners.map((item) => item.email);
        setPractEmail(emails);
        return;
      }
      setPractEmail([]);
    }

    const handleDelete = (id) => {
      if (window.confirm('Are you sure?')) {
          dispatch(deletePractitioner(id))
      }
    }

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
      setShow(true)
  }

  const handleShowEmail = () => {
    setShowEmail(true)
  }

  const handleCloseEmail = () => {
    setShowEmail(false)
  }

  const handleShowSelect = () => {
    setShowSelect(true)
  }
  
  const handleCloseSelect = () => {
    setShowSelect(false)
  }

  const handleShowSend = (id) => {
    setShowSend(true)
    dispatch(getEmailDetails(id))    
  }

  const handleCloseSend = () => {
    setShowSend(false)
    dispatch({type:EMAIL_RESET})
  }

  const handleSendEmail = (e) => {
    e.preventDefault()
    dispatch(createEmail(subject, message))
    dispatch(emailPractitioner(subject, practEmail, message))
    handleCloseEmail()
    setPractEmail([])
  }

  const handleSendOldEmail = (id) => {
    dispatch(updateEmail(id, emailSubject, emailMessage))
    dispatch(emailPractitioner(emailSubject, practEmail, emailMessage))
    handleCloseSend()
    handleCloseSelect()
    setPractEmail([])
  }
    
    const data = {
        columns:[
          {
            label: <Form.Check type="checkbox" checked={practEmail.length > 0} onChange={ (e) => handleSetAllEmails(e)}/>,
            field:'select',
            sort: 'disabled'
          },
          {
            label: 'First Name',
            field: 'firstname',
            sort: 'disabled'
          },
          {
            label: 'Last Name',
            field: 'lastname',
            sort: 'disabled'
          },
          {
            label: 'Specialization',
            field: 'specialization',
            sort: 'disabled'
          },
          {
            label: 'Status',
            field: 'status',
            sort: 'disabled'
          },
          {
            label: 'Online?',
            field: 'online',
            sort: 'disabled'
          },
          {
            label: 'Engaged?',
            field: 'engaged',
            sort: 'disabled'
          },
          {
            label: 'Active?',
            field: 'active',
            sort: 'disabled'
          },
          {
            label: 'Total Jobs',
            field: 'totalJobs',
            sort: 'disabled'
          },
          {
            label: 'Average Rating',
            field: 'averageRating',
            sort: 'disabled'
          },
          {
            label: 'Membership Class',
            field: 'membershipClass',
            sort: 'disabled'
          },
          {
            label: 'Action',
            field: 'action',
            sort: 'disabled'
          }
        ], 
        rows:[]
    }

    const isSelected = (email) => practEmail.length > 0 && practEmail.indexOf(email) !== -1; 

    if (practitioners){
        practitioners.map(pract => {
          const isItemSelected = isSelected(pract && pract.email);
            data.rows.push({
                select:<Form.Check type="checkbox" checked={isItemSelected} onChange={ (e) => handleSetEmail(e, pract.email)}/>,
                firstname:pract.firstname,
                lastname: pract.lastname,
                specialization:pract.field,
                status:pract.status,
                online: pract.online? "Yes" : "No",
                engaged:pract.engaged? "Yes" : "No",
                active:pract.active? "Yes": "No",
                totalJobs:pract.totalJobs,
                averageRating:pract.averageRating || '--•--',
                membershipClass: pract.membershipClass || '--•--',
                action: <div>
                          <LinkContainer to={`/practitioner/${pract._id}/view`}>
                              <Button variant='primary' className='btn-sm'>
                                  <i className='fas fa-eye'></i>
                              </Button>
                          </LinkContainer>
                          <Button variant='danger' className='btn-sm' onClick={() => {handleDelete(pract._id)}}>
                            <i className='fas fa-trash-alt'></i>
                          </Button>
                        </div>
           })
        })
    }
    if (filter){
      data.rows = data.rows.filter(row => row.status == filter)
    }


    const emailData = {
      columns:[
        {
          label: 'Subject',
          field: 'subject',
          sort: 'disabled'
        },
        
        {
          label: 'Action',
          field: 'action'
        }
      ], 
      rows:[]
  }

  if (emails){
      emails.map(email => {
          emailData.rows.push({
              subject:email.subject,
              action: <div>
                          
                              <Button variant='primary' className='btn-sm' onClick={() => {handleShowSend(email._id)}}>
                                  <i className='fas fa-eye'></i>
                              </Button>
                         
                      </div>                      

          })
      })
  }
 
    return (
        <div className="text-dark">
          {loadingEmail && <Skeleton/>}
          {errorEmail && <Message variant='danger'>{errorEmail}</Message>}
          {email && email.message && <Message variant='success'>{email.message}</Message>}
          <Typography style={{ padding: '10px' }} variant="h6"> Practitioners</Typography>
           <Row>
            <Col>
            {loading ? <Skeleton width={'20%'} height={35}/>:
              <Form>
                <Form.Group as={Col} md="4" controlId="filter">
                  <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className='fas fa-filter'  style={{color:'green'}}></i></InputGroup.Text>
                    </InputGroup.Prepend>
                      <Form.Control as="select"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}>
                          <option value="">No Filter</option>
                          <option value="New">New</option>
                          <option value="Review">Review</option>
                          <option value="Invited">Invited</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Verified">Verified</option>
                          <option value="Deactivated">Deactivated</option>
                      </Form.Control>
                    </InputGroup>
                </Form.Group>
              </Form>}
            </Col>
            {practEmail && practEmail.length > 0 && <Col>
              <DropdownButton variant="outline-primary" as={ButtonGroup} title="Action">
                <DropdownButton variant="light" drop='right' title= "Send Email" as={ButtonGroup}>
                  <Dropdown.Item eventKey="1" onClick={handleShowEmail}>Compose Email</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={handleShowSelect}>Select Email</Dropdown.Item>
                  
                </DropdownButton>
                <Dropdown.Item eventKey="3">Export</Dropdown.Item>
              </DropdownButton>
            </Col>}
           </Row>
            
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading ?
            <Skeleton width={'100%'} height={500}/>:
                <MDBDataTableV5
                    striped
                    bordered
                    hover
                    entriesOptions={[5, 10, 20, 50]} entries={7} pagesAmount={4}
                    data={data}
                    searchTop 
                    searchBottom={false}
                    fullPagination>
                </MDBDataTableV5>
            }
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure? This action cannot be reverted</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Discard
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEmail} onHide={handleCloseEmail} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Compose Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form style={{ padding: '5px'}} className="text-dark">
                        <Form.Group controlId="subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                  </Form>
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder="Compose email here..."
                    onEditorStateChange={setEditorState}
                  />
                  
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSendEmail}>
                        Send 
                        <i className='fas fa-paper-plane'></i>
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSelect} onHide={handleCloseSelect} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>
                  Select Email
                  {detailLoading && <Skeleton/>}
                  {detailError && <Message variant='danger'>{detailError}</Message>}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {loading ?
                <Skeleton width={'100%'} height={500}/>:
                    <MDBDataTableV5
                        striped
                        bordered
                        hover
                        entriesOptions={[5, 10, 20]} entries={7} pagesAmount={4}
                        data={emailData}
                        searchTop 
                        searchBottom={false}
                        fullPagination
                        >

                    </MDBDataTableV5>
                }
                </Modal.Body>
            </Modal>

            {detailEmail && detailEmail.subject && <Modal show={showSend} onHide={handleCloseSend} size="lg" centered>
                <Modal.Header closeButton>
                  <Modal.Title>Send Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ padding: '5px'}} className="text-dark">
                            <Form.Group controlId="subject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" placeholder="Subject"
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                    </Form>
                    <Editor
                        editorState={updateEditorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setUpdateEditorState}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {handleSendOldEmail(detailEmail._id)}}>
                        Send
                        <i className='fas fa-paper-plane'></i>
                    </Button>
                </Modal.Footer>
            </Modal>}
        </div>
    )
}
 export default PractitionerList