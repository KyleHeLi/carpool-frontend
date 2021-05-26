import * as React from 'react';
import {
  RouteComponentProps,
  withRouter
} from 'react-router';

interface NavigatorChildProps {
  goToHome(): void;
  goToLogin(): void;
  goToSignup(): void;
}

interface NavigatorProps {
  children?: (props: NavigatorChildProps) => React.ReactNode;
}

class NavigatorBase extends React.PureComponent<
  NavigatorProps & RouteComponentProps
  > {

  childProps: NavigatorChildProps = {

    goToHome: () => {
      const { history } = this.props;
      history.push(`/`);
    },

    goToLogin: () => {
      const { history } = this.props;
      history.push(`/login`);
    },

    goToSignup: () => {
      const { history } = this.props;
      history.push(`/signup`);
    }
  };

  render = () => {
    const { children } = this.props;
    if (!children) { return null; }
    return children(this.childProps);
  }
}

const Navigator = withRouter(NavigatorBase);

export interface WithNavigatorChildProps {
  navigator: NavigatorChildProps;
}

export const withNavigator = <P extends {}>(Component: React.ComponentType<P>) =>
  // tslint:disable-next-line: max-classes-per-file
  class WithNavigator extends React.PureComponent<P> {
    render = () => {
      const { ...rest } = this.props;
      return (
        <Navigator>
          {(navigator) => <Component navigator={navigator} {...rest} />}
        </Navigator>
      );
    }
  };
