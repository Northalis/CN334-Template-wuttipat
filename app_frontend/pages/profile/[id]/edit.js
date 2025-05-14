import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getBaseUrl } from "@/baseURLS";

export default function EditProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    full_name: "",
    bio: "",
    tel: "",
    email: "",
    profile_image: null,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${getBaseUrl()}/api/customers/${id}/`)
        .then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, profile_image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    await axios.put(`${getBaseUrl}/api/customers/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    router.push(`/profile/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Full name"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Email"
        />
        <input
          name="tel"
          value={form.tel}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Phone"
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Bio"
        />
        <input type="file" name="profile_image" onChange={handleImageChange} />
        <button
          type="submit"
          className="bg-[#6B8E23] text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
