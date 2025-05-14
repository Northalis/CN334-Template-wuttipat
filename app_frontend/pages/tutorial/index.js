import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/baseURLS";
import Link from "next/link";

const tutorial = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/api/tutorials`) // Adjust to your backend URL
      .then((res) => setTutorials(res.data))
      .catch((err) => console.error("Failed to fetch recipes", err));
  }, []);
  if (!tutorials) return <p className="p-6">Loading...</p>;
  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Link
          href="/add"
          className="px-4 py-2 bg-[#6B8E23] text-white rounded hover:bg-[#557A1F] transition"
        >
          + Add Totorial
        </Link>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recommended Tutorials</h2>
          <Link href="/all" className="text-[#6B8E23] hover:underline text-sm">
            View All →
          </Link>
        </div>
        {/* Carousel placeholder */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {/* Map recommended tutorials here */}
          {tutorials.map((tutorial) => (
            <Link key={tutorial.id} href={`/tutorial/${tutorial.id}`}>
              <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
                {tutorial.image ? (
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="h-40 w-full object-cover rounded mb-4"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 rounded mb-4" />
                )}
                <h3 className="text-lg font-semibold">{tutorial.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {tutorial.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default tutorial;
