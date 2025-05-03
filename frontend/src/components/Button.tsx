import { memo } from "react";

const Button = memo(function ({ label, onClick }: { label: string, onClick: () => void }) {
    return (
        <div className="text-white hover:bg-slate-700 cursor-pointer bg-slate-900 text-sm font-bold p-2 my-1 w-80 text-center rounded-md"
            onClick={onClick}
        >
            {label}
        </div>
    )
})

export default Button;