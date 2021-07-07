import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Form, Button, Modal} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import { Typography } from "@material-ui/core";
import {listEmails, createEmail, deleteEmail, getEmailDetails, updateEmail} from '../actions/emailActions'
import { MDBDataTableV5 } from 'mdbreact';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { EMAIL_RESET } from '../constants/emailConstants'

const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()))


const EmailList = () => {
    const dispatch= useDispatch()

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const emailList = useSelector(state => state.emailList)
    const {loading, error, emails} = emailList

    const emailDelete = useSelector(state => state.emailDelete)
    const {success, error:deleteError} = emailDelete

    const emailCreate = useSelector(state => state.emailCreate)
    const {success:createSuccess, error:createError} = emailCreate

    const emailDetails = useSelector((state) => state.emailDetails)
    const { loading:detailLoading, error:detailError, email } = emailDetails

    const emailUpdate = useSelector(state => state.emailUpdate)
    const {loading:updateLoading, success:updateSuccess, error:updateError} = emailUpdate

    // const [updateEditorState, setUpdateEditorState] = useState(EditorState.createEmpty(email.message))
    const [updateEditorState, setUpdateEditorState] = useState(EditorState.createEmpty())

    const [subject, setSubject] = useState('')
    const [emailSubject, setEmailSubject] = useState('')
    const message = getHtml(editorState)
    const emailMessage = getHtml(updateEditorState)
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        dispatch(listEmails())
     }, [dispatch, success, createSuccess, updateSuccess])

    useEffect(() => {
        let message = email && email.message
        if (email && email.subject){
            setEmailSubject(email.subject)
        }

        if(message){
            const blocksFromHTML = convertFromHTML(message);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )
            setUpdateEditorState(EditorState.createWithContent(state))
        }
    }, [email])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteEmail(id))
        }
    }
    const handleCloseCreate = () => {
        setShowCreate(false)
    }
    const handleShowCreate = () => {
        setShowCreate(true)
    }
    const handleCloseEdit = () => {
        setShowEdit(false)
        dispatch({type:EMAIL_RESET})
    }

    const handleShowEdit = (id) => {
        setShowEdit(true)
        dispatch(getEmailDetails(id))
        
    }

    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createEmail(subject, message))
        handleCloseCreate()
    }

    const handleUpdate = (id) => {
        dispatch(updateEmail(id, emailSubject, emailMessage))
        handleCloseEdit()
    }

    const data = {
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
            data.rows.push({
                subject:email.subject,
                action: <div>
                            
                                <Button variant='primary' className='btn-sm' onClick={() => {handleShowEdit(email._id)}}>
                                    <i className='fas fa-edit'></i>
                                </Button>
                           
                            <Button variant='danger' className='btn-sm' onClick={() => {handleDelete(email._id)}}>
                                <i className='fas fa-trash-alt'></i>
                            </Button>
                        </div>                      

            })
        })
    }

    
    return (
        <div className="text-dark">
           <Typography style={{ padding: '10px' }} variant="h6"> Emails</Typography>
           {detailLoading && <Skeleton/>}
           {updateLoading && <Skeleton/>}
           {loading ? <Skeleton width={'20%'} height={35}/>:
           <Button variant='primary' className='btn btn-primary pull-right' onClick={handleShowCreate}>
                Compose Email
            </Button>}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {createError && <Message variant='danger'>{createError}</Message>}
            {updateError && <Message variant='danger'>{updateError}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {detailError && <Message variant='danger'>{detailError}</Message>}
            {createSuccess && <Message variant='success'>{"Created Successfully"}</Message>}
            {updateSuccess && <Message variant='success'>{"Updated Successfully"}</Message>}
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
                    fullPagination
                    >

                </MDBDataTableV5>
            }
            <Modal show={showCreate} onHide={handleCloseCreate} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Create Email</Modal.Title>
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
                    <Button variant="primary" onClick={handleCreate}>
                        Save Email
                    </Button>
                </Modal.Footer>
            </Modal>
            {email && email.subject && <Modal show={showEdit} onHide={handleCloseEdit} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Update Email</Modal.Title>
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
                    <Button variant="primary" onClick={() => {handleUpdate(email._id)}}>
                        Update Email
                    </Button>
                </Modal.Footer>
            </Modal>}
        </div>
    )
}
 export default EmailList