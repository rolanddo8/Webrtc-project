import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/" component={LoginPage} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;