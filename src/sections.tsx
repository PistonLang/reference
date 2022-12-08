import { ReactNode } from "react";
import { Grammar, GrammarInfo } from "./grammar";

export interface Section {
    name: string,
    grammar: GrammarInfo[],
    children: ReactNode[],
    subsections: Section[],
    toComponent(level: number): ReactNode
}

export const section = (
    name: string, 
    grammar: GrammarInfo[] = [],
    children: ReactNode[] = [],
    subsections: Section[] = []
): Section => ({
    name, grammar, children, subsections, toComponent: (level: number = 0): ReactNode => [
        <div className={`section${level}`}>{name}</div>,
        ...grammar.length !== 0 ? [<Grammar terms={grammar}/>] : [],
        ...children,
        ...subsections.map((sec) => sec.toComponent(level + 1)) 
    ]
})

export const CodePoint = ({children}: {children: ReactNode}) => (
    <span className="codepoint">{children}</span>
) 