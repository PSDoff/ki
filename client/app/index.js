import React from 'react';
import { render } from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Admin from './components/Admin/Admin';
import KegEditPage from './components/Keg/KegEditPage';


import './styles/styles.css';

render((
  <Router>
    <App>
    <Route
      render={({ location }) => (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="slide" timeout={{ enter: 1000, exit: 600 }}>
              <Switch location={location}>
                <Route exact path="/admin" component={Admin}/>
                <Route path="/kegs/:id" component={KegEditPage}/>
                <Route component={NotFound}/>
              </Switch>
          </CSSTransition>
      </TransitionGroup>
    )}
      />
    </App>
  </Router>
), document.getElementById('app'));
