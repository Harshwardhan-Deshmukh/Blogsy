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
        <div className="pt-4 cursor-pointer hover:bg-slate-100">
            <div className="px-4">
            <div className="flex gap-2 items-center">
                <Avatar name={authorName} color={getRandomColor()}/>
                <div className="font-medium text-md">{authorName}</div>
                <div className="text-[4px] text-slate-500">&#9679;</div>
                <div className="font-light text-sm text-slate-500">{publishedDate}</div>
            </div>
            <div className="font-medium text-3xl my-2">{title}</div>
            <div className="font-light text-lg mb-2">{content.slice(0, 100) + "..."}</div>
            <div className="font-thin text-[14px]">{`${Math.ceil(content.length / 100)} min(s) read`}</div>
            </div>
            <div className="bg-slate-200 h-0.5 w-full mt-4"></div>
        </div>
    )
})

function Avatar({ name, color}: { name: string, color: string }) {
    return <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-amber-900 ${colorMap[color] || 'bg-black'}`}>
        <span className="text-md font-extralight text-white">{name[0]}</span>
    </div>
}

export default BlogCard;