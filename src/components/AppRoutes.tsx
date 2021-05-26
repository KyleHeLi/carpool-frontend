import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { compose } from 'recompose';
import { SignUpForm } from './signUpRoute/SignUpForm';

interface AppRoutesProps { }

interface AppRoutesBaseProps extends RouteComponentProps { }

class AppRoutesBase extends React.PureComponent<AppRoutesBaseProps> {
  render = () => (
    <Switch>
      <Route
        path='/'
        component={undefined}
        exaxt
      />
      <Route
        path='/login'
        component={undefined}
      />
      <Route
        path='signup'
        component={SignUpForm}
      />
    </Switch>
  )
}

export const AppRoutes = compose<AppRoutesBaseProps, AppRoutesProps>(
  withRouter
)(AppRoutesBase);
