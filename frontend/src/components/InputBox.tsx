import { memo, ReactElement, useRef } from "react";
import { LabelledInputType } from "../types";

const InputBox = memo(function ({
    label,
    type,
    onChange,
}: LabelledInputType): ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);

    function showPassword() {
        const currentVal = inputRef.current?.getAttribute("type");
        if (currentVal === "text")
            inputRef.current?.setAttribute("type", "password")
        if (currentVal === "password")
            inputRef.current?.setAttribute("type", "text")
    }

    return (
        <div className="flex-col justify-center my-3">
            <div className="text-sm font-bold cursor-pointer">{label}</div>
            <div className="relative w-72">
                <input ref={inputRef} type={type}
                    onChange={onChange}
                    className="border-1 border-slate-300 rounded-md text-sm p-2 my-1 w-80" />
                {(type === "password") && <div onClick={showPassword} className="absolute top-1/2 -right-1/14 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 cursor-pointer hover:rounded-full hover:bg-slate-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>}
            </div>
        </div>
    )
})

export default InputBox;