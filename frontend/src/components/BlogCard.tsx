import { memo, ReactElement } from "react";

interface BlogCardPropsType {
    authorName: string,
    title: string;
    content: string;
    publishedDate: string
}

const colorMap: Record<string, string> = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500'
};

const BlogCard = memo(function ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardPropsType): ReactElement {
    const colors = ["red", "blue", "green", "amber"]
    function getRandomColor(): string {
        return colors[Math.floor(Math.random() * colors.length)]
    }
    return (
        <div className="px-6 hover:bg-slate-50">
            <div className="pt-4 cursor-pointer">
                <div className="flex gap-2 items-center">
                    <Avatar name={authorName} color={getRandomColor()} size={8}/>
                    <div className="font-medium text-md">{authorName}</div>
                    <div className="text-[4px] text-slate-500">&#9679;</div>
                    <div className="font-light text-sm text-slate-500">{publishedDate}</div>
                </div>
                <div className="font-medium text-2xl my-2">{title}</div>
                <div className="font-light text-md mb-2">{content.slice(0, 100) + "..."}</div>
                <div className="font-thin text-[14px]">{`${Math.ceil(content.length / 100)} min(s) read`}</div>
            </div>
            <div className="flex justify-center">
                <div className="border border-slate-200 h-0.5 mt-4 border-x-150"></div>
            </div>
        </div>
    )
})

export function Avatar({ name, color , size=8 }: { name: string, color: string; size?: number }) {
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden rounded-full bg-amber-900 ${colorMap[color] || 'bg-black'}`}>
        <span className="text-md font-extralight text-white">{name[0]}</span>
    </div>
}

export default BlogCard;