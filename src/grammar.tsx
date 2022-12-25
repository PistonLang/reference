import { ReactElement, ReactNode } from 'react';
import { HashLink } from 'react-router-hash-link';

interface GrammarPoint {
	toComponent(group: boolean): ReactNode;
}

export type GrammarPoints =
	| GrammarPoint
	| [GrammarPoints, ...GrammarPoints[]]
	| string;

class GrammarRef implements GrammarPoint {
	constructor(name: string, section: string) {
		this.name = name;
		this.section = section;
	}

	name: string;
	section: string;
	toComponent(_group: boolean): ReactNode {
		return (
			<HashLink to={{ pathname: `/${this.section}`, hash: this.name }}>
				{this.name}
			</HashLink>
		);
	}
}

export const toRefs = <T extends readonly string[]>(
	section: string,
	ids: T
): Record<T[number], GrammarRef> =>
	ids.reduce(
		(last, curr) => ({ [curr]: new GrammarRef(curr, section), ...last }),
		{} as Record<T[number], GrammarRef>
	);

const strToComponent = (t: string) => <span className="terminal">"{t}"</span>;

const pointsToComponents = (
	points: GrammarPoints,
	group: boolean = false
): ReactNode =>
	Array.isArray(points)
		? [
				...(group ? ['('] : []),
				...points.reduce(
					(last, curr, index) => [
						...last,
						pointsToComponents(curr, group || points.length !== 1),
						...(index !== points.length - 1 ? [' '] : []),
					],
					[] as ReactNode[]
				),
				...(group ? [')'] : []),
		  ]
		: typeof points == 'string'
		? strToComponent(points)
		: points.toComponent(group);

const Pipe = () => <div className="pipe">|</div>;

export const union = (
	...cases: [GrammarPoints, ...GrammarPoints[]]
): GrammarPoint => ({
	toComponent: (group: boolean) => [
		...(group ? ['('] : []),
		...cases.reduce(
			(last, curr, index) =>
				index === 0
					? [<div className="union-part">{pointsToComponents(curr, true)}</div>]
					: [
							...last,
							<div className="union-part">
								<Pipe />
								{pointsToComponents(curr, true)}
							</div>,
					  ],
			[] as ReactNode[]
		),
		...(group ? [')'] : []),
	],
});

export const option = (
	...nested: [GrammarPoints, ...GrammarPoints[]]
): GrammarPoint => ({
	toComponent: () => <>[{pointsToComponents(nested, false)}]</>,
});

export const many = (
	...nested: [GrammarPoints, ...GrammarPoints[]]
): GrammarPoint => ({
	toComponent: () => ['{', pointsToComponents(nested, false), '}'],
});

export const special = (text: string): GrammarPoint => ({
	toComponent: () => `<${text}>`,
});

export const range = (a: string, b: string): GrammarPoint => ({
	toComponent: () => (
		<>
			{strToComponent(a)} ... {strToComponent(b)}
		</>
	),
});

export interface GrammarInfo {
	ref: GrammarRef;
	grammar: GrammarPoints;
}

const grammar = (ref: GrammarRef, grammar: GrammarPoints): GrammarInfo => {
	return {
		ref: ref,
		grammar: grammar,
	};
};

export const toDefs = <T extends string>(
	refs: Record<T, GrammarRef>,
	_defs: Record<T, GrammarPoints>
) =>
	Object.keys(_defs).reduce(
		(last, name) => ({
			...last,
			[name]: grammar(refs[name as T], _defs[name as T]),
		}),
		{} as Record<T, GrammarInfo>
	);

export const Grammar = ({
	children,
}: {
	children: GrammarInfo[];
}): ReactElement => {
	const length = Math.max(...children.map((elem) => elem.ref.name.length));
	const terms = children.map((curr) => (
		<div className="production">
			<p className="production-left">
				<span className="production-name" id={curr.ref.name}>
					{curr.ref.name.padEnd(length)}
				</span>{' '}
				={' '}
			</p>
			<p className="production-right">{pointsToComponents(curr.grammar)}</p>
		</div>
	));
	return <div className="grammar">{terms}</div>;
};
