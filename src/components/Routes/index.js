import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//constants
import { routes } from '../../common/constants/routes';

import LogIn from '../LogIn';
import PersonelList from '../PersonelList';
import AboutMe from '../AboutMe';
import HireCandidate from '../HireCandidate';
import ErrorPage from '../ErrorPages';
import TaskList from '../TaskList';
import TaskHistory from '../TaskHistory';
import PerformanceGraph from '../PerformanceGraph'
import AboutTheApp from '../AboutTheApp';

const Routes = () => {
    return (
        <Router>
            <Switch>
              <Route exact path={routes.LOGIN_PAGE} component={LogIn} />
              <Route exact path={routes.PERSONEL_LIST_PAGE} component={PersonelList} />
              <Route exact path={routes.ABOUT_ME} component={AboutMe} />
              <Route exact path={routes.HIRE_CANDIDATE} component={HireCandidate} />
              <Route exact path={routes.ERROR_PAGE} component={ErrorPage} />
              <Route exact path={routes.TASK_LIST} component={TaskList} />
              <Route exact path={routes.TASK_HISTORY} component={TaskHistory} />
              <Route exact path={routes.PERFORMANCE_GRAPH} component={PerformanceGraph} />
              <Route exact path={routes.ABOUT_THE_APP} component={AboutTheApp} />
 
              <Route path="*" render={
                () => (<Redirect to={routes.ERROR_PAGE}/>)
              } />
            </Switch>
        </Router>
      );
}

export default Routes;