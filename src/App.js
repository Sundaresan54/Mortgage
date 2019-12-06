import React, {
  Fragment
} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Landing from './components/landing/Landing'
import Header from './components/landing/Navbar'
import Mortgage from './components/mortgage/Mortgage'
import Preview from './components/mortgage/Preview'
import { history } from "../src/components/helpers/history"
const App = () => {
  return (

    <Router history={history}>
      <Fragment>
        <Switch>
          <Route exact path='/' render={() => <Header > <Landing /></Header>} />
          <Route exact path='/mortgage' render={() => <Header > <Mortgage /></Header>} />
          <Route exact path='/Preview' render={() => <Header > <Preview /></Header>} />
        </Switch>
      </Fragment>
    </Router>


  )

}



export default App;