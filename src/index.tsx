import ReactDOM from 'react-dom/client'
import './index.css'
import { expressions } from './sections/expressions'
import { functions } from './sections/functions'
import { introduction } from './sections/introduction'
import { packageAndModules } from './sections/packages_and_modules'
import { properties } from './sections/properties'
import { tokens } from './sections/tokens'
import { types } from './sections/types'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='App'>
    {introduction.toComponent(0)}
    {tokens.toComponent(0)}
    {functions.toComponent(0)}
    {properties.toComponent(0)}
    {types.toComponent(0)}
    {packageAndModules.toComponent(0)}
    {expressions.toComponent(0)}
  </div>
)