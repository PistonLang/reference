import expressions from './sections/expressions'
import functions from './sections/functions'
import introduction from './sections/introduction'
import javaInterop from './sections/java_interop'
import packageAndModules from './sections/packages_and_modules'
import properties from './sections/properties'
import scopes from './sections/scopes'
import tokens from './sections/tokens'
import types from './sections/types'
import typeInference from './sections/type-inference'
import { ReactComponent as PistonLogo } from './svg/piston.svg'
import { ReactComponent as GithubLogo } from './svg/github.svg'
import { ReactComponent as DiscordLogo } from './svg/discord.svg'
import { ReactComponent as Dropdown } from './svg/dropdown.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Section } from './sections'
import { useState } from 'react'

const NavBar = (props: {navUpdate: () => void}) => <header>
  <div className='header-left'>
    <button className='logo-holder' onClick={props.navUpdate}>
      <Dropdown className='logo'/>
    </button>
    <div className='logo-holder'>
      <PistonLogo className='logo'/>
    </div>
    <p>Piston</p>
  </div>
  <nav className='header-right'>
    <a className='logo-holder' href='https://discord.gg/Qxv2BxCSmf'>
      <DiscordLogo className='logo'/>
    </a>
    <a className='logo-holder' href='https://github.com/PistonLang'>
      <GithubLogo className='logo'/>
    </a>
  </nav>
</header>

const SideBar = (props: {sections: Section[]}) => <div className='sidebar'>
    <div className='sidebar-header'>Table of contents</div>
    <div className='sidebar-link-list'>
        {props.sections.map((sec) => 
        <BrowserRouter>
        <Routes>
            <Route path={`/piston-spec/${sec.id}`} element={
                <a href={`/piston-spec/${sec.id}`}><div className='sidebar-link-selected'>{sec.name}</div></a>
            }/>
            <Route path={`/*`} element={
                <a href={`/piston-spec/${sec.id}`}><div className='sidebar-link'>{sec.name}</div></a>
            }/>
        </Routes>
        </BrowserRouter>
        )}
    </div>
</div>

const sectionsToRoutes = (sects: Section[]) => sects.map((curr) => 
    <Route path={`/piston-spec/${curr.id}`} element={curr.toComponent(0)}></Route>
)

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
    javaInterop
]

export const App = () => {
    const [hideSide, sethideSide] = useState(true)
    const update = () => sethideSide((val) => !val)
    return <>
        <NavBar navUpdate={update}/>
        <div className={hideSide ? 'noSidebar' : 'withSidebar'}>
            <SideBar sections={sections}/>
            <div className='content'>
                <div className='content-body'>
                    <BrowserRouter>
                        <Routes>
                            {sectionsToRoutes(sections)}
                            <Route path='/piston-spec/*' element={introduction.toComponent(0)}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    </>
}

