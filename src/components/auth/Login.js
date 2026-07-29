import React, { useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Message';
import Skeleton from 'react-loading-skeleton';
import {login} from '../../actions/userActions'
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  Card
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useCustomTheme } from '../../hooks/useCustomTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    height: "100vh",
    background: theme.palette.type === 'dark' 
      ? 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)' 
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  },
  title: {
    display: "block",
    marginBottom: 30,
    fontSize: "0.85rem",
    color: theme.palette.text.primary,
  },
  bg: {
    background: "url(/img/surgery.jpg), #000",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    position: "relative",
    '&::after': {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.palette.type === 'dark' 
        ? 'rgba(26, 32, 44, 0.7)' 
        : 'rgba(0, 0, 0, 0.3)',
    }
  },
  form: {
    textAlign: "center",
    padding: theme.spacing(10),
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  loginCard: {
    background: theme.palette.type === 'dark' 
      ? 'rgba(45, 55, 72, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: theme.palette.type === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme.palette.type === 'dark' 
      ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  btn: {
    marginTop: 20,
    padding: theme.spacing(2),
  },
  forgotPass: {
    textAlign: "left",
    display: "block",
  },
}));

const INIT_VALUES = {
  email: "",
  password: "",
  showPassword: false,
};

const Login = ({location, history}) => {
  const [values, setValues] = React.useState(INIT_VALUES);
  const classes = useStyles();
  const [isPassword, setIsPassword] = useState(false);
  const { colors } = useCustomTheme();

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin

  useEffect(() => {
    if(userInfo){
      history.push('/dashboard')
    }
  }, [history, userInfo, redirect])

  const handleChange = (e) => {
    e.persist();
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const togglePassword = () => {
    setIsPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(values.email, values.password))

  };
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="flex-start">
        <Grid item md={6}>
          <div className={classes.left}>
          <Card className={classes.loginCard}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Typography
                align="center"
                variant="overline"
                className={classes.title}
              >
                <h4 style={{ color: colors.text.primary }}>Germiny Admin Login</h4>
              </Typography>
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Skeleton/>}
              <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    type="email"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    type={isPassword ? "text" : "password"}
                    label="Password"
                    name="password"
                    
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={togglePassword}>
                          {isPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
  
            </form>
            </Card>
          </div>
        </Grid>
        <Hidden smDown mdDown>
          <Grid item md={6}>
            <div className={classes.bg}></div>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export default Login;
