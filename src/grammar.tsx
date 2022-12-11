import { ReactElement, ReactNode } from 'react'

interface GrammarPoint {
    toComponent(group: boolean): ReactNode
}

export type GrammarPoints = GrammarPoint | [GrammarPoints, ...GrammarPoints[]] | string

const ref = (name: string): GrammarRef => ({
    name: name,
    toComponent: () => (<a href={`#${name}`}>{name}</a>)
})

export const toRefs = <T extends readonly string[],>(ids: T): Record<T[number], GrammarRef> =>  
    ids.reduce((last, curr) => ({[curr]: ref(curr), ...last}), {} as Record<T[number], GrammarRef>)

const strToComponent = (t: string) => (<span className="terminal">"{t}"</span>)

const pointsToComponents = (points: GrammarPoints, group: boolean = false): ReactNode => 
    Array.isArray(points) 
    ? [
        ...group ? ["("] : [],
        ...points.reduce((last, curr, index) => [
            ...last, 
            pointsToComponents(curr, group || points.length !== 1), 
            ...index !== points.length - 1 ? [" "] : []
        ], [] as ReactNode[]),
        ...group ? [")"] : []
    ]
    : typeof points == "string"
    ? strToComponent(points)
    : points.toComponent(group)

export interface GrammarRef extends GrammarPoint {
    name: string
}

export const union = (...cases: [GrammarPoints, ...GrammarPoints[]]): GrammarPoint => ({
    toComponent: (group: boolean) => [
    ...group ? ["("] : [],
    ...cases.reduce((last, curr, index) => [...last, pointsToComponents(curr, true), ...index !== cases.length - 1 ? [" | "] : []], [] as ReactNode[]),
    ...group ? [")"] : [],
    ]
})

export const option = (...nested: [GrammarPoints, ...GrammarPoints[]]): GrammarPoint => ({
    toComponent: () => <>[{pointsToComponents(nested, false)}]</>
})

export const many = (...nested: [GrammarPoints, ...GrammarPoints[]]): GrammarPoint => ({
    toComponent: () => ['{', pointsToComponents(nested, false), '}']
})

export const special = (text: string): GrammarPoint => ({
    toComponent: () => `<${text}>`
})

export const range = (a: string, b: string): GrammarPoint => ({
    toComponent: () => <>{strToComponent(a)} ... {strToComponent(b)}</>
})

export interface GrammarInfo {
    ref: GrammarRef
    grammar: GrammarPoints
}

const grammar = (ref: GrammarRef, grammar: GrammarPoints): GrammarInfo => {
    return {
        ref: ref, grammar: grammar
    }
}

export const toDefs = <T extends string,>(refs: Record<T, GrammarRef>, _defs: Record<T, GrammarPoints>) =>
    Object.keys(_defs).reduce(
        (last, name) => ({ ...last, [name]: grammar(refs[name as T], _defs[name as T]) }), 
        {} as Record<T, GrammarInfo>
    )

export const Grammar = ({terms}: {terms:GrammarInfo[]}): ReactElement => {
    const length = Math.max(...terms.map((elem) => elem.ref.name.length))
    const children = terms.map((curr) => (<div className='production'>
        <p className='production-left'><span className='production-name' id={curr.ref.name}>{curr.ref.name.padEnd(length)}</span> = </p>
        <p className='production-right'>{pointsToComponents(curr.grammar)}</p>
    </div>))
    return <div className='grammar'>{children}</div>
}
