import React, { useState, useEffect } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Skeleton from 'react-loading-skeleton';
import {getPatientDetails, listPatients} from '../actions/patientActions'
import { useCustomTheme } from '../hooks/useCustomTheme'
import './peoplePages.css'

const PatientProfile = ({ match, history }) => {
  const patientId = match.params.id
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [genotype, setGenotype] = useState('')
  const [bloodgroup, setBloodGroup] = useState('')
  const [rating, setRating] = useState('')

  const dispatch = useDispatch()
  const { isDarkMode, colors } = useCustomTheme()

  const patientDetails = useSelector((state) => state.patientDetails)
  const { loading, error, patient } = patientDetails

  const patientList = useSelector((state) => state.patientList)
  const { patients } = patientList

  let next, previous

  if (patients && patient){
    const ids = patients.map(patient => patient._id)
    const index = ids.indexOf(patientId)
    next = ids[(index + 1)] || ids[0]
    previous = ids[index -1 ] || ids[(ids.length - 1)]
  }

  useEffect(() => {
    dispatch(listPatients())
      if(!patient || !patient.firstname || patient._id !== patientId){
          dispatch(getPatientDetails(patientId))
      }else {
        setFirstname(patient.firstname)
        setLastname(patient.lastname)
        setDisplayname(patient.displayname)
        setPhone(patient.phone)
        setEmail(patient.email)
        setDOB(patient.dob.split("T")[0])
        setGender(patient.gender)
        setHeight(patient.height)
        setWeight(patient.weight)
        setGenotype(patient.genotype)
        setBloodGroup(patient.bloodgroup)
        setRating(patient.averageRating)
      }
  }, [dispatch, patientId, patient])

  return (
    <>
            <div className={`people-detail-shell ${isDarkMode ? 'people-detail-shell--dark' : ''}`} style={{
                color: colors.text.primary
            }}>
        {error && <Message variant='danger'>{error}</Message>}
                <div className="people-detail-shell__backbar">
                    <Link to='/user' className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
                        Back to users
                    </Link>
                    <div className="people-detail-actions">
                        {previous && <Link to={`/user/${previous}/view`} className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
                            <i className='fas fa-backward'></i>
                        </Link>}
                        {next && <Link to={`/user/${next}/view`} className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
                            <i className='fas fa-forward'></i>
                        </Link>}
                    </div>
        </div>

                <div style={{ padding: '0 0 5%' }}>

                    {loading ? (
                        <>
                            <Skeleton height={220} style={{ marginBottom: '1rem' }} />
                            <Skeleton height={340} />
                        </>
                    ) : (
                        <div className="patient-overview-grid">
                            <Card
                                className={`people-form-card patient-avatar-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                style={{
                                    background: colors.card,
                                    borderColor: colors.border
                                }}
                            >
                                <Card.Body>
                                    <div className="patient-avatar-wrap">
                                        <Image
                                            src={patient && patient.photo ? patient.photo : 'https://res.cloudinary.com/germiny/image/upload/v1588101822/profile-pic_mebjxq.png'}
                                            roundedCircle
                                            fluid
                                            className="patient-avatar"
                                        />
                                    </div>
                                    <h3 className="patient-name">{firstname || '--'} {lastname || ''}</h3>
                                    <p className="patient-handle">@{displayname || 'unknown-user'}</p>

                                    <div className="patient-vitals-strip">
                                        <span className="patient-vital-chip">Gender: {gender || '--'}</span>
                                        <span className="patient-vital-chip">DOB: {dob || '--'}</span>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card
                                className={`people-form-card patient-info-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                style={{
                                    background: colors.card,
                                    borderColor: colors.border
                                }}
                            >
                                <Card.Header>
                                    <h5 className="m-0">Personal Details</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="patient-info-grid">
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">First name</span>
                                            <span className="patient-info-value">{firstname || '--'}</span>
                                        </div>
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">Last name</span>
                                            <span className="patient-info-value">{lastname || '--'}</span>
                                        </div>
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">Username</span>
                                            <span className="patient-info-value">{displayname || '--'}</span>
                                        </div>
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">Phone</span>
                                            <span className="patient-info-value">{phone || '--'}</span>
                                        </div>
                                        <div className="patient-info-item patient-info-item--full">
                                            <span className="patient-info-label">Email</span>
                                            <span className="patient-info-value">{email || '--'}</span>
                                        </div>
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">Date of birth</span>
                                            <span className="patient-info-value">{dob || '--'}</span>
                                        </div>
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">Rating</span>
                                            <span className="patient-info-value">{rating || '--'}</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card
                                className={`people-form-card patient-info-card ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                style={{
                                    background: colors.card,
                                    borderColor: colors.border
                                }}
                            >
                                <Card.Header>
                                    <h5 className="m-0">Health Measurements</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <div className="patient-metric-tile">
                                                <div className="patient-metric-label">Height</div>
                                                <div className="patient-metric-value">{height || '--'} <span>m</span></div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="patient-metric-tile">
                                                <div className="patient-metric-label">Weight</div>
                                                <div className="patient-metric-value">{weight || '--'} <span>kg</span></div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="patient-info-grid" style={{ marginTop: '0.9rem' }}>
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">Blood Group</span>
                                            <span className="patient-info-value">{bloodgroup || '--'}</span>
                                        </div>
                                        <div className="patient-info-item">
                                            <span className="patient-info-label">Genotype</span>
                                            <span className="patient-info-value">{genotype || '--'}</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
        </div>
            </div>
    </>

  )
}

export default PatientProfile