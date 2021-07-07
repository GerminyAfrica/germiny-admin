import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Form, Button, Modal} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import { Typography } from "@material-ui/core";
import {listFields, deleteField, createField} from '../actions/fieldActions'
import { MDBDataTableV5 } from 'mdbreact';


const FieldList = () => {
    const dispatch= useDispatch()

    const fieldList = useSelector(state => state.fieldList)
    const {loading, error, fields} = fieldList

    const fieldDelete = useSelector(state => state.fieldDelete)
    const {success, error:deleteError} = fieldDelete

    const fieldCreate = useSelector(state => state.fieldCreate)
    const {success:createSuccess, error:createError} = fieldCreate

    const [name, setName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [practclass, setPractClass] = useState('')
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        dispatch(listFields())
     }, [dispatch, success, createSuccess])

    const data = {
        columns:[
          {
            label: 'Display Name',
            field: 'displayname',
            sort: 'asc'
          },
          {
            label: 'Class',
            field: 'class',
            sort: 'asc'
          },
          
          {
            label: 'Action',
            field: 'action'
          }
        ], 
        rows:[]
    }

    if (fields){
        fields.map(field => {
            data.rows.push({
                displayname:field.displayName,
                class: field.practclass,
                action: <div>
                            <LinkContainer to={`/field/${field._id}/view`}>
                                <Button variant='primary' className='btn-sm'>
                                    <i className='fas fa-eye'></i>
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => {handleDelete(field._id)}}>
                                <i className='fas fa-trash-alt'></i>
                            </Button>
                        </div>
            })
        })
    }

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
        <div className="text-dark">
           <Typography style={{ padding: '10px' }} variant="h6"> Specializations</Typography>
           {loading ? <Skeleton width={'20%'} height={35}/>:
           <Button variant='primary' className='btn btn-primary pull-right' onClick={handleShowCreate}>
                Create
            </Button>}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {createError && <Message variant='danger'>{createError}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {createSuccess && <Message variant='success'>{"Created Successfully"}</Message>}
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
                    checkbox
                    multipleCheckboxes>

                </MDBDataTableV5>
            }
            <Modal show={showCreate} onHide={handleCloseCreate} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Create Specialization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form style={{ padding: '10px'}} className="text-dark">
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
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
 export default FieldList