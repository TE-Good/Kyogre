import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Pin from './components/Pin'
import Dash from './components/Dash'

import './styles.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route eaxct path="/dash" component={Dash} />
        <Route exact path="/" component={Pin} />
      </Switch>
    </Router>

  )
}

render(<App />, document.getElementById('container'))
