import React from 'react';
import { 
    BrowserRouter as Router, 
    Route,
    Redirect, 
} from 'react-router-dom';

// Views
import Login from './views/Login';

// TODO: Check if user is logged in, then direct them to either login page or dashboard

const AppRouter = () => (
    <Router>
        <Route exact path="/">
            <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={Login} />
    </Router>
);

export default AppRouter;