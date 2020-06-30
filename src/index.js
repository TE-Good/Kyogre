import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@babel/polyfill'

import Front from './components/Front'
import Dash from './components/Dash'
import Tenet from './components/Tenet'

import './styles.scss'

const kyogre = `
                                                ':,.:xkc,oko
                                            ';'.;:,',;;'';:,
                                           .''......''''..  
                              ....       ......'...''...    
                              ..''...................       
                    ..      ....''''''''''......            
               ............'''''''''''''''''''..            
            .....''...'...'''''';ccc:;,'''''''''..          
        ..  ..'''''...''''..''',o0XNXKOl,''''''''.          
    ................''''''..';:looodxxdc,'''''';c:.         
  ....'........   ..,,;:,..'',;:c:,''''''',codkko'          
      .....         ..';,''''..'cxxkkOOOkk0K0dc.            
           ............''''.....;d0XXNX0xo:'.               
      .....''''''''''..'''..      .';l:.                    
  ,l;...'.....'''''''..'''.                                 
 .:oc,'.'.........''''''..                                  
  :O0d,'''...'''..''''..                                    
  ,c:;lkOxl,,;c::;'...                                      
     'x0Od;,oKXKx;.                                         
      ...  'xK0o.                                                                                                                 
`
const note = `Thanks for taking a look at Kyogre Quotes!
Made by https://github.com/TE-Good.`

function App() {
  const [darkTheme, setDarkTheme] = useState(false)
  const lightThemeClasses = ['light-theme', 'light-theme-button', 'light-theme-pin']
  const darkThemeClasses = ['dark-theme', 'dark-theme-button', 'dark-theme-pin']

  useEffect(() => {
    console.log(kyogre)
    console.log(note)
  },[])

  useEffect(() => {
    if (!darkTheme) switchToDarkTheme()
    else switchToLightTheme()
  }, [darkTheme])

  function switchToLightTheme() {
    lightThemeClasses.forEach((cl, i) => {
      const nodes = document.querySelectorAll(`.${cl}`)
      nodes.forEach(node => {
        node.classList.remove(`${cl}`)
        node.classList.add(`${darkThemeClasses[i]}`)
      })
    })
  }
  function switchToDarkTheme() {
    darkThemeClasses.forEach((cl, i) => {
      const nodes = document.querySelectorAll(`.${cl}`)
      nodes.forEach(node => {
        node.classList.remove(`${cl}`)
        node.classList.add(`${lightThemeClasses[i]}`)
      })
    })
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Front} />
        <Route path='/dash' component={Dash} />
        <Route path='/tenet' render={() => (
          <Tenet darkTheme={darkTheme} switchToLightTheme={switchToLightTheme} switchToDarkTheme={switchToDarkTheme} />
        )}/>
      </Switch>
      <div className="color-mode-wrapper">
        <i className="fas fa-adjust" onClick={() => setDarkTheme(!darkTheme)}></i>
      </div>
    </Router>
  )
}

render(<App />, document.getElementById('container'))
