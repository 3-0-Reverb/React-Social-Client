import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import MainRouter from './router/MainRouter';
import Navbar from './components/Navbar'
import UserNameWidget from './components/UserNameWidget'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarLoggedOut from './components/NavbarLoggedOut';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
                <Switch>
                    <Route path="/">
                        <main>
                          <Navbar>
                                <p>Fake Child Props</p>
                            </Navbar>
                          <UserNameWidget />
                        </main>
                    </Route>
                </Switch>
            </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
