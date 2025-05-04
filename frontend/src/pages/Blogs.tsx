import { ReactElement } from "react";
import BlogCard from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

function Blogs(): ReactElement {
    // store it in state
    // store it directly here
    // store it in a context variables???
    // create our own custom hooks like useBlogs
    const { loading, blogs } = useBlogs();

    return (
        <>
            <AppBar />
            <div className="flex flex-col items-center justify-center gap-y-4">
                {loading && blogs.map(blog => {
                    return <BlogCard authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={new Date(blog.updatedAt).toDateString()} />
                })}
            </div>
            {!loading && <div className="flex flex-col w-2xl justify-center my-5 gap-y-2">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
            }
        </>
    )
}

export default Blogs;