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

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Info */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300" />
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Test</h2>
            <Link
              href="profile/edit"
              className="px-4 py-2 mx-6 bg-[#6B8E23] text-white rounded hover:bg-[#557A1F] transition justify-self-end"
            >
              Edit Profile
            </Link>
          </div>

          <p className="text-gray-600">test</p>
          <p className="text-sm text-gray-500">test</p>
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
              <Link href={`/recipe/${item.id}`} key={item.id}>
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
            ))}
          </div>
        )}

        {activeTab === "tutorials" && (
          <ul className="space-y-2">
            {tutorials.map((tut) => (
              <li key={tut.id}>
                <Link
                  href={`/tutorial/${tut.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {tut.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "blogs" && (
          <ul className="space-y-2">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Link
                  href={`/community/blog/${blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
