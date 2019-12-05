import React, {
  Fragment
} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Landing from './components/landing/Landing'
import Header from './components/landing/Navbar'
import Mortgage from './components/mortgage/Mortgage'
const App = () => {
  return (

    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/' render={() => <Header > <Landing /></Header>} />
          <Route exact path='/mortgage' render={() => <Header > <Mortgage /></Header>} />
        </Switch>
      </Fragment>
    </Router>


  )

}



export default App;