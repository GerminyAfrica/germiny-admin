import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import Message from './Message'
import Skeleton from 'react-loading-skeleton';
import './peoplePages.css'
import { 
  Typography, 
  Paper, 
  TableContainer, 
  Table as MuiTable, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  Box,
  Chip,
  Checkbox,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Delete as DeleteIcon, Visibility as ViewIcon } from "@material-ui/icons";
import {listPatients, deletePatient} from '../actions/patientActions'
import { useTheme as useCustomTheme } from '../theme/ThemeProvider';
import { useTheme } from '@material-ui/core/styles';
import * as XLSX from 'xlsx'


const PatientList = () => {
        const dispatch= useDispatch()
        const { isDarkMode } = useCustomTheme()
        const theme = useTheme()

        const patientList = useSelector(state => state.patientList)
        const {loading, error, patients} = patientList

        const patientDelete = useSelector(state => state.patientDelete)
        const {success, error:err} = patientDelete

        const [search, setSearch] = useState("");
        const [page, setPage] = useState(1);
        const [selectedPatientIds, setSelectedPatientIds] = useState([]);
        const [showActionsMenu, setShowActionsMenu] = useState(false);
        const rowsPerPage = 10;

        useEffect(() => {
            dispatch(listPatients())
     }, [dispatch, success])

        // Filter patients by search
        const filteredPatients = patients ? patients.filter(
            p =>
                p.firstname?.toLowerCase().includes(search.toLowerCase()) ||
                p.lastname?.toLowerCase().includes(search.toLowerCase()) ||
                p.email?.toLowerCase().includes(search.toLowerCase()) ||
                p.phone?.toLowerCase().includes(search.toLowerCase())
        ) : [];

        // Pagination logic
        const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
        const paginatedPatients = filteredPatients.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
        );

        const handlePageChange = (event, newPage) => {
            setPage(newPage);
        };

    const handleSetSelectedPatient = (id) => {
      setSelectedPatientIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    }

    const handleSetAllSelectedPatients = () => {
      const filteredIds = filteredPatients.map((item) => item._id)
      const allSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedPatientIds.includes(id))

      if (allSelected) {
        setSelectedPatientIds((prev) => prev.filter((id) => !filteredIds.includes(id)))
      } else {
        setSelectedPatientIds((prev) => [...new Set([...prev, ...filteredIds])])
      }
    }

    const handleExportSelectedUsers = () => {
      const selectedPatients = (patients || []).filter((item) => selectedPatientIds.includes(item._id))
      if (selectedPatients.length === 0) {
        return
      }

      const rows = selectedPatients.map((item, index) => ({
        SN: index + 1,
        Name: `${item.firstname || ''} ${item.lastname || ''}`.trim(),
        Email: item.email || '',
        Phone: item.phone || '',
        Gender: item.gender || '',
        AverageRating: item.averageRating || '',
        LastActive: item.lastActive || '',
        Active: item.active ? 'Yes' : 'No'
      }))

      const worksheet = XLSX.utils.json_to_sheet(rows)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')

      const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-')
      XLSX.writeFile(workbook, `users-selected-${stamp}.xlsx`)

      setShowActionsMenu(false)
    }

    const isSelected = (id) => selectedPatientIds.includes(id)

    const filteredIds = filteredPatients.map((item) => item._id)
    const selectedInFilteredCount = filteredIds.filter((id) => selectedPatientIds.includes(id)).length
    const allFilteredSelected = filteredIds.length > 0 && selectedInFilteredCount === filteredIds.length

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deletePatient(id))
        }
    }

    return (
        <Box className={`people-page-shell users-page-shell ${isDarkMode ? 'people-page-shell--dark' : 'people-page-shell--light'}`} sx={{ 
            padding: { xs: 2, sm: 3 }, 
            paddingTop: { xs: 4, sm: 5 }, // Add more top padding for spacing from banner
            marginTop: { xs: 3, sm: 4 }, // Add top margin for additional separation
            marginLeft: { xs: 0, sm: '32px' }, // Explicit margin from sidebar
            paddingLeft: { xs: 3, sm: '24px' }, // Additional padding for content
            paddingRight: { xs: 2, sm: 3 },
            width: { xs: '100%', sm: 'calc(100% - 56px)' }, // Adjust width to account for margins
            boxSizing: 'border-box'
        }}>

           <Box className="people-page-hero">
             <Box>
               <Typography variant="overline" className="people-page-hero__eyebrow">
                 Users
               </Typography>
               <Typography variant="h4" component="h1" className="people-page-hero__title">
                 User directory
               </Typography>
               <Typography variant="body2" className="people-page-hero__subtitle">
                 Search, review, and manage user records with cleaner spacing and faster scanning.
               </Typography>
             </Box>
             <Box className="people-page-hero__meta">
               <Box className="people-page-hero__pill">Total <strong>{patients?.length || 0}</strong></Box>
               <Box className="people-page-hero__pill">Visible <strong>{filteredPatients.length}</strong></Box>
               <Box className="people-page-hero__pill">Selected <strong>{selectedPatientIds.length}</strong></Box>
               <Box className="people-page-hero__pill">Page <strong>{page}</strong></Box>
             </Box>
           </Box>

           {/* Search Input */}
           <Box className="people-control-strip" sx={{ marginTop: 2, marginBottom: 4 }}>
             <input
               type="text"
               placeholder="Search by name, email, or phone..."
               value={search}
               onChange={e => { setSearch(e.target.value); setPage(1); }}
               style={{
                 padding: '12px 16px',
                 borderRadius: '12px',
                 border: isDarkMode 
                   ? '1px solid rgba(255, 255, 255, 0.2)' 
                   : '1px solid rgba(0, 0, 0, 0.1)',
                 width: '100%',
                 maxWidth: 400,
                 fontSize: '1rem',
                 background: isDarkMode 
                   ? 'rgba(255, 255, 255, 0.08)' 
                   : 'rgba(255, 255, 255, 0.9)',
                 color: isDarkMode ? '#ffffff' : '#2d3748',
                 backdropFilter: 'blur(10px)',
                 boxShadow: isDarkMode 
                   ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                   : '0 4px 20px rgba(0, 0, 0, 0.05)',
                 transition: 'all 0.2s ease',
                 outline: 'none'
               }}
               onFocus={(e) => {
                 e.target.style.borderColor = '#111111';
                 e.target.style.boxShadow = isDarkMode 
                   ? '0 0 0 2px rgba(0, 0, 0, 0.3)'
                   : '0 0 0 2px rgba(0, 0, 0, 0.2)';
               }}
               onBlur={(e) => {
                 e.target.style.borderColor = isDarkMode 
                   ? 'rgba(255, 255, 255, 0.2)' 
                   : 'rgba(0, 0, 0, 0.1)';
                 e.target.style.boxShadow = isDarkMode 
                   ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                   : '0 4px 20px rgba(0, 0, 0, 0.05)';
               }}
             />

             {selectedPatientIds.length > 0 && (
               <DropdownButton
                 id="users-actions-menu"
                 className="practitioner-actions-dropdown"
                 title={`Actions (${selectedPatientIds.length})`}
                 variant={isDarkMode ? 'outline-light' : 'outline-dark'}
                 size="sm"
                 show={showActionsMenu}
                 onToggle={(nextShow) => setShowActionsMenu(nextShow)}
                 autoClose="outside"
               >
                 <Dropdown.Item onClick={handleExportSelectedUsers}>
                   Export to Excel
                 </Dropdown.Item>
                 <Dropdown.Item
                   onClick={() => {
                     setSelectedPatientIds([])
                     setShowActionsMenu(false)
                   }}
                 >
                   Clear Selection
                 </Dropdown.Item>
               </DropdownButton>
             )}
           </Box>

            {err && <Message variant='danger'>{err}</Message>}
            {error && <Message variant='danger'>{error}</Message>}

            {loading ? (
                <Box sx={{ padding: 3 }}>
                    <Skeleton width={'100%'} height={800}/>
                </Box>
            ) : (
                <>
                <TableContainer 
                    component={Paper} 
                  className="people-table-shell"
                    sx={{ 
                        borderRadius: '0',
                        overflow: 'hidden',
                        width: '100%',
                        boxShadow: theme.palette.type === 'dark' 
                            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                            : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backgroundColor: isDarkMode 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: isDarkMode 
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <MuiTable>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    indeterminate={selectedInFilteredCount > 0 && !allFilteredSelected}
                                    checked={allFilteredSelected}
                                    onChange={handleSetAllSelectedPatients}
                                  />
                                </TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Last Active</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedPatients.map((patient) => (
                                <TableRow 
                                    key={patient._id}
                                    sx={{ 
                                        '&:hover': { 
                                            backgroundColor: theme.palette.action.hover,
                                            transform: 'translateY(-1px)',
                                            transition: 'all 0.2s ease'
                                        } 
                                    }}
                                >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        color="primary"
                                        checked={isSelected(patient._id)}
                                        onChange={() => handleSetSelectedPatient(patient._id)}
                                      />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>
                                        {patient.firstname}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>
                                        {patient.lastname}
                                    </TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={patient.gender}
                                            size="small"
                                            color={patient.gender === 'Male' ? 'primary' : 'secondary'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            ⭐ {patient.averageRating || '--•--'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={patient.lastActive || 'Never'}
                                            size="small"
                                            variant="outlined"
                                            color={patient.lastActive ? 'success' : 'default'}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box className="people-actions">
                                            <Tooltip title="View Details">
                                                <IconButton 
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => window.location.href = `/user/${patient._id}/view`}
                                                    sx={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                            transform: 'scale(1.1)'
                                                        }
                                                    }}
                                                >
                                                    <ViewIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete User">
                                                <IconButton 
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDelete(patient._id)}
                                                    sx={{
                                                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(244, 67, 54, 0.2)',
                                                            transform: 'scale(1.1)'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </MuiTable>
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
    )
}
 export default PatientList