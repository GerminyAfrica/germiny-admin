import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Modal} from 'react-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import { 
  Box,
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {listEmails, createEmail, deleteEmail, getEmailDetails, updateEmail} from '../actions/emailActions'
import { useCustomTheme } from '../hooks/useCustomTheme';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { EMAIL_RESET } from '../constants/emailConstants'

const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()))


const EmailList = () => {
    const dispatch= useDispatch()
    const { isDarkMode, colors } = useCustomTheme()

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

    return (
      <Box
        className={`people-page-shell ${isDarkMode ? 'people-page-shell--dark' : 'people-page-shell--light'}`}
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          margin: { xs: 1, sm: 2, md: 3 },
          minHeight: '80vh',
          color: isDarkMode ? '#fff' : '#000'
        }}
      >
        <Box className="people-page-hero">
          <Box>
            <Typography variant="overline" className="people-page-hero__eyebrow">
              Communications
            </Typography>
            <Typography variant="h4" component="h1" className="people-page-hero__title">
              Email templates
            </Typography>
            <Typography variant="body2" className="people-page-hero__subtitle">
              Manage reusable email templates and keep outbound messaging consistent.
            </Typography>
          </Box>
          <Box className="people-page-hero__meta">
            <Box className="people-page-hero__pill">Total <strong>{emails?.length || 0}</strong></Box>
          </Box>
        </Box>

        <Box className="people-control-strip" sx={{ justifyContent: 'space-between', mb: 3 }}>
         
           {detailLoading && <Skeleton/>}
           {updateLoading && <Skeleton/>}
           {loading ? <Skeleton width={'20%'} height={35}/>:
           <Button 
             variant={isDarkMode ? 'light' : 'primary'} 
             onClick={handleShowCreate}>
                Create Email Template
            </Button>}
        </Box>

            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {createError && <Message variant='danger'>{createError}</Message>}
            {updateError && <Message variant='danger'>{updateError}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {detailError && <Message variant='danger'>{detailError}</Message>}
            {createSuccess && <Message variant='success'>{"Created Successfully"}</Message>}
            {updateSuccess && <Message variant='success'>{"Updated Successfully"}</Message>}
            {loading ?
            <Skeleton width={'100%'} height={500}/>:
                <TableContainer
                  component={Paper}
                  className="people-table-shell"
                  sx={{
                    borderRadius: 0,
                    background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Subject</TableCell>
                        <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }} align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {emails && emails.map((email) => (
                        <TableRow key={email._id} hover>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            {email.subject}
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }} align="center">
                            <Tooltip title="Edit Email">
                              <IconButton 
                                color="primary" 
                                onClick={() => handleShowEdit(email._id)}
                                style={{ color: colors.text.primary }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Email">
                              <IconButton 
                                color="secondary" 
                                onClick={() => handleDelete(email._id)}
                                style={{ color: '#f56565' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            }
            <Modal 
              show={showCreate} 
              onHide={handleCloseCreate} 
              size="lg" 
              centered
              className={isDarkMode ? 'dark-modal' : ''}
              style={{
                '--bs-modal-bg': colors.surface,
                '--bs-modal-color': colors.text.primary
              }}>
                <Modal.Header 
                  closeButton
                  style={{ 
                    background: colors.surface, 
                    color: colors.text.primary,
                    borderBottom: `1px solid ${colors.border}`
                  }}>
                <Modal.Title style={{ color: colors.text.primary }}>Create Email</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ 
                  background: colors.surface, 
                  color: colors.text.primary 
                }}>
                    <Form style={{ padding: '5px'}} className={isDarkMode ? "text-light" : "text-dark"}>
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
                <Modal.Footer style={{ 
                  background: colors.surface, 
                  borderTop: `1px solid ${colors.border}` 
                }}>
                    <Button 
                      variant={isDarkMode ? "light" : "primary"} 
                      onClick={handleCreate}>
                        Save Email
                    </Button>
                </Modal.Footer>
            </Modal>
            {email && email.subject && <Modal 
              show={showEdit} 
              onHide={handleCloseEdit} 
              size="lg" 
              centered
              className={isDarkMode ? 'dark-modal' : ''}>
                <Modal.Header 
                  closeButton
                  style={{ 
                    background: colors.surface, 
                    color: colors.text.primary,
                    borderBottom: `1px solid ${colors.border}`
                  }}>
                <Modal.Title style={{ color: colors.text.primary }}>Update Email</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ 
                  background: colors.surface, 
                  color: colors.text.primary 
                }}>
                    <Form style={{ padding: '5px'}} className={isDarkMode ? "text-light" : "text-dark"}>
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
                <Modal.Footer style={{ 
                  background: colors.surface, 
                  borderTop: `1px solid ${colors.border}` 
                }}>
                    <Button 
                      variant={isDarkMode ? "light" : "primary"} 
                      onClick={() => {handleUpdate(email._id)}}>
                        Update Email
                    </Button>
                </Modal.Footer>
            </Modal>}
              </Box>
    )
}
 export default EmailList