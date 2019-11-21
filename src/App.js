import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import { Loader } from '@/components/common';
import { Role } from '@/helpers';
import {
  LoginPage,
  DashboardPage
} from '@/pages';
import { PrivateRoute } from './components/common';

import { mainTheme } from './theme/main';

const TextComponentPage = Loadable({
  loader: () => import('@/pages/Demo/TextComponentPage'),
  loading: Loader,
});

const CheckboxRadioComponentPage = Loadable({
  loader: () => import('@/pages/Demo/CheckboxRadioComponentsPage'),
  loading: Loader,
});

const FileUploadComponentPage = Loadable({
  loader: () => import('@/pages/Demo/FileUploadComponentPage'),
  loading: Loader,
});

const SelectComponentPage = Loadable({
  loader: () => import('@/pages/Demo/SelectComponentsPage'),
  loading: Loader,
});

const ForbiddenPage = Loadable({
  loader: () => import('@/pages/ErrorPages/ForbiddenPage'),
  loading: Loader,
});

const NotFoundPage = Loadable({
  loader: () => import('@/pages/ErrorPages/NotFoundPage'),
  loading: Loader,
});



const App = () => {
  const [theme, setTheme] = useState(mainTheme);
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>KG React Boilerplate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={() => <Redirect to="/dashboard" />} />
            <PrivateRoute exact path="/dashboard" roles={[Role.Admin]} component={() => <DashboardPage setTheme={setTheme} />} />
            <PrivateRoute exact path="/select" roles={[Role.Admin]} component={SelectComponentPage} />
            <PrivateRoute exact path="/text" roles={[Role.Admin]} component={TextComponentPage} />
            <PrivateRoute exact path="/file" roles={[Role.Admin]} component={FileUploadComponentPage} />
            <PrivateRoute exact path="/checkbox" roles={[Role.Admin]} component={CheckboxRadioComponentPage} />
            <Route path="/404" component={NotFoundPage} />
            <Route path="/403" component={ForbiddenPage} />
            <Route component={() => <Redirect to="/404" />} />
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
