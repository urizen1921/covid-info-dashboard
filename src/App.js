import React from 'react';
import FrontPage from './pages/front-page.jsx';
import CountryDetail from './pages/country-detail.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {

  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FrontPage}/>
        <Route path="/country-detail/:countryId" component={CountryDetail}/>
      </Switch>
    </Router>
  );
}

export default App;
