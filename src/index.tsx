import ReactDOM from 'react-dom/client'
import './index.css'
import { inputRepresentation, introduction } from './sections/introduction'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='App'>
    {introduction.toComponent(0)}
    {inputRepresentation.toComponent(0)}
  </div>
)