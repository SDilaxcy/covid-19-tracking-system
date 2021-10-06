import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../styles/style.scss';
import 'antd/dist/antd.min.css';

import Header from './ui/Header';
import theme from './ui/Theme';
import Login from './Login';
import LandingPage from './LandingPage';
import Vaccines from './Vaccine';
import AddUserDetails from './AddUserDetails';

import PrivateRoute from '../auth/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          {/* <Route exact path='/' render={(props) => <Login />} /> */}
          <PrivateRoute path='/LandingPage' exact component={LandingPage} />
          <PrivateRoute path='/Vaccines' exact component={Vaccines} />
          <PrivateRoute
            path='/AddUserDetails'
            exact
            component={AddUserDetails}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
