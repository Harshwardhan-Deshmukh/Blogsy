import { ChangeEvent } from "react"

export type QuotePropsType = {
    testimonial: string
    name: string
    position: string
    company: string
}

export type LabelledInputType = {
    label: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}