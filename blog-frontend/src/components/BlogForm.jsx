import { useEffect, useState } from "react";
import { createBlog, getBlogById, updateBlog } from "../services/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BlogForm() {
  const [blog, setBlog] = useState({ title: "", content: "", author: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) loadBlog();
  }, [id]);

  const loadBlog = async () => {
    const res = await getBlogById(id);
    setBlog(res.data);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting blog:", blog); // ✅ add this line
  if (id) {
    await updateBlog(id, blog);
    toast.success("Blog updated!");
  } else {
    await createBlog(blog);
    toast.success("Blog created!");
  }
  navigate("/");
};
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Blog" : "Add Blog"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
        <input
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={blog.author}
          onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Content"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          required
          rows={6}
          className="border p-2 rounded"
        ></textarea>
        <button type="submit" className="btn-primary">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
