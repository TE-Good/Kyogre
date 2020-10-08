import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@babel/polyfill'

import Front from './components/Front'
import Dash from './components/Dash'
import Tenet from './components/Tenet'
import { consoleLogFlair } from './components/console'

import './styles.scss'

function App() {
  // Dark theme toggle
  const [darkTheme, setDarkTheme] = useState(true)

  // Prints console flair once
  useEffect(() => consoleLogFlair(), [])

  return (
    <div className={`app-wrapper ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Front darkTheme={darkTheme} />} />
          <Route path='/dash' render={() => <Dash darkTheme={darkTheme} />} />
          <Route path='/tenet' render={() => <Tenet darkTheme={darkTheme} />} />
        </Switch>
        <div className="color-mode-wrapper">
          <i className="fas fa-adjust" onClick={() => setDarkTheme(!darkTheme)}></i>
        </div>
      </Router>
    </div>
  )
}

render(<App />, document.getElementById('container'))
