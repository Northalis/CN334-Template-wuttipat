import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getBaseUrl } from "@/baseURLS";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${getBaseUrl()}/api/blogs/add`, {
        title,
        content,
      });
      alert("Blog added successfully");
      router.push("/community");
    } catch (err) {
      console.error(err);
      alert("Error adding blog");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          rows={6}
          required
        />
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
