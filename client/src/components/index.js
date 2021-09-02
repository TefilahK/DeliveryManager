

import Login from './Login'
import { ThemeProvider } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { Route,Switch } from 'react-router';
import DashBoard from './DashBoard';
import { CssBaseline } from '@material-ui/core';
import Init from './init';
import { BrowserRouter } from 'react-router-dom';
import {ProtectedRoute} from './Protect_Route'
import ManagerCalendar from './Calendar';
import Reports from './sideBar/Reports';


export default function App() {
return (
    // <ThemeProvider  theme={darkTheme}>
      <div>
        <Container />
        <Switch>
        <BrowserRouter>
          <Route
            exact
            path="/Login"
            component={Login}
          />
          <Route exact path="/"
            component={Login}
           />
          <ProtectedRoute
            exact
            path="/Home"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/Volunteers"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/Reports"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/Map"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/Blog"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/ListPackages"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/Scheduler"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/DashBoard"
            component={DashBoard}
            />
          <ProtectedRoute
            exact
            path="/Calendar"
            component={DashBoard}
          />
          <ProtectedRoute
            exact
            path="/Chat"
            component={DashBoard}
          />
           <ProtectedRoute
            exact
            path="/PieChart"
            component={DashBoard }
          />:
          <ProtectedRoute
            exact
            path="/BarChart"
            component={DashBoard }
          />
          <ProtectedRoute 
           exact 
           path="/LineChart" 
           component={DashBoard } />
          <ProtectedRoute
            exact
            path="/DonutChart"
            component={DashBoard}
          />
          </BrowserRouter>
        </Switch>

        <CssBaseline />
      </div>
    // </ThemeProvider>
  );
}