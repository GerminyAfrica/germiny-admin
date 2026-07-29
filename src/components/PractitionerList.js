import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Modal, Form, DropdownButton, Dropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import './peoplePages.css'
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  IconButton, 
  Chip,
  useTheme
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Edit, Delete, Visibility } from '@material-ui/icons';
import {listPractitioners, deletePractitioner, emailPractitioner} from '../actions/practitionerActions'
import {createEmail, listEmails, getEmailDetails, updateEmail} from '../actions/emailActions'
import { useTheme as useCustomTheme } from '../theme/ThemeProvider';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { EMAIL_RESET } from '../constants/emailConstants'
import * as XLSX from 'xlsx'

const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()))

const PractitionerList = () => {
    const dispatch= useDispatch()
    const { isDarkMode } = useCustomTheme()

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
    const [filter, setFilter] = useState(localStorage.getItem('filter'))
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [subject, setSubject] = useState('')
    const [showEmail, setShowEmail] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [showSend, setShowSend] = useState(false)
    const [emailSubject, setEmailSubject] = useState('')
    const [updateEditorState, setUpdateEditorState] = useState(EditorState.createEmpty())
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [rowsPerPage] = useState(10)
    const [searchFocused, setSearchFocused] = useState(false)
    const [showActionsMenu, setShowActionsMenu] = useState(false)
    const [showSendEmailSubmenu, setShowSendEmailSubmenu] = useState(false)

    const theme = useTheme()
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
    setShowActionsMenu(false)
    setShowSendEmailSubmenu(false)
  }

  const handleOpenComposeEmail = () => {
    handleShowEmail()
    setShowActionsMenu(false)
    setShowSendEmailSubmenu(false)
  }

  const handleOpenTemplateSelector = () => {
    handleShowSelect()
    setShowActionsMenu(false)
    setShowSendEmailSubmenu(false)
  }

  const handleExportSelected = () => {
    const selected = (practitioners || []).filter((item) => practEmail.includes(item.email))
    if (selected.length === 0) {
      return
    }

    const rows = selected.map((item, index) => ({
      SN: index + 1,
      Name: `${item.firstname || ''} ${item.lastname || ''}`.trim(),
      Email: item.email || '',
      Phone: item.phone || '',
      Specialization: item.field || '',
      Status: item.status || '',
      Online: item.online ? 'Yes' : 'No',
      Engaged: item.engaged ? 'Yes' : 'No',
      Active: item.active ? 'Yes' : 'No',
      Jobs: item.totalJobs || 0,
      Rating: item.averageRating || '',
      Membership: item.membershipClass || ''
    }))

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Practitioners')

    const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-')
    XLSX.writeFile(workbook, `practitioners-selected-${stamp}.xlsx`)

    setShowActionsMenu(false)
    setShowSendEmailSubmenu(false)
  }
    
    // Filter and search functionality
    const isSelected = (email) => practEmail.length > 0 && practEmail.indexOf(email) !== -1;

    let filteredPractitioners = practitioners || [];
    
    // Apply status filter
    if (filter && filter !== "All") {
      if (filter === 'Complete') {
        filteredPractitioners = filteredPractitioners.filter(pract => pract.documentStatus === "Complete");
      } else {
        filteredPractitioners = filteredPractitioners.filter(pract => pract.status === filter);
      }
    }

    // Apply search filter
    if (searchTerm) {
      filteredPractitioners = filteredPractitioners.filter(pract => 
        pract.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pract.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pract.field?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pract.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Pagination
    const totalPages = Math.ceil(filteredPractitioners.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const paginatedPractitioners = filteredPractitioners.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };

    const getStatusColor = (status) => {
      const statusColors = {
        'New': isDarkMode ? '#9ca3af' : '#374151',
        'Review': isDarkMode ? '#a3a3a3' : '#525252', 
        'Verified': isDarkMode ? '#d4d4d4' : '#262626',
        'Rejected': isDarkMode ? '#737373' : '#404040',
        'Invited': isDarkMode ? '#666666' : '#3a3a3a',
        'Complete': isDarkMode ? '#bdbdbd' : '#4b5563',
        'Deactivated': isDarkMode ? '#7d7d7d' : '#525252',
        'Expired': isDarkMode ? '#8a8a8a' : '#3f3f46'
      };
      return statusColors[status] || (isDarkMode ? '#90a4ae' : '#607d8b');
    };


    // Email templates for selection modal - keeping original structure for modal
    const emailTemplates = emails || [];
 
    return (
        <>
        <Box
            className={`people-page-shell practitioner-page-shell ${isDarkMode ? 'people-page-shell--dark' : 'people-page-shell--light'}`}
          sx={{
            padding: { xs: 2, sm: 3, md: 4 },
            margin: { xs: 1, sm: 2, md: 3 },
            minHeight: '80vh',
            color: isDarkMode ? '#fff' : '#000',
            overflow: 'visible'
          }}
        >
          <Box className="people-page-hero">
            <Box>
              <Typography variant="overline" className="people-page-hero__eyebrow">
                Practitioners
              </Typography>
              <Typography variant="h4" component="h1" className="people-page-hero__title">
                Practitioner directory
              </Typography>
              <Typography variant="body2" className="people-page-hero__subtitle">
                Review status, manage bulk emails, and keep the list easy to scan.
              </Typography>
            </Box>
            <Box className="people-page-hero__meta">
              <Box className="people-page-hero__pill">Total <strong>{practitioners?.length || 0}</strong></Box>
              <Box className="people-page-hero__pill">Visible <strong>{filteredPractitioners.length}</strong></Box>
              <Box className="people-page-hero__pill">Selected <strong>{practEmail.length}</strong></Box>
            </Box>
          </Box>

          {loadingEmail && <Skeleton/>}
          {errorEmail && <Message variant='danger'>{errorEmail}</Message>}
          {email && email.message && <Message variant='success'>{email.message}</Message>}
          

          <Box className="people-control-strip practitioner-control-strip" sx={{ 
            mb: 5, 
            display: 'flex', 
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: 2, 
            alignItems: 'center',
            position: 'relative',
            zIndex: 1000,
            overflowX: 'auto',
            overflowY: 'visible',
            pb: 0.5
          }}>
            {/* Search Input */}
            <TextField
              placeholder="Search practitioners..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              sx={{
                flex: '0 1 360px',
                minWidth: '220px',
                maxWidth: '360px',
                '& .MuiOutlinedInput-root': {
                  background: isDarkMode 
                    ? (searchFocused ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)')
                    : (searchFocused ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)'),
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    borderColor: isDarkMode 
                      ? (searchFocused ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)')
                      : (searchFocused ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'),
                    borderWidth: '1px'
                  },
                  '&:hover fieldset': {
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px'
                  }
                },
                '& .MuiInputBase-input': {
                  color: isDarkMode ? '#fff' : '#000',
                  '&::placeholder': {
                    color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                    opacity: 1
                  }
                }
              }}
            />

            {/* Filter and Actions Container */}
            <Box sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 1, 
              marginLeft: 'auto',
              flexShrink: 0, 
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'flex-end',
              whiteSpace: 'nowrap'
            }}>
              {/* Action Buttons */}
              {practEmail && practEmail.length > 0 && (
                <DropdownButton
                  id="practitioner-actions-menu"
                  className="practitioner-actions-dropdown"
                  title={`Actions (${practEmail.length})`}
                  variant={isDarkMode ? 'outline-light' : 'outline-dark'}
                  size="sm"
                  show={showActionsMenu}
                  onToggle={(nextShow) => {
                    setShowActionsMenu(nextShow)
                    if (!nextShow) {
                      setShowSendEmailSubmenu(false)
                    }
                  }}
                  autoClose="outside"
                >
                  <div
                    className="practitioner-submenu-wrap"
                    onMouseEnter={() => setShowSendEmailSubmenu(true)}
                    onMouseLeave={() => setShowSendEmailSubmenu(false)}
                  >
                    <button
                      type="button"
                      className="dropdown-item practitioner-submenu-trigger"
                      onClick={() => setShowSendEmailSubmenu((prev) => !prev)}
                    >
                      Send Email
                      <span className="practitioner-submenu-arrow">▸</span>
                    </button>
                    <div className={`practitioner-submenu-panel ${showSendEmailSubmenu ? 'show' : ''}`}>
                      <button type="button" className="dropdown-item" onClick={handleOpenComposeEmail}>
                        Compose Email
                      </button>
                      <button type="button" className="dropdown-item" onClick={handleOpenTemplateSelector}>
                        Select Template
                      </button>
                    </div>
                  </div>

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={handleExportSelected}>
                    Export to Excel
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      setPractEmail([])
                      setShowActionsMenu(false)
                      setShowSendEmailSubmenu(false)
                    }}
                  >
                    Clear Selection
                  </Dropdown.Item>
                </DropdownButton>
              )}

              {/* Filter Dropdown */}
              <Form.Control 
                as="select"
                value={filter || "All"}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  width: '180px',
                  background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  color: isDarkMode ? '#fff' : '#000',
                  padding: '8px 12px'
                }}
              >
                <option value="All">No Filter</option>
                <option value="New">New</option>
                <option value="Complete">Complete Document</option>
                <option value="Review">Review</option>
                <option value="Invited">Invited</option>
                <option value="Rejected">Rejected</option>
                <option value="Verified">Verified</option>
                <option value="Deactivated">Deactivated</option>
                <option value="Expired">Expired</option>
              </Form.Control>
            </Box>
          </Box>
            
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          
          <Box sx={{ mt: 10, pt: 5 }}>
            {loading ? (
              <Skeleton width={'100%'} height={800}/>
            ) : (
              <>
                <TableContainer 
                component={Paper}
                className="people-table-shell"
                sx={{
                  background: isDarkMode 
                    ? 'rgba(255,255,255,0.05)' 
                    : 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '0',
                  border: isDarkMode 
                    ? '1px solid rgba(255,255,255,0.1)' 
                    : '1px solid rgba(255,255,255,0.2)',
                  boxShadow: isDarkMode
                    ? '0 4px 20px rgba(0,0,0,0.3)'
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  mb: 3,
                  overflow: 'hidden'
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        color: isDarkMode ? '#fff' : '#333', 
                        fontWeight: 'bold',
                        background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                      }}>
                        <Form.Check 
                          type="checkbox" 
                          checked={practEmail.length > 0 && practEmail.length === filteredPractitioners.length} 
                          onChange={handleSetAllEmails}
                        />
                      </TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold', minWidth: 180 }}>Specialization</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Online</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Engaged</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Active</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Jobs</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Rating</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Membership</TableCell>
                      <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedPractitioners.map((pract, index) => {
                      const isItemSelected = isSelected(pract?.email);
                      
                      return (
                        <TableRow 
                          key={pract._id}
                          sx={{
                            '&:hover': {
                              background: isDarkMode 
                                ? 'rgba(255,255,255,0.08)' 
                                : 'rgba(0,0,0,0.04)',
                              transform: 'translateY(-1px)',
                              boxShadow: isDarkMode
                                ? '0 2px 10px rgba(255,255,255,0.1)'
                                : '0 2px 10px rgba(0,0,0,0.1)'
                            },
                            transition: 'all 0.2s ease',
                            borderBottom: isDarkMode 
                              ? '1px solid rgba(255,255,255,0.1)' 
                              : '1px solid rgba(0,0,0,0.05)'
                          }}
                        >
                          <TableCell>
                            <Form.Check 
                              type="checkbox" 
                              checked={isItemSelected} 
                              onChange={(e) => handleSetEmail(e, pract.email)}
                            />
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            {pract.firstname} {pract.lastname}
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', maxWidth: 220 }}>
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-block',
                                maxWidth: 210,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                verticalAlign: 'bottom'
                              }}
                              title={pract.field || '--'}
                            >
                              {pract.field || '--'}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={pract.status}
                              size="small"
                              className="people-chip"
                              sx={{
                                backgroundColor: getStatusColor(pract.status),
                                color: '#fff',
                                fontWeight: 'bold'
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            <Chip 
                              label={pract.online ? "Yes" : "No"}
                              size="small"
                              color={pract.online ? "success" : "default"}
                            />
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            <Chip 
                              label={pract.engaged ? "Yes" : "No"}
                              size="small"
                              color={pract.engaged ? "success" : "default"}
                            />
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            <Chip 
                              label={pract.active ? "Yes" : "No"}
                              size="small"
                              color={pract.active ? "success" : "default"}
                            />
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            {pract.totalJobs || 0}
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            {pract.averageRating || '--•--'}
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                            {pract.membershipClass || '--•--'}
                          </TableCell>
                          <TableCell>
                            <Box className="people-actions">
                              <LinkContainer to={`/practitioner/${pract._id}/view`}>
                                <IconButton
                                  size="small"
                                  sx={{
                                    background: isDarkMode 
                                      ? 'rgba(255, 255, 255, 0.08)' 
                                      : 'rgba(0, 0, 0, 0.08)',
                                    color: isDarkMode ? '#d4d4d4' : '#1f2937',
                                    '&:hover': {
                                      background: isDarkMode 
                                        ? 'rgba(255, 255, 255, 0.14)' 
                                        : 'rgba(0, 0, 0, 0.14)',
                                      transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              </LinkContainer>
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(pract._id)}
                                sx={{
                                  background: isDarkMode 
                                    ? 'rgba(244, 67, 54, 0.1)' 
                                    : 'rgba(244, 67, 54, 0.1)',
                                  color: '#f44336',
                                  '&:hover': {
                                    background: isDarkMode 
                                      ? 'rgba(244, 67, 54, 0.2)' 
                                      : 'rgba(244, 67, 54, 0.2)',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    mt: 2
                  }}
                >
                  <Paper
                    sx={{
                      background: isDarkMode 
                        ? 'rgba(255,255,255,0.05)' 
                        : 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '0',
                      border: isDarkMode 
                        ? '1px solid rgba(255,255,255,0.1)' 
                        : '1px solid rgba(255,255,255,0.2)',
                      padding: '8px 16px'
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: isDarkMode ? '#fff' : '#333'
                        }
                      }}
                    />
                  </Paper>
                </Box>
              )}
              </>
            )}
          </Box>
        </Box>

        {/* Modals */}
            <Modal show={showEmail} onHide={handleCloseEmail} size="lg" centered className={`people-modal ${isDarkMode ? 'people-modal--dark' : ''}`} backdropClassName="people-modal-backdrop" scrollable>
                <Modal.Header closeButton>
                <Modal.Title>Compose Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                <Modal.Footer>
                    <Button 
                      variant={isDarkMode ? "outline-success" : "primary"} 
                      onClick={handleSendEmail}
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(40, 167, 69, 0.1)' : '#007bff',
                        borderColor: isDarkMode ? '#28a745' : '#007bff',
                        color: isDarkMode ? '#28a745' : '#fff'
                      }}
                    >
                        Send 
                        <i className='fas fa-paper-plane'></i>
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSelect} onHide={handleCloseSelect} size="lg" centered className={`people-modal ${isDarkMode ? 'people-modal--dark' : ''} ${showSend ? 'people-modal--background-blur' : ''}`} backdropClassName="people-modal-backdrop" scrollable>
                <Modal.Header closeButton>
                <Modal.Title>
                  Select Email Template
                  {detailLoading && <Skeleton/>}
                  {detailError && <Message variant='danger'>{detailError}</Message>}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {loading ? (
                  <Skeleton width={'100%'} height={500}/>
                ) : (
                  <TableContainer 
                    component={Paper}
                    sx={{
                      background: isDarkMode 
                        ? 'rgba(255,255,255,0.05)' 
                        : 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(15px)',
                      borderRadius: '12px',
                      maxHeight: '400px'
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>
                            Subject
                          </TableCell>
                          <TableCell sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' }}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {emailTemplates.map((email) => (
                          <TableRow 
                            key={email._id}
                            sx={{
                              '&:hover': {
                                background: isDarkMode 
                                  ? 'rgba(255,255,255,0.08)' 
                                  : 'rgba(0,0,0,0.04)'
                              }
                            }}
                          >
                            <TableCell sx={{ color: isDarkMode ? '#fff' : '#333' }}>
                              {email.subject}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                size="small"
                                onClick={() => handleShowSend(email._id)}
                                sx={{
                                  background: isDarkMode 
                                    ? 'rgba(255, 255, 255, 0.08)' 
                                    : 'rgba(0, 0, 0, 0.08)',
                                  color: isDarkMode ? '#d4d4d4' : '#1f2937',
                                  '&:hover': {
                                    background: isDarkMode 
                                      ? 'rgba(255, 255, 255, 0.14)' 
                                      : 'rgba(0, 0, 0, 0.14)'
                                  }
                                }}
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                </Modal.Body>
            </Modal>

            {detailEmail && detailEmail.subject && <Modal show={showSend} onHide={handleCloseSend} size="lg" centered className={`people-modal ${isDarkMode ? 'people-modal--dark' : ''}`} backdropClassName="people-modal-backdrop" scrollable>
                <Modal.Header closeButton>
                  <Modal.Title>Send Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                <Modal.Footer>
                    <Button 
                      variant={isDarkMode ? "outline-success" : "primary"}
                      onClick={() => {handleSendOldEmail(detailEmail._id)}}
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(40, 167, 69, 0.1)' : '#007bff',
                        borderColor: isDarkMode ? '#28a745' : '#007bff',
                        color: isDarkMode ? '#28a745' : '#fff'
                      }}
                    >
                        Send
                        <i className='fas fa-paper-plane'></i>
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}

export default PractitionerList