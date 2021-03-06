import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Form, Formik} from "formik";
import FormikTextField from "../common/components/FormikTextField";
import Copyright from "../common/components/Copyright";
import {ROOT_URL, SIGN_UP_URL} from "../common/costants/urls";
import {Link, withRouter} from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import * as yup from 'yup'
import {authenticationService} from "../common/services/authenticationService";
import {withApollo} from "@apollo/react-hoc";
import { Paper } from '@material-ui/core';
import useStyles from './styles'

function Login(props) {
    const {client, history} = props;
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("Registration successful!");
    const [alertSeverity, setAlertSeverity] = React.useState("success");

    const [credentialsError, setCredentialsError] = React.useState(false);

    const openAlert = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline/>
            <Paper elevation={3} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Formik
                    initialValues={{username: "", password: ""}}
                    validationSchema={yup.object().shape({
                        username: yup.string().required('Username is required'),
                        password: yup.string().required('Password is required')
                    })}
                    onSubmit={async (data, {setSubmitting}) => {
                        setSubmitting(true);
                        // GraphQL Query to get user token
                        const auth = await authenticationService.login(client, data.username, data.password);
                        if (auth.success) {
                            setCredentialsError(false);
                            setAlertSeverity("success");
                            setAlertMessage("Logged in successful!");
                            setTimeout(() => history.push(ROOT_URL), 2000);
                        } else {
                            if (auth.failure) {
                                setAlertSeverity("error");
                                setAlertMessage("Something went wrong with the login process :-( Try again.");
                            }
                            else {
                                setAlertSeverity("error");
                                setCredentialsError(true);
                                if (auth.errors) setAlertMessage(auth.errors[0].message);
                                else setAlertMessage("Something went wrong with the login process :-( Try again.");
                            }
                        }
                        openAlert();
                        setSubmitting(false);
                    }}>
                    {(isSubmitting) => (
                        <Form className={classes.form}>
                            <FormikTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                error={credentialsError}
                            />
                            <FormikTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={credentialsError}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                disabled={!isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to={SIGN_UP_URL} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
        </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity={alertSeverity} elevation={6} variant="filled">
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default withRouter(withApollo(Login));