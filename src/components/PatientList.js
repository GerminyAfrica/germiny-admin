import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Button, Modal} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import { Typography } from "@material-ui/core";
import {listPatients, deletePatient} from '../actions/patientActions'
import { MDBDataTableV5 } from 'mdbreact';


const PatientList = () => {
    const dispatch= useDispatch()

    const patientList = useSelector(state => state.patientList)
    const {loading, error, patients} = patientList

    const patientDelete = useSelector(state => state.patientDelete)
    const {success, error:err} = patientDelete

    const [show, setShow] = useState(false);

    useEffect(() => {
      dispatch(listPatients())
   }, [dispatch, success])

    const data = {
        columns:[
          {
            label: 'First Name',
            field: 'firstname',
            sort: 'asc'
          },
          {
            label: 'Last Name',
            field: 'lastname',
            sort: 'asc'
          },
          {
            label: 'Email',
            field: 'email'
          },
          {
            label: 'Phone',
            field: 'phone',
          },
          {
            label: 'Gender',
            field: 'gender',
          },
          {
            label: 'Average Rating',
            field: 'averageRating',
            sort: 'asc'
          },
          {
            label: 'Last Active',
            field: 'lastActive',
            sort: 'asc'
          },
          {
            label: 'Action',
            field: 'action'
          }
        ], 
        rows:[]
    }

    if (patients){
        patients.map(patient => {
            data.rows.push({
                firstname:patient.firstname,
                lastname: patient.lastname,
                email:patient.email,
                phone:patient.phone,
                gender:patient.gender,
                averageRating:patient.averageRating || '--•--',
                lastActive:patient.lastActive || 'Never',
                action: <div>
                          <LinkContainer to={`/user/${patient._id}/view`}>
                            <Button variant='primary' className='btn-sm'>
                                <i className='fas fa-eye'></i>
                            </Button>
                         </LinkContainer>
                         <Button variant='danger' className='btn-sm' onClick={() => {handleDelete(patient._id)}}>
                            <i className='fas fa-trash-alt'></i>
                         </Button>
                        </div>
            })
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deletePatient(id))
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true)
    }
    
    return (
        <div className="text-dark">
           <Typography style={{ padding: '10px' }} variant="h6"> Users</Typography>
            {err && <Message variant='danger'>{err}</Message>}
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
                    fullPagination
                    checkbox
                    multipleCheckboxes>

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
                <Button variant="danger" onClick={() => {handleDelete()}}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
 export default PatientList