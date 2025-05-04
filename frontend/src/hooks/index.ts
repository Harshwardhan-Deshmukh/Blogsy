import axios from "axios";
import { useEffect, useState } from "react"
import BACKEND_URL from "../../config";

interface BlogType {
    id: string;
    title: string;
    content: string,
    updatedAt: Date,
    author: {
        username: string,
        name: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`)
        .then(response => {
            if (response.data) {
                setBlogs(response.data.data)
                setLoading(false)
            }
        })
    }, [])

    return {loading, blogs}
}