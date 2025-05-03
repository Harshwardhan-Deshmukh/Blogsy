import { ReactElement } from "react";
import BlogCard from "../components/BlogCard";

function Blogs(): ReactElement {
    return <div>
        <BlogCard authorName={"Harshwardhan Deshmukh"}
            title={"How an ugly single page website makes $5000 a month without affiliate marketing"}
            content={"How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000 a month without affiliate marketing"}
            publishedDate={"2nd Feb 2024"} />
    </div>
}

export default Blogs;