import { useEffect, useState } from "react";
import { getBlogById } from "../services/blogService";
import { useParams, Link } from "react-router-dom";

export default function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    const res = await getBlogById(id);
    setBlog(res.data);
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="italic text-gray-600">By {blog.author}</p>
      <p className="mt-4 whitespace-pre-wrap">{blog.content}</p>

      <Link to="/" className="text-blue-600 mt-4 block">
        ← Back to Blogs
      </Link>
    </div>
  );
}
