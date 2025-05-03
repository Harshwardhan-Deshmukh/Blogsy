import { memo } from "react";

const Button = memo(function ({label} : {label: string}) {
    return (
        <div className="text-white hover:bg-slate-700 cursor-pointer bg-slate-900 text-sm font-bold p-2 my-1 w-72 text-center rounded-md">
            {label}
        </div>
    )
})

export default Button;