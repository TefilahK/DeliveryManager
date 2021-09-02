import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import reportWebVitals from './reportWebVitals';
import ListPackages from './components/sideBar/ListPackages';
import VolunteersList from './components/sideBar/VolunteersList';
import {BrowserRouter,MemoryRouter} from "react-router-dom"
import App from './components'

ReactDOM.render(
  
  <React.StrictMode>
    <MemoryRouter>
      <App/>
    {/* <Login/>
    <ListPackages />
    <VolunteersList /> */}
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


