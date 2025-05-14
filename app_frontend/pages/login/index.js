import { useRouter } from "next/router";
import { getBaseUrl } from "@/baseURLS";
export default function Login() {
  const router = useRouter();
  async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch(`${getBaseUrl()}/api/token/`, {
      method: "POST",
      body: formData,
    });

    try {
      const data = await response.json();
      localStorage.setItem("jwt_access", data.access);
      alert("Login success!");
      router.push(`/`); // Redirect to the home page
    } catch (error) {
      alert("Your username/password are incorrect!");
    }
  }
  return (
    <div className="flex h-screen">
      {/* Left side with logo/image */}
      <div className="w-1/2 bg-[#F4EBD0] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-[#6B8E23]">The Juiz Lab</h1>
      </div>

      {/* Right side with login box */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={onLogin}
          className="bg-white p-8 rounded shadow-md w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <input
            type="text"
            placeholder="username"
            name="username"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
          />
          <button
            type="submit"
            className="w-full bg-[#6B8E23] text-white py-2 rounded hover:bg-[#557A1F] transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
