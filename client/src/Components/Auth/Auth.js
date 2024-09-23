import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import useStyles from './styles';
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Icon from './icon';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import {signup, signin} from '../../actions/auth';
const Auth = () => {

  const intitialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(intitialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();


  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const googleSucess = async (res) => {
    const result = jwt_decode(res?.credential);
    const token = res?.credential;

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      history.push('/')
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccesful. Try again later')
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label='repeat Password' handleChange={handleChange} type='' password />}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            // clientId='577957096569-t7cgcllj3a8kjkv84m3brnhjp5coqtr5.apps.googleusercontent.com'
            // render={(renderProps) => (
            //   <Button
            //     className={classes.googleButton}
            //     color='primary'
            //     fullWidth
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}
            //     startIcon={<Icon />}
            //     variant='contained'
            //   >
            //     Google Sign IN
            //   </Button>
            // )}
            onSuccess={googleSucess}
            onError={googleError}
          // cookiePolicy='single_host_origin'
          />

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth