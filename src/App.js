import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {CardList, Basket} from './components';

import './styles/index.scss';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Router>
          <div className="conteiner">
            <Switch>
              <Route path='/' exact>
                <CardList />
              </Route>
              <Route path='/basket' exact>
                <Basket />
              </Route>
              <Route path='*'>
                <Redirect to='/'/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
