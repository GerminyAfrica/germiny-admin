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
  Backdrop,
  useMediaQuery,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

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
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {logout, login} from '../../actions/userActions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  },

  menuHeader: {
    textAlign: "center",
    width: "100%",
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: 900,
    color: "#bdbdbd",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuTitle2: {
    fontSize: 13,
    fontWeight: 900,
    color: "#bdbdbd",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    // background: theme.palette.type === "light" ? "#15264f" : "#212121",
    background:
      theme.palette.type === "light" ? theme.palette.background.paper : "#333",
    // background: "#282c4f",
    color: theme.palette.type === "light" ? "#333" : "#fff",
    fontWeight: 700,
    height: "100%",
    // overflow: "hidden",
    "& svg": {
      fill: theme.palette.type === "light" ? "#333" : "#fff",
    },
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    // minHeight: "100vh",
    width: "100%",
    // overflow: "scroll",
    padding: theme.spacing(3),
    color: "#fff",
  },
  footer: {
    // flexGrow: 1,
    // marginTop: "5%",
    padding: theme.spacing(3, 2),
    // marginTop: "auto",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[200]
    //     : theme.palette.grey[800],
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
      marginTop: "10%",
    },
  },
  footerText: {
    fontSize: 13,
    color:'black',
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
  },
  name: {
    color: "#bdbdbd",
    fontSize: 13,
    fontWeight: 900,
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  avatarHeader: {
    textAlign: "center",
    display: "grid",
    justifyItems: "center",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  small: {
    color: theme.palette.type === "light" ? "#bdbdbd" : "#fff",
    fontSize: 14,
    fontFamily: "Quicksand"
  },
  name2: {
    color: theme.palette.type === "light" ? "#757575" : "#fff",
    fontFamily: "Quicksand",
  },
  dropdown: {
    fontFamily: "Quicksand",
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

const Layout = ({ children, toggleDarkTheme, win }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  };

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
        ) : <h6></h6>}
        {userInfo ? (
          <Typography variant="subtitle2" className={classes.small, "text-uppercase"}>{userInfo.role}</Typography>
        ) : <h6></h6>}
        
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

  const drawer = (
    <div>
      <div className={clsx(classes.toolbar, classes.menuHeader)}>
        <Typography className={classes.menuTitle2}>GERMINY</Typography>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => route("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        {userInfo && userInfo.role === "admin" && <ListItem button button onClick={() => route("/user")}>
          <ListItemIcon>
            <PeopleAlt />
          </ListItemIcon>
          <ListItemText primary={"User"} />
        </ListItem>}
        <ListItem button onClick={() => route("/practitioner")}>
          <ListItemIcon>
            < PersonIcon/>
          </ListItemIcon>
          <ListItemText primary={"Practitioner"} />
        </ListItem>
        {userInfo && userInfo.role === "admin" && <ListItem button onClick={() => route("/field")}>
          <ListItemIcon>
            <LocalHospital />
          </ListItemIcon>
          <ListItemText primary={"Specialization"} />
        </ListItem>}
      </List>
      <Divider />
      <List>
        {userInfo && userInfo.role === "admin" && <ListItem button onClick={() => route("/email")}>
          <ListItemIcon>
            <InboxIcon/>
          </ListItemIcon>
          <ListItemText primary={"All Email"} />
        </ListItem>}
        
      </List>
    </div>
  );

  // console.log(profile);
  const container = win !== undefined ? () => win().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="default"
        elevation={1}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.menuTitle}>GERMINY</Typography>
          <div className={classes.grow} />

          <Box className={classes.flex}>
            <Tooltip title="View Messages" arrow>
              <IconButton>
                <MailIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="toggle light/dark theme" arrow>
              <IconButton onClick={toggleDarkTheme}>
                {theme.palette.type === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <BrightnessHighIcon />
                )}
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" className={classes.divider} />
            {userInfo ? (
              <Typography component="small" className={classes.name}>
                {userInfo.displayname}
              </Typography>
            ) : <h1></h1>}
            
        
            <IconButton edge="end" onClick={handleMenuOpen}>
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
            </IconButton>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.wrapper}>
          <div>{children}</div>
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
