import { memo, ReactElement } from "react"
import { QuotePropsType } from "../types";

const Quote = memo(function ({
    testimonial,
    name,
    company,
    position
}: QuotePropsType): ReactElement {
    return (
        <div className="bg-slate-200 h-screen flex justify-center items-center">
            <div className="flex-col max-w-lg mx-5">
                <div className="font-extrabold text-3xl">"{testimonial}"</div>
                <div className="my-3">
                    <div className="font-bold">{name}</div>
                    <div className="font-thin">{position} | {company}</div>
                </div>
            </div>
        </div>
    )
});

export default Quote;