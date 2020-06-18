import React from 'react'
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
  console.log(kyogre)
  console.log(note)
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Front} />
        <Route path='/dash' component={Dash} />
        <Route path='/tenet' component={Tenet} />
      </Switch>
    </Router>
  )
}

render(<App />, document.getElementById('container'))
