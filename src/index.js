import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Front from './components/Front'
import Pin from './components/Pin'
import Dash from './components/Dash'

require('@babel/polyfill')
import './styles.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route eaxct path="/dash" component={Dash} />
        <Route exact path="/" component={Front} />
      </Switch>
    </Router>

  )
}

render(<App />, document.getElementById('container'))
