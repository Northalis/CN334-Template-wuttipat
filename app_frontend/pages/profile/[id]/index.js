import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getBaseUrl } from "@/baseURLS";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("recipes");

  useEffect(() => {
    if (id) {
      axios.get(`${getBaseUrl()}/api/profile/${id}/`).then((res) => {
        setProfile(res.data.user);
        setRecipes(res.data.recipes);
        setTutorials(res.data.tutorials);
        setBlogs(res.data.blogs);
      });
    }
  }, [id]);

  const handleDelete = async (type, itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${getBaseUrl()}/api/delete/${type}/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (type === "recipe") {
        setRecipes((prev) => prev.filter((r) => r.id !== itemId));
      } else if (type === "tutorial") {
        setTutorials((prev) => prev.filter((t) => t.id !== itemId));
      } else if (type === "blog") {
        setBlogs((prev) => prev.filter((b) => b.id !== itemId));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!profile) return <p className="p-6">Loading...</p>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Info */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300">
          {profile.profile_image ? (
            <img
              src={profile.profile_image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full" />
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{profile.user}</h2>
            <Link
              href={`/profile/${id}/edit`}
              className="px-4 py-2 mx-6 bg-[#6B8E23] text-white rounded hover:bg-[#557A1F] transition justify-self-end"
            >
              Edit Profile
            </Link>
          </div>

          <p className="text-gray-600">{profile.full_name}</p>
          <p className="text-sm text-gray-500">{profile.tel}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["recipes", "tutorials", "blogs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-[#6B8E23] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            My {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "recipes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recipes.map((item) => (
              <div key={item.id} className="relative">
                <Link href={`/recipe/${item.id}`}>
                  <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-40 w-full object-cover rounded mb-2"
                      />
                    ) : (
                      <div className="h-40 bg-gray-200 rounded mb-2" />
                    )}
                    <h4 className="font-semibold">{item.title}</h4>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete("recipe", item.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tutorials" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id} className="relative">
                <Link href={`/tutorial/${tutorial.id}`}>
                  <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
                    <h3 className="text-lg font-semibold">{tutorial.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {tutorial.description}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete("tutorial", tutorial.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "blogs" && (
          <ul className="space-y-2">
            {blogs.map((blog) => (
              <li key={blog.id} className="border-b pb-4 relative">
                <Link
                  href={`/community/blog/${blog.id}`}
                  className="block p-4 bg-white rounded shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-[#6B8E23]">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600">{blog.title}</p>
                </Link>
                <button
                  onClick={() => handleDelete("blog", blog.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
