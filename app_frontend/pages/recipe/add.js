import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getBaseUrl } from "@/baseURLS";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Send JWT token in the authorization header
        const token = localStorage.getItem("access_token");

        if (!token) {
          router.push("/login?redirect=/add-recipe");
          return;
        }

        const response = await axios.get(`${getBaseUrl()}/api/auth/check`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUserData(response.data);
        } else {
          // Redirect to login if not authenticated
          router.push("/login?redirect=/add-recipe");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        // Check if token is expired
        if (error.response?.status === 401) {
          // Try to refresh the token
          try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
              const refreshResponse = await axios.post(
                `${getBaseUrl}/api/token/refresh/`,
                {
                  refresh: refreshToken,
                }
              );

              // Save new tokens
              localStorage.setItem("access_token", refreshResponse.data.access);

              // Retry authentication check
              checkAuth();
              return;
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        }

        // Redirect to login on error
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/login?redirect=/add-recipe");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You must be logged in to add a recipe");
      router.push("/login?redirect=/add-recipe");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");

      await axios.post(`${getBaseUrl()}/api/recipes/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Recipe added successfully");
      router.push("/recipe"); // Redirect to recipes page after successful addition
    } catch (err) {
      console.error(err);

      // Handle different error scenarios
      if (err.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        router.push("/login?redirect=/add-recipe");
      } else {
        alert("Error adding recipe. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto mt-10 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Only show the form if authenticated
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
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
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          rows={4}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
