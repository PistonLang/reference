import ReactDOM from 'react-dom/client'
import './sass/index.scss'
import { App } from './app'
import introduction from './sections/introduction'
import tokens from './sections/tokens'
import functions from './sections/functions'
import properties from './sections/properties'
import types from './sections/types'
import expressions from './sections/expressions'
import scopes from './sections/scopes'
import typeInference from './sections/type-inference'
import packageAndModules from './sections/packages_and_modules'
import javaInterop from './sections/java-interop'

const sections = [
	introduction,
	tokens,
	functions,
	properties,
	types,
	expressions,
	scopes,
	typeInference,
	packageAndModules,
	javaInterop,
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App sects={sections} />)
