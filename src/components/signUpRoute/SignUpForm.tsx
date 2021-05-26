import * as React from 'react';
import { compose } from 'recompose';
import * as Yup from 'yup';
import { WithStyles } from '@material-ui/styles';
import { FormikProps, withFormik, Form } from 'formik';
import {
  Theme,
  withStyles,
  createStyles,
  Grid,
  InputLabel,
  Input,
  FormControl,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Container,
  CssBaseline,
  Avatar
} from '@material-ui/core';
import { withNavigator, WithNavigatorChildProps } from '../shared/Navigator';

type StyleKeys = 'root'
  | 'menuButton'
  | 'title'
  | 'button'
  | 'paper'
  | 'form'
  | 'avatar'
  | 'inputField';

interface SingUpFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  postalCode: string;
  gender?: string | null;
  userName?: string | null;
}

export interface SignUpFormProps { }

export interface SignUpFormBaseProps extends WithStyles<StyleKeys>,
  FormikProps<SingUpFormInput>,
  WithNavigatorChildProps { }

class SignUpFormBase extends React.PureComponent<SignUpFormBaseProps, SignUpFormProps> {

  renderSignUpForm = () => {
    const { classes, values, handleChange, handleBlur, errors, touched, isValid } = this.props;
    return (
      <Form>
        <Grid container={true} spacing={8} justify='space-evenly' className={classes.form}>
          <Grid item xs={6} className={classes.inputField}>
            <FormControl fullWidth={true} required>
              <InputLabel>First Name</InputLabel>
              <Input
                name='firstName'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName ? (errors.firstName ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.firstName}</Typography>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.inputField}>
            <FormControl fullWidth={true} required>
              <InputLabel>Last Name</InputLabel>
              <Input
                name='lastName'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName ? (errors.lastName ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.lastName}</Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container={true} spacing={8} justify='space-evenly' className={classes.form}>
          <Grid item xs={6} className={classes.inputField}>
            <FormControl fullWidth={true} required>
              <InputLabel>Phone</InputLabel>
              <Input
                name='phoneNumber'
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber ? (errors.phoneNumber ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.phoneNumber}</Typography>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.inputField}>
            <FormControl fullWidth={true} required>
              <InputLabel>Postal Code</InputLabel>
              <Input
                name='postalCode'
                value={values.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postalCode ? (errors.postalCode ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.postalCode}</Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container={true} spacing={8}>
          <Grid item xs={12} >
            <FormControl fullWidth={true} required>
              <InputLabel>Email</InputLabel>
              <Input
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? (errors.email ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.email}</Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container={true} spacing={8}>
          <Grid item xs={12} >
            <FormControl fullWidth={true} required>
              <InputLabel>Password</InputLabel>
              <Input
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? (errors.password ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.password}</Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container={true} spacing={8} justify='space-evenly' className={classes.form}>
          <Grid item xs={6} className={classes.inputField}>
            <FormControl fullWidth={true} required>
              {/*replace the gender input with a selector */}
              <InputLabel>Gender</InputLabel>
              <Input
                name='gender'
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gender ? (errors.gender ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.gender}</Typography>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.inputField}>
            <FormControl fullWidth={true} required>
              <InputLabel>User Name</InputLabel>
              <Input
                name='userName'
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userName ? (errors.userName ? true : false) : undefined}
                autoFocus={true}
              />
              <Typography>{errors.lastName}</Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container={true} spacing={8} justify='flex-end' className={classes.form}>
          <Grid item={true}>
            <FormControlLabel
              control={<Checkbox value={'receiveEmail'} color='primary' />}
              label='I want to receive marketing promotions and updates via email' />
            <Button
              variant='contained'
              type='submit'
              color='primary'
              disabled={!isValid}
            >
              Sing Up
            </Button>
          </Grid>
        </Grid>
        <Grid container={true}>
          <Grid item={true} xs={12}>
            <Typography
              onClick={this.redirectToLogin}
            >Aready have an account? Sign in</Typography>
          </Grid>
        </Grid>
      </Form>
    );
  }

  redirectToLogin = () => {
    const { navigator } = this.props;
    navigator.goToLogin();
  }

  render = () => {
    const { classes } = this.props;
    return (
      <Container component='main' maxWidth='xs' >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component='h1' variant='h5'>Sign Up</Typography>
          {this.renderSignUpForm()}
        </div>
      </Container>
    );
  }
}

const SignUpFormInputSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.number()
    .required('Required')
    .min(10, 'Please enter an valid phone number')
    .max(10),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'too long')
    .required('Required'),
  postalCode: Yup.string()
    .test('len', 'Must be exactly 6 characters', val => val.length === 6)
    .required('Required'),
  gender: Yup.string().notRequired(),
  userName: Yup.string().notRequired(),
});

export const SignUpForm = compose<SignUpFormBaseProps, SignUpFormProps>(
  withStyles<StyleKeys, {}>((theme: Theme) =>
    createStyles({
      root: {
      },
      form: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: theme.spacing(3)
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      button: {
        margin: theme.spacing(1),
      },
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        backgroundColor: theme.palette.secondary.main,
      },
      inputField: {
        flex: 1,
      }
    })
  ),
  withFormik<SignUpFormProps, SingUpFormInput>({
    mapPropsToValues: (props) => {
      const initialValues: SingUpFormInput = {
        firstName: '',
        lastName: '',
        postalCode: '',
        phoneNumber: 6131112222,
        email: '',
        password: ''
      };
      return initialValues;
    },
    validationSchema: SignUpFormInputSchema,
    handleSubmit: (values, { setSubmitting }) => {
      // To-do, since we don't implement GraphQL service, for handling submittion, we could use
      // aoxis to send http POST request to backend APIs directly
      // once the backend API returns the success result, we can redirect the current page to login page or homepage
    }
  }),
  withNavigator
)(SignUpFormBase);
