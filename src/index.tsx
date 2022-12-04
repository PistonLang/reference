import ReactDOM from 'react-dom/client'
import {Grammar} from './grammar'
import { defs } from './grammar/base'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='App'>
  <h1 id='Header'>This is a test</h1>
  <Grammar terms={[defs.digit]}/>
  </div>
)