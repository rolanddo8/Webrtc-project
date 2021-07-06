import React from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path="/" component={LoginPage} />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    )
}

export default App;