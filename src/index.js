import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@babel/polyfill'
// require('dotenv').config()

import Front from './components/Front'
import Dash from './components/Dash'
import Tenet from './components/Tenet'

import './styles.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Front} />
        <Route path='/dash' component={Dash} />
        <Route path={'/tenet'} component={Tenet} />
      </Switch>
    </Router>

  )
}

render(<App />, document.getElementById('container'))
