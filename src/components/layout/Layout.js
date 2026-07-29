import React, {useEffect} from "react";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
  Badge,
  Avatar,
  withStyles,
  Tooltip,
  Grid,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from '@material-ui/icons/Person';
import LocalHospital from '@material-ui/icons/LocalHospital';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {logout, getUserDetails} from '../../actions/userActions'
import { useTheme as useCustomTheme } from '../../theme/ThemeProvider'
import './Layout.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.type === 'dark' 
      ? "linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #1f1f1f 100%)"
      : "linear-gradient(135deg, #fafafa 0%, #e5e7eb 100%)",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: theme.palette.type === 'dark' 
      ? "rgba(255, 255, 255, 0.1) !important"
      : "rgba(255, 255, 255, 0.9) !important",
    backdropFilter: "blur(20px)",
    borderBottom: theme.palette.type === 'dark' 
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: theme.palette.type === 'dark' 
      ? "0 8px 32px rgba(0, 0, 0, 0.3)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    minHeight: 64,
    background: "linear-gradient(135deg, #111111 0%, #2f2f2f 100%)",
    borderRadius: "0 0 20px 20px",
    marginBottom: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },

  menuHeader: {
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    borderBottom: `1px solid ${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.palette.type === 'dark' ? "#ffffff" : "#1f2937",
    letterSpacing: "1px",
    textShadow: theme.palette.type === 'dark' ? "0 2px 10px rgba(0, 0, 0, 0.25)" : "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.palette.type === 'dark' ? "#ffffff" : "#1f2937",
    letterSpacing: "1px",
    textShadow: theme.palette.type === 'dark' ? "0 2px 10px rgba(0, 0, 0, 0.25)" : "none",
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.type === 'dark' 
      ? "rgba(17, 17, 17, 0.96)" 
      : "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(20px)",
    border: theme.palette.type === 'dark' 
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    color: theme.palette.text.primary,
    fontWeight: 500,
    height: "100%",
    boxShadow: theme.palette.type === 'dark' 
      ? "8px 0 32px rgba(0, 0, 0, 0.3)"
      : "8px 0 32px rgba(0, 0, 0, 0.1)",
    "& svg": {
      fill: theme.palette.text.primary,
    },
    "& .MuiListItem-root": {
      margin: "5px 10px",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      color: theme.palette.type === 'dark' ? "#f8fafc" : "#1f2937",
      "&:hover": {
        background: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
        transform: "translateX(5px)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      },
      "&.active": {
        background: theme.palette.type === 'dark'
          ? "linear-gradient(135deg, #111111 0%, #3b3b3b 100%)"
          : "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)",
        boxShadow: theme.palette.type === 'dark'
          ? "0 4px 15px rgba(0, 0, 0, 0.4)"
          : "0 4px 15px rgba(75, 85, 99, 0.25)",
      }
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.85)" : "#334155",
      minWidth: "45px",
    },
    "& .MuiListItemText-primary": {
      fontWeight: 500,
      fontSize: "14px",
      color: theme.palette.type === 'dark' ? "#f8fafc" : "#1f2937",
    },
    "& .MuiDivider-root": {
      backgroundColor: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
      margin: "10px 0",
    },
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(0, 3, 3),
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 4, 4),
    },
    background: "transparent",
    color: theme.palette.text.primary,
    minHeight: "100vh",
  },
  footer: {
    padding: theme.spacing(2),
    background: theme.palette.type === 'dark' 
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderTop: theme.palette.type === 'dark' 
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    marginTop: "auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
      marginTop: "10%",
    },
  },
  footerText: {
    fontSize: 13,
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
  wrapper: {
    flexGrow: 1,
    // width: "100%",

    // height: "100%",
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // overflow: "hidden",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    // overflow: "hidden",
    // flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  name: {
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  avatarHeader: {
    textAlign: "center",
    display: "grid",
    justifyItems: "center",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    background: theme.palette.type === 'dark' 
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.05)",
    borderRadius: "15px",
    margin: "10px",
    backdropFilter: "blur(10px)",
  },
  small: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: 400,
  },
  name2: {
    color: theme.palette.text.primary,
    fontFamily: "Quicksand",
    fontWeight: 500,
    fontSize: 14,
    marginTop: "8px",
  },
  dropdown: {
    fontFamily: "Quicksand",
    color: theme.palette.text.primary,
    "&:hover": {
      background: theme.palette.action.hover,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const Layout = ({ children, win }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const { isDarkMode, toggleDarkMode } = useCustomTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const route = (path) => {
    history.push(path);
    if (matches) {
      handleDrawerToggle();
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  };

  useEffect(() => {
    dispatch(getUserDetails())
  }, [dispatch])

  const handleProfile = () => {
    history.push('/profile')
  };

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const renderMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          width: 300,
          background: theme.palette.type === 'dark' 
            ? "rgba(0, 0, 0, 0.9)"
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: theme.palette.type === 'dark' 
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          boxShadow: theme.palette.type === 'dark' 
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
          marginTop: "10px",
        },
      }}
    >
      <div className={classes.avatarHeader}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar />
        </StyledBadge>
        {userInfo? (
          <Typography variant="subtitle2" className={classes.name2}>
          {userInfo.displayname}
        </Typography>
        ) : null}
        {userInfo ? (
          <Typography variant="subtitle2" className={classes.small}>{userInfo.role}</Typography>
        ) : null}
        
      </div>
      <Divider />
      <MenuItem onClick={handleProfile} className={classes.dropdown}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Account</Grid>
          <Grid item>
            <AccountCircleIcon style={{ marginTop: 10 }} />
          </Grid>
        </Grid>
      </MenuItem>

      <MenuItem onClick={handleLogout} className={classes.dropdown}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Logout</Grid>
          <Grid item>
            <PowerSettingsNewIcon style={{ marginTop: 10 }} />
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", role: "all" },
    { text: "Users", icon: <PeopleAlt />, path: "/user", role: "admin" },
    { text: "Practitioners", icon: <PersonIcon/>, path: "/practitioner", role: "all" },
    { text: "Specializations", icon: <LocalHospital />, path: "/field", role: "admin" },
    { text: "Email Management", icon: <InboxIcon/>, path: "/email", role: "admin" },
  ];

  const drawer = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className={classes.menuHeader}>
        <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Box style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            background: theme.palette.type === 'dark'
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))"
              : "linear-gradient(135deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.05))",
            border: `1px solid ${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          }}>
            <i className="fas fa-clinic-medical" style={{ color: theme.palette.type === 'dark' ? '#e2e8f0' : '#1e293b', fontSize: 18 }} />
          </Box>
          <Box style={{ minWidth: 0 }}>
            <Typography className={classes.menuTitle2} style={{ display: "block", textAlign: "left" }}>
              GERMINY ADMIN
            </Typography>
            <Typography style={{
              fontSize: 12,
              color: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.68)' : 'rgba(15,23,42,0.7)',
              marginTop: 2,
            }}>
              Manage users and practitioners
            </Typography>
          </Box>
        </Box>
      </div>
      
      <div style={{ flex: 1, padding: "10px 0" }}>
        <List>
          {menuItems.map((item, index) => {
            if (item.role === "admin" && (!userInfo || userInfo.role !== "admin")) {
              return null;
            }
            
            const isActive = history.location.pathname === item.path;
            
            return (
              <ListItem 
                button 
                key={index}
                onClick={() => route(item.path)}
                className={isActive ? "active" : ""}
                style={{
                  margin: "5px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  background: isActive 
                    ? (theme.palette.type === 'dark'
                      ? "linear-gradient(135deg, #111111 0%, #3b3b3b 100%)"
                      : "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)")
                    : "transparent",
                  boxShadow: isActive 
                    ? (theme.palette.type === 'dark'
                      ? "0 4px 15px rgba(0, 0, 0, 0.4)"
                      : "0 4px 15px rgba(75, 85, 99, 0.25)")
                    : "none",
                }}
              >
                <ListItemIcon style={{ 
                  color: isActive
                    ? (theme.palette.type === 'dark' ? "#ffffff" : "#111827")
                    : (theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.85)" : "#334155"),
                  minWidth: "45px" 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  style={{
                    color: isActive
                      ? (theme.palette.type === 'dark' ? "#ffffff" : "#111827")
                      : (theme.palette.type === 'dark' ? "#f8fafc" : "#1f2937"),
                    "& .MuiListItemText-primary": {
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "14px",
                    }
                  }}
                />
                {isActive && (
                  <div style={{
                    width: "4px",
                    height: "20px",
                    background: theme.palette.type === 'dark' ? "#ffffff" : "#4b5563",
                    borderRadius: "2px",
                    marginLeft: "10px",
                  }} />
                )}
              </ListItem>
            );
          })}
        </List>
        
        <Divider style={{
          backgroundColor: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.12)",
          margin: "20px 15px"
        }} />
        
        {/* Quick Stats Section */}
        <div style={{ 
          margin: "15px", 
          padding: "15px", 
          background: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.04)",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
        }}>
          <Typography variant="caption" style={{ 
            color: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.72)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "10px",
            display: "block"
          }}>
            System Status
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: theme.palette.type === 'dark' ? "#ffffff" : "#1f2937" }}>Server</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4CAF50",
                animation: "pulse 2s infinite"
              }} />
              <span style={{ fontSize: "11px", color: "#4CAF50" }}>Online</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Profile Section at Bottom */}
      {userInfo && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleProfile}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleProfile();
            }
          }}
          style={{ 
          margin: "15px", 
          padding: "15px", 
          background: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.04)",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.08)'}`,
          cursor: "pointer",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar style={{ width: 35, height: 35 }}>
                {userInfo.displayname?.charAt(0)}
              </Avatar>
            </StyledBadge>
            <div>
              <Typography variant="body2" style={{ 
                color: theme.palette.type === 'dark' ? "#ffffff" : "#1f2937", 
                fontWeight: 500,
                fontSize: "13px" 
              }}>
                {userInfo.displayname}
              </Typography>
              <Typography variant="caption" style={{ 
                color: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)",
                fontSize: "11px"
              }}>
                {userInfo.role}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // console.log(profile);
  const container = win !== undefined ? () => win().document.body : undefined;

  return (
    <div className={`${classes.root} layout-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <CssBaseline />
      <style jsx global>{`
        body {
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #1f1f1f 100%)'
            : 'linear-gradient(135deg, #fafafa 0%, #e5e7eb 100%)'
          };
          margin: 0;
          padding: 0;
          transition: all 0.3s ease;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode 
            ? 'rgba(0, 0, 0, 0.5) rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.1)'
          };
        }
      `}</style>
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="transparent"
        elevation={0}
      >
        <Toolbar style={{ 
          padding: "0 24px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <div className={classes.grow} />

          <Box className={classes.flex}>
            <Tooltip title="View Messages" arrow>
              <IconButton style={{
                color: "#ffffff",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                margin: "0 5px",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)",
                }
              }}>
                <Badge badgeContent={3} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle Theme" arrow>
              <IconButton 
                onClick={toggleDarkMode}
                style={{
                  color: theme.palette.text.primary,
                  background: theme.palette.type === 'dark' 
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  margin: "0 5px",
                  "&:hover": {
                    background: theme.palette.type === 'dark' 
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.2)",
                  }
                }}
              >
                {isDarkMode ? (
                  <BrightnessHighIcon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>
            
            <Divider 
              orientation="vertical" 
              style={{
                height: "30px",
                background: "rgba(255, 255, 255, 0.2)",
                margin: "0 15px",
              }}
            />
            
            {/* Profile controls were moved into the sidebar footer. */}
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            color="primary"
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={`${classes.content} ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className={classes.toolbar} />
        <div className={`${classes.wrapper} ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
          <div style={{ paddingTop: 8, paddingBottom: 8, width: '100%', minWidth: 0 }}>{children}</div>
          <Box pt={4} className={classes.footer}>
            <Typography
              // variant="body2"
              // color="textSecondary"
              align="center"
              className={classes.footerText}
            >
              Copyright &copy; {new Date().getFullYear()} Germiny
              {"."}
            </Typography>
          </Box>
        </div>
      </main>
      {renderMenu}
    </div>
  );
};

export default Layout;
