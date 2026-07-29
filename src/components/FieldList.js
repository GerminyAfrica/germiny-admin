import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Form, Button, Modal} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import './peoplePages.css'
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
  Tooltip
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {listFields, deleteField, createField} from '../actions/fieldActions'
import { useCustomTheme } from '../hooks/useCustomTheme';

const FieldList = () => {
    const dispatch= useDispatch()
    const { isDarkMode, colors } = useCustomTheme()

    const fieldList = useSelector(state => state.fieldList)
    const {loading, error, fields} = fieldList

    const fieldDelete = useSelector(state => state.fieldDelete)
    const {success, error:deleteError} = fieldDelete

    const fieldCreate = useSelector(state => state.fieldCreate)
    const {success:createSuccess, error:createError} = fieldCreate

    const [name, setName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [practclass, setPractClass] = useState('')
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        dispatch(listFields())
     }, [dispatch, success, createSuccess])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteField(id))
        }
    }

    const handleCloseCreate = () => {
        setShowCreate(false)
    }
    const handleShowCreate = () => {
        setShowCreate(true)
    }

    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createField(name, displayName, practclass))
        handleCloseCreate()
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
              Configuration
            </Typography>
            <Typography variant="h4" component="h1" className="people-page-hero__title">
              Specializations
            </Typography>
            <Typography variant="body2" className="people-page-hero__subtitle">
              Manage specialization records used across practitioner onboarding and categorization.
            </Typography>
          </Box>
          <Box className="people-page-hero__meta">
            <Box className="people-page-hero__pill">Total <strong>{fields?.length || 0}</strong></Box>
          </Box>
        </Box>

        <Box className="people-control-strip" sx={{ justifyContent: 'space-between', mb: 3 }}>
          
          {loading ? <Skeleton width={'20%'} height={35}/>:
          <Button 
            variant={isDarkMode ? 'light' : 'primary'} 
            onClick={handleShowCreate}>
              Create Specialization
          </Button>}
        </Box>

            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {createError && <Message variant='danger'>{createError}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {createSuccess && <Message variant='success'>{"Created Successfully"}</Message>}
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
                        <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Display Name</TableCell>
                        <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Class</TableCell>
                        <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }} align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields && fields.map((field) => (
                        <TableRow key={field._id} hover>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            {field.displayName}
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            {field.practclass}
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }} align="center">
                            <LinkContainer to={`/field/${field._id}/view`}>
                              <Tooltip title="View Field">
                                <IconButton 
                                  color="primary" 
                                  style={{ color: colors.text.primary }}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                            </LinkContainer>
                            <Tooltip title="Delete Field">
                              <IconButton 
                                color="secondary" 
                                onClick={() => handleDelete(field._id)}
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
              className={isDarkMode ? 'dark-modal' : ''}>
                <Modal.Header 
                  closeButton
                  style={{ 
                    background: colors.surface, 
                    color: colors.text.primary,
                    borderBottom: `1px solid ${colors.border}`
                  }}>
                <Modal.Title style={{ color: colors.text.primary }}>Create Specialization</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ 
                  background: colors.surface, 
                  color: colors.text.primary 
                }}>
                <Form style={{ padding: '10px'}} className={isDarkMode ? "text-light" : "text-dark"}>
                    <Form.Row>
                    <Col>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Display Name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}>
                                    
                            </Form.Control>
                        </Form.Group>  
                    </Col>
                    </Form.Row>
                    
                        <Form.Group controlId="practclass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control as="select"
                                value={practclass}
                                onChange={(e) => setPractClass(e.target.value)}>
                                <option value="">Please Select</option>
                                <option value="Practitioner">Practitioner</option>
                                <option value="Veterinary">Veterinary</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer style={{ 
                  background: colors.surface, 
                  borderTop: `1px solid ${colors.border}` 
                }}>
                    <Button 
                      variant={isDarkMode ? "light" : "primary"} 
                      onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
              </Box>
    )
}
 export default FieldList