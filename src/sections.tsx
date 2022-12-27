import { ReactNode } from 'react'
import { Grammar, GrammarInfo } from './grammar'

export class Section {
	name: string
	children: ReactNode
	subsections: Section[]
	heading: ReactNode

	constructor(name: string, children: ReactNode = null, subsections: Section[] = [], heading: ReactNode = <></>) {
		this.name = name
		this.children = children
		this.subsections = subsections
		this.heading = heading
	}

	get id() {
		return this.name.toLowerCase().replaceAll(' ', '-')
	}

	toComponent(level: number): ReactNode {
		return (
			<div className="section">
				<a id={this.id} href={`#${this.id}`} className={`section-h${level}`}>
					{this.name}
				</a>
				{this.heading}
				{this.children === null ? <></> : <div className="section-body">{this.children}</div>}
				{this.subsections.map(sec => sec.toComponent(level + 1))}
			</div>
		)
	}
}

export const GrammarSection = (
	name: string,
	grammar: GrammarInfo[] = [],
	children: ReactNode = null,
	subsections: Section[] = []
): Section => new Section(name, children, subsections, grammar.length !== 0 ? <Grammar>{grammar}</Grammar> : <></>)

export const AlgorithmSection = (
	name: string,
	algorithm: ReactNode,
	children: ReactNode = null,
	subsections: Section[] = []
): Section => new Section(name, children, subsections, <div className="algorithm">{algorithm}</div>)

export const CodePoint = ({ children }: { children: ReactNode }) => <span className="codepoint">{children}</span>
