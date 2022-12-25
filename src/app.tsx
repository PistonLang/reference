import expressions from './sections/expressions';
import functions from './sections/functions';
import introduction from './sections/introduction';
import javaInterop from './sections/java-interop';
import packageAndModules from './sections/packages_and_modules';
import properties from './sections/properties';
import scopes from './sections/scopes';
import tokens from './sections/tokens';
import types from './sections/types';
import typeInference from './sections/type-inference';
import { ReactComponent as PistonLogo } from './svg/piston.svg';
import { ReactComponent as GithubLogo } from './svg/github.svg';
import { ReactComponent as DiscordLogo } from './svg/discord.svg';
import { ReactComponent as Dropdown } from './svg/dropdown.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Section } from './sections';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
);

const SideBar = (props: { sections: Section[] }) => {
	const [scrollY, setScrollY] = useState(window.scrollY);
	useEffect(() => {
		const callback = () => setScrollY(window.scrollY);
		document.addEventListener('scroll', callback);
		return () => document.removeEventListener('scroll', callback);
	});
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
	);
};

const sectionsToRoutes = (sects: Section[]) =>
	sects.map((curr) => (
		<Route path={`/${curr.id}`} element={curr.toComponent(0)}></Route>
	));

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
];

export const App = () => {
	const [hideSide, setHideSide] = useState(true);
	const update = () => setHideSide((val) => !val);
	return (
		<BrowserRouter basename="reference">
			<NavBar navUpdate={update} />
			<div className={hideSide ? 'noSidebar' : 'withSidebar'}>
				<SideBar sections={sections} />
				<div className="content">
					<div className="content-body">
						<Routes>
							{sectionsToRoutes(sections)}
							<Route path="/" element={introduction.toComponent(0)}></Route>
						</Routes>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};
