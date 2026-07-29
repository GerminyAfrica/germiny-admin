import React, { useEffect, useState, useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux'
import ChartistGraph from "react-chartist";
import { Container, Row, Col } from "react-bootstrap";
import { 
  Typography, 
  Paper, 
  Box, 
  IconButton, 
  Tooltip, 
  Fade, 
  Zoom,
  LinearProgress,
  Chip
} from "@material-ui/core";
import { 
  Refresh as RefreshIcon, 
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  LocalHospital as HospitalIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon
} from "@material-ui/icons";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
} from "../variables/Variables.jsx";
import { getActiveUsers, getOnlinePractitioners, getTotalRequests, getCompletedJobs } from "../actions/dashboardActions.js";
import { useTheme as useCustomTheme } from '../theme/ThemeProvider';
import { useTheme } from '@material-ui/core/styles';
import './Dashboard.css';

const Dashboard = () =>  {

  const userLogin = useSelector((state) => state.userLogin)
  const activeUsers = useSelector((state) => state.activeUsers)
  const onlinePractitioners = useSelector((state) => state.onlinePractitioners)
  const totalRequests = useSelector((state) => state.totalRequests)
  const completedJobs = useSelector((state) => state.completedJobs)
  const dispatch = useDispatch()
  const { userInfo } = userLogin
  const { isDarkMode } = useCustomTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const refreshDashboard = useCallback(async () => {
    setIsLoading(true)
    try {
      await Promise.all([
        dispatch(getActiveUsers()),
        dispatch(getOnlinePractitioners()),
        dispatch(getTotalRequests()),
        dispatch(getCompletedJobs())
      ])
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to refresh dashboard:', error)
      // You could add a toast notification here
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    refreshDashboard()
  }, [dispatch, refreshDashboard])

  const createLegend = (json) => {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fas fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    return 'Evening'
  }

  const formatLastUpdated = (date) => {
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    return date.toLocaleTimeString()
  }

  const statsData = [
    {
      title: 'Active Users',
      value: activeUsers.activeUsers?.length || 0,
      icon: <PeopleIcon style={{ fontSize: 32 }} />,
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.1)',
      trend: '+12%'
    },
    {
      title: 'Total Requests',
      value: totalRequests.totalRequests?.length || 0,
      icon: <AssignmentIcon style={{ fontSize: 32 }} />,
      color: '#2f2f2f',
      bgColor: 'rgba(0, 0, 0, 0.1)',
      trend: '+8%'
    },
    {
      title: 'Online Practitioners',
      value: onlinePractitioners.onlinePracts?.length || 0,
      icon: <HospitalIcon style={{ fontSize: 32 }} />,
      color: '#5f5f5f',
      bgColor: 'rgba(0, 0, 0, 0.08)',
      trend: '+5%'
    },
    {
      title: 'Completed Jobs',
      value: completedJobs.completedJobs?.length || 0,
      icon: <CheckCircleIcon style={{ fontSize: 32 }} />,
      color: '#3a3a3a',
      bgColor: 'rgba(0, 0, 0, 0.1)',
      trend: '+15%'
    }
  ]
  
    return (
      <div className={`modern-dashboard ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <style jsx>{`
          .modern-dashboard {
            background: ${isDarkMode 
              ? 'linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #1f1f1f 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            };
            min-height: 100vh;
            padding: 20px;
            position: relative;
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'};
          }
          
          .dashboard-header {
            background: ${isDarkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.95)'
            };
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: ${isDarkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)'
            };
            border: 1px solid ${isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'
            };
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'};
          }
          
          .dashboard-header * {
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'} !important;
          }
          
          .stats-card {
            background: ${isDarkMode 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(255, 255, 255, 0.95)'
            };
            backdrop-filter: blur(20px);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: ${isDarkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)'
            };
            border: 1px solid ${isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.08)'
            };
            transition: all 0.3s ease;
            cursor: pointer;
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'};
          }
          
          .stats-card * {
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'} !important;
          }
          
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: ${isDarkMode 
              ? '0 12px 40px rgba(0, 0, 0, 0.4)'
              : '0 12px 40px rgba(0, 0, 0, 0.15)'
            };
            background: ${isDarkMode 
              ? 'rgba(255, 255, 255, 0.12)' 
              : 'rgba(255, 255, 255, 1)'
            };
          }
          
          .chart-card {
            background: ${isDarkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.95)'
            };
            backdrop-filter: blur(20px);
            border-radius: 16px;
            padding: 20px;
            box-shadow: ${isDarkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)'
            };
            border: 1px solid ${isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.08)'
            };
            height: 100%;
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'};
          }
          
          .chart-card * {
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'} !important;
          }
          
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${isDarkMode 
              ? 'rgba(0, 0, 0, 0.7)' 
              : 'rgba(255, 255, 255, 0.7)'
            };
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          
          .pulse {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .fade-in {
            animation: fadeIn 0.8s ease-in;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Chart text visibility */
          .ct-chart .ct-label {
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'} !important;
            fill: ${isDarkMode ? '#f7fafc' : '#2d3748'} !important;
          }
          
          .ct-chart .ct-grid {
            stroke: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} !important;
          }
          
          .legend {
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'} !important;
          }
          
          .legend * {
            color: ${isDarkMode ? '#f7fafc' : '#2d3748'} !important;
          }
        `}</style>
        
        {isLoading && (
          <div className="loading-overlay">
            <Paper elevation={3} style={{ 
              padding: '20px', 
              borderRadius: '15px',
              background: isDarkMode ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              color: isDarkMode ? '#f7fafc' : '#2d3748'
            }}>
              <Typography variant="subtitle1" style={{ 
                marginBottom: '15px',
                fontSize: '1rem',
                color: isDarkMode ? '#f7fafc' : '#2d3748'
              }}>
                Refreshing Dashboard...
              </Typography>
              <LinearProgress />
            </Paper>
          </div>
        )}
        
        <Container fluid>
          <Fade in={true} timeout={1000}>
            <Paper className="dashboard-header" elevation={0}>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Box>
                  <Typography variant="h4" style={{ 
                    fontWeight: 'bold', 
                    color: isDarkMode ? '#f7fafc' : '#2d3748',
                    marginBottom: '8px',
                    fontSize: '1.8rem'
                  }}>
                    Good {getTimeOfDay()}, {userInfo?.firstname || 'Admin'}! 🌟
                  </Typography>
                  <Typography variant="body1" style={{ 
                    color: isDarkMode ? '#e2e8f0' : '#4a5568',
                    fontSize: '0.95rem'
                  }}>
                    Welcome to your Germiny Admin Dashboard
                  </Typography>
                  <Chip 
                    label={`Last updated: ${formatLastUpdated(lastUpdated)}`}
                    variant="outlined"
                    size="small"
                    style={{ 
                      marginTop: '8px',
                      fontSize: '0.7rem',
                      height: '24px',
                      color: isDarkMode ? '#a0aec0' : '#718096',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                    }}
                  />
                </Box>
                <Box>
                  <Tooltip title="Refresh Dashboard">
                    <IconButton 
                      onClick={refreshDashboard}
                      disabled={isLoading}
                      style={{ 
                        background: 'linear-gradient(45deg, #111111, #2f2f2f)',
                        color: 'white',
                        marginLeft: '10px'
                      }}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          </Fade>
          
          <Row>
            {statsData.map((stat, index) => (
              <Col lg={3} md={6} sm={12} key={index}>
                <Zoom in={true} timeout={500 + index * 200}>
                  <Paper className="stats-card fade-in" elevation={0}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle2" style={{ 
                          fontWeight: 500,
                          color: isDarkMode ? '#cbd5e0' : '#4a5568',
                          fontSize: '0.8rem'
                        }}>
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" style={{ 
                          fontWeight: 'bold', 
                          color: stat.color,
                          margin: '8px 0',
                          fontSize: '1.6rem'
                        }}>
                          {stat.value.toLocaleString()}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <TrendingUpIcon style={{ color: '#4CAF50', fontSize: 14, marginRight: '4px' }} />
                          <Typography variant="caption" style={{ 
                            color: '#4CAF50', 
                            fontWeight: 'bold',
                            fontSize: '0.7rem'
                          }}>
                            {stat.trend}
                          </Typography>
                          <Typography variant="caption" style={{ 
                            marginLeft: '4px',
                            color: isDarkMode ? '#cbd5e0' : '#4a5568',
                            fontSize: '0.7rem'
                          }}>
                            from last month
                          </Typography>
                        </Box>
                      </Box>
                      <Box 
                        style={{ 
                          backgroundColor: stat.bgColor,
                          borderRadius: '12px',
                          padding: '12px',
                          color: stat.color
                        }}
                        className="pulse"
                      >
                        {stat.icon}
                      </Box>
                    </Box>
                  </Paper>
                </Zoom>
              </Col>
            ))}
          </Row>
          <Row style={{ marginTop: '24px' }}>
            <Col md={8}>
              <Fade in={true} timeout={1500}>
                <Paper className="chart-card" elevation={0}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={1.5}>
                    <Box>
                      <Typography variant="h6" style={{ 
                        fontWeight: 'bold', 
                        color: isDarkMode ? '#f7fafc' : '#2d3748',
                        fontSize: '1.1rem'
                      }}>
                        User Activity Analytics
                      </Typography>
                      <Typography variant="body2" style={{ 
                        color: isDarkMode ? '#cbd5e0' : '#4a5568',
                        fontSize: '0.8rem'
                      }}>
                        24 Hours performance tracking
                      </Typography>
                    </Box>
                    <Chip 
                      icon={<TrendingUpIcon style={{ fontSize: 16 }} />}
                      label="Live Data"
                      color="primary"
                      variant="outlined"
                      size="small"
                      style={{ 
                        fontSize: '0.75rem',
                        height: '28px'
                      }}
                    />
                  </Box>
                  <div className="ct-chart" style={{ height: '280px' }}>
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={{
                        ...optionsSales,
                        plugins: [
                          // Add smooth line plugin if available
                        ]
                      }}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                  <Box marginTop={1.5}>
                    <div className="legend" style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      flexWrap: 'wrap',
                      fontSize: '0.8rem'
                    }}>
                      {createLegend(legendSales)}
                    </div>
                  </Box>
                </Paper>
              </Fade>
            </Col>
            <Col md={4}>
              <Fade in={true} timeout={2000}>
                <Paper className="chart-card" elevation={0}>
                  <Box display="flex" alignItems="center" justifyContent="between" marginBottom={1.5}>
                    <Box>
                      <Typography variant="h6" style={{ 
                        fontWeight: 'bold', 
                        color: isDarkMode ? '#f7fafc' : '#2d3748',
                        fontSize: '1.1rem'
                      }}>
                        Service Distribution
                      </Typography>
                      <Typography variant="body2" style={{ 
                        color: isDarkMode ? '#cbd5e0' : '#4a5568',
                        fontSize: '0.8rem'
                      }}>
                        Campaign performance overview
                      </Typography>
                    </Box>
                  </Box>
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                    style={{ height: '220px' }}
                  >
                    <ChartistGraph 
                      data={dataPie} 
                      type="Pie"
                      options={{
                        donut: true,
                        donutWidth: 50,
                        startAngle: 270,
                        showLabel: true
                      }}
                    />
                  </div>
                  <Box marginTop={1.5}>
                    <div className="legend" style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      flexWrap: 'wrap',
                      fontSize: '0.8rem'
                    }}>
                      {createLegend(legendPie)}
                    </div>
                  </Box>
                  <Box marginTop={1.5} padding={1.5} style={{ 
                    background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8f9fa', 
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : 'none'
                  }}>
                    <Typography variant="caption" style={{ 
                      color: isDarkMode ? '#cbd5e0' : '#4a5568',
                      fontSize: '0.75rem'
                    }}>
                      📊 Campaign sent 2 days ago
                    </Typography>
                    <Typography variant="body2" style={{ 
                      fontWeight: 'bold',
                      color: '#111111',
                      fontSize: '0.85rem'
                    }}>
                      85% engagement rate
                    </Typography>
                  </Box>
                </Paper>
              </Fade>
            </Col>
          </Row>
          
          {/* Additional Insights Section */}
          <Row style={{ marginTop: '24px' }}>
            <Col md={12}>
              <Fade in={true} timeout={2500}>
                <Paper className="chart-card" elevation={0}>
                  <Typography variant="h6" style={{ 
                    fontWeight: 'bold', 
                    color: isDarkMode ? '#f7fafc' : '#2d3748', 
                    marginBottom: '16px',
                    fontSize: '1.1rem'
                  }}>
                    📈 Quick Insights
                  </Typography>
                  <Row>
                    <Col md={3}>
                      <Box textAlign="center" padding={1.5}>
                        <Typography variant="h5" style={{ 
                          color: '#4CAF50', 
                          fontWeight: 'bold',
                          fontSize: '1.4rem'
                        }}>
                          98.5%
                        </Typography>
                        <Typography variant="body2" style={{ 
                          color: isDarkMode ? '#cbd5e0' : '#4a5568',
                          fontSize: '0.8rem'
                        }}>
                          System Uptime
                        </Typography>
                      </Box>
                    </Col>
                    <Col md={3}>
                      <Box textAlign="center" padding={1.5}>
                        <Typography variant="h5" style={{ 
                          color: '#2f2f2f', 
                          fontWeight: 'bold',
                          fontSize: '1.4rem'
                        }}>
                          2.3s
                        </Typography>
                        <Typography variant="body2" style={{ 
                          color: isDarkMode ? '#cbd5e0' : '#4a5568',
                          fontSize: '0.8rem'
                        }}>
                          Avg Response Time
                        </Typography>
                      </Box>
                    </Col>
                    <Col md={3}>
                      <Box textAlign="center" padding={1.5}>
                        <Typography variant="h5" style={{ 
                          color: '#5f5f5f', 
                          fontWeight: 'bold',
                          fontSize: '1.4rem'
                        }}>
                          156
                        </Typography>
                        <Typography variant="body2" style={{ 
                          color: isDarkMode ? '#cbd5e0' : '#4a5568',
                          fontSize: '0.8rem'
                        }}>
                          Active Sessions
                        </Typography>
                      </Box>
                    </Col>
                    <Col md={3}>
                      <Box textAlign="center" padding={1.5}>
                        <Typography variant="h5" style={{ 
                          color: '#3a3a3a',
                          fontWeight: 'bold',
                          fontSize: '1.4rem'
                        }}>
                          99.2%
                        </Typography>
                        <Typography variant="body2" style={{ 
                          color: isDarkMode ? '#cbd5e0' : '#4a5568',
                          fontSize: '0.8rem'
                        }}>
                          Success Rate
                        </Typography>
                      </Box>
                    </Col>
                  </Row>
                </Paper>
              </Fade>
            </Col>
          </Row>

        </Container>
      </div>
    );
}

export default Dashboard;
