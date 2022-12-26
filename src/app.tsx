import { ReactComponent as PistonLogo } from './svg/piston.svg'
import { ReactComponent as GithubLogo } from './svg/github.svg'
import { ReactComponent as DiscordLogo } from './svg/discord.svg'
import { ReactComponent as Dropdown } from './svg/dropdown.svg'
import { ReactComponent as LeftArrow } from './svg/left-arrow.svg'
import { ReactComponent as RightArrow } from './svg/right-arrow.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Section } from './sections'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props: { navUpdate: () => void }) => (
	<header>
		<div className="header-left">
			<button className="logo-holder" onClick={props.navUpdate}>
				<Dropdown className="logo" />
			</button>
			<div className="logo-holder">
				<PistonLogo className="logo" />
			</div>
			<p>Piston</p>
		</div>
		<nav className="header-right">
			<a className="logo-holder" href="https://discord.gg/Qxv2BxCSmf">
				<DiscordLogo className="logo" />
			</a>
			<a className="logo-holder" href="https://github.com/PistonLang">
				<GithubLogo className="logo" />
			</a>
		</nav>
	</header>
)

const SideBar = (props: { sections: Section[] }) => {
	const [scrollY, setScrollY] = useState(window.scrollY)
	useEffect(() => {
		const callback = () => setScrollY(window.scrollY)
		document.addEventListener('scroll', callback)
		return () => document.removeEventListener('scroll', callback)
	})
	return (
		<div className={scrollY > 60 ? 'sidebar-sticky' : 'sidebar-static'}>
			<div className="sidebar">
				<div className="sidebar-header">Table of contents</div>
				<div className="sidebar-link-list">
					{props.sections.map((sec, index) => (
						<Routes>
							<Route
								path={`/${sec.id}`}
								element={
									<Link to={`/${sec.id}`}>
										<div className="sidebar-link-selected">{sec.name}</div>
									</Link>
								}
							/>
							{index === 0 ? (
								<Route
									path="/"
									element={
										<Link to={`/${sec.id}`}>
											<div className="sidebar-link-selected">{sec.name}</div>
										</Link>
									}
								/>
							) : (
								<></>
							)}
							<Route
								path={`/*`}
								element={
									<Link to={`/${sec.id}`}>
										<div className="sidebar-link">{sec.name}</div>
									</Link>
								}
							/>
						</Routes>
					))}
				</div>
			</div>
		</div>
	)
}

const Content = (props: { index: number, sects: Section[] }) => (
	<div className="content">
		<div className="content-body">
			{props.sects[props.index].toComponent(0)}
			<div className="content-nav">
				{props.index > 0 ? <Link to={`/${props.sects[props.index-1].id}`} className="prev-page">
					<LeftArrow/>
				</Link> : <></>}
				{props.index < props.sects.length - 1 ? <Link to={`/${props.sects[props.index+1].id}`} className="next-page">
					<RightArrow/>
				</Link> : <></>}
			</div>
		</div>
	</div>
)

const sectionsToRoutes = (sects: Section[]) =>
	sects.map((curr, index) => <Route path={`/${curr.id}`} element={<Content index={index} sects={sects} />}></Route>)

export const App = ({ sects }: { sects: Section[] }) => {
	const [hideSide, setHideSide] = useState(true)
	const update = () => setHideSide(val => !val)
	return (
		<BrowserRouter basename="reference">
			<NavBar navUpdate={update} />
			<div className={hideSide ? 'no-sidebar' : 'with-sidebar'}>
				<SideBar sections={sects} />
				<Routes>
					{sectionsToRoutes(sects)}
					<Route path="/" element={<Content index={0} sects={sects} />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}
