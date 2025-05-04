import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return <div className="border border-slate-300 flex justify-between px-10 py-3">
        <div className="font-extrabold text-3xl">
            Medium
        </div>
        <div>
            <Avatar color="slate" name={"Harshwardhan"} size={8}/>
        </div>
    </div>
}