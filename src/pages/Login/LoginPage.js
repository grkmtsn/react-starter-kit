import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/services';

const LoginWrapper = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const LoginBg = styled.img`
  width: 400px;
`;

const StyledForm = styled(Form)`
  padding: 24px;
  display: flex;
`

const styles = {
  wrapper: {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  image: { width: 400 },
  alert: { marginBottom: 24 },
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      email: '',
      password: '',
    }
    if (authenticationService.currentUserValue) {
      const { history } = this.props;
      history.push('/dashboard');
    }
  }

  handleSubmit = ({ email, password }, { setStatus, setSubmitting }) => {
    setStatus();
    authenticationService.login(email, password).then(
      () => {
        // eslint-disable-next-line react/destructuring-assignment
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { history } = this.props;
        history.push(from);
      },
      error => {
        setSubmitting(false);
        setStatus(error);
      },
    );
  };

  renderLoginForm = ({ handleSubmit, isSubmitting, status }) => (
    <LoginWrapper>
      <LoginBg
        src="https://image.freepik.com/free-vector/programmer-working-with-sql_52683-22997.jpg"
        alt="intro"
      />
      <StyledForm>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </StyledForm>
    </LoginWrapper>
  );

  render() {
    const validationSchema = Yup.object().shape({
      email: Yup.string().required('Email is required').email("Invalid Email"),
      password: Yup.string().required('Password is required'),
    });

    const initialValues = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
        render={this.renderLoginForm}
      ></Formik>
    );
  }
}

export { LoginPage };
