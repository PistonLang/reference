import ReactDOM from 'react-dom/client'
import './index.scss'
import { expressions } from './sections/expressions'
import { functions } from './sections/functions'
import { introduction } from './sections/introduction'
import { javaInterop } from './sections/java_interop'
import { packageAndModules } from './sections/packages_and_modules'
import { properties } from './sections/properties'
import { scopes } from './sections/scopes'
import { tokens } from './sections/tokens'
import { types } from './sections/types'
import logo from './logos/piston.svg'
import githubLogo from './logos/github.svg'
import discordLogo from './logos/discord.svg'

const NavBar = (_: {}) => <nav>
  <div className='nav-left'>
    <div className='piston-logo-holder'>
      <img src={logo} alt='Palm Logo'/>
    </div>
    <p>Piston</p>
  </div>
  <div className='nav-right'>
    <a className='logo-holder' href='https://discord.gg/Qxv2BxCSmf'>
      <img src={discordLogo} alt='Discord Logo'/>
    </a>
    <a className='logo-holder' href='https://github.com/PistonLang'>
      <img src={githubLogo} alt='GitHub Logo'/>
    </a>
  </div>
</nav>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<>
  <NavBar/>
  <div className='App'>
    {introduction.toComponent(0)}
    {tokens.toComponent(0)}
    {functions.toComponent(0)}
    {properties.toComponent(0)}
    {types.toComponent(0)}
    {expressions.toComponent(0)}
    {scopes.toComponent(0)}
    {packageAndModules.toComponent(0)}
    {javaInterop.toComponent(0)}
  </div>
</>)