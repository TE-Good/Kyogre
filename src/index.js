import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Pin from './components/Pin'
import Dash from './components/Dash'

import './styles.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dash" component={Dash} />
        <Route exact path="/" component={Pin} />
      </Switch>
    </Router>

  )
}

ReactDOM.render(<App />, document.getElementById('container'))
