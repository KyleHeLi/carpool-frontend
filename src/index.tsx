import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { theme } from './config/theme';

import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import Welcome from './pages/welcome';
import CustomizedMenus from './components/menu';

class App extends React.Component {

  render = () => {
    return (
      <Router>
        <div>
          <nav>
            <CustomizedMenus />
          </nav>

          <Route path="/" exact component={Welcome} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
        </div>
      </Router>
    );
  }

}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
