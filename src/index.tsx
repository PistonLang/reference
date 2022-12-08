import ReactDOM from 'react-dom/client'
import './index.css'
import { introduction } from './sections/introduction'
import { tokens } from './sections/tokens'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='App'>
    {introduction.toComponent(0)}
    {tokens.toComponent(0)}
  </div>
)