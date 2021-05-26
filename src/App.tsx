import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import Welcome from './pages/welcome';
import CustomizedMenus from './components/menu';

export class App extends React.Component<{}> {

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
