import { memo, ReactElement, useRef } from "react";
import { LabelledInputType } from "../types";

const InputBox = memo(function ({
    label,
    type,
    onChangeFunction
}: LabelledInputType): ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        inputRef.current?.focus();
    }

    return (
        <div className="flex-col justify-center my-3">
            <div className="text-sm font-bold cursor-pointer" onClick={handleClick}>{label}</div>
            <input ref={inputRef} type={type} 
            onChange={(e) => onChangeFunction(e.target.value)}
            className="border-1 border-slate-300 rounded-md text-sm p-2 my-1 w-72"/>
        </div>
    )
})

export default InputBox;