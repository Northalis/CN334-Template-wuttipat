import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getBaseUrl } from "@/baseURLS";

const AddTutorial = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${getBaseUrl()}/api/tutorials/add`, {
        title,
        video_url: videoUrl,
        description,
      });
      alert("Tutorial added successfully");
      router.push("/tutorial");
    } catch (err) {
      console.error(err);
      alert("Error adding tutorial");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Tutorial</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="Video URL (YouTube, etc.)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTutorial;
