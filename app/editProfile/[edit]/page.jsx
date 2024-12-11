"use client";

import React, { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "sonner";

function EditProfile() {
  const [name, setName] = useState("");

  const { edit } = useParams();
  console.log(edit, ".........");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    image: "",
    affiliation: "",
    name: name,
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/authLogin/${edit}`, formData);
      console.log("User updated successfully:", response.data);
      toast.success("User updated successfully!");

      router.push(`/adminProfile/${edit}`);
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const userProfile = async (edit) => {
      const res = await axios.get(`/api/authLogin/${edit}`);
      try {
        if (res.status === 200) {
          //   setUser(res.data.getUser);
          setName(res.data.getUser.name);

          const user = res.data.getUser;

          setFormData({
            username: user.username || "",
            password: user.password || "",
            image: user.image || "",
            affiliation: user.affiliation || "",
            name: user.name || "",
          });

          console.log(res.data.getUser, "Fetched item");
          console.log(res.data.getUser.name, "Fetched item");
        } else {
          throw new Error(`Unexpected response: ${res.statusText}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userProfile(edit);
  }, [edit]);

  return (
    <div className="min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-5 m-5 bg-myBgDark-lifgtDark  rounded-lg shadow-md w-4/6"
      >
        <div>
          <span className="text-slate-100">Username</span>
          <input
            className="w-full p-2 text-gray-300 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>

        <div>
          <span className="text-slate-100">Password</span>
          <input
            className="w-full p-2 text-gray-300 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        {/* <div>
          <span className="text-slate-100">Image</span>
          <input
            className="w-full p-2 text-gray-300 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="image"
            type="file"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div> */}

        <div>
          <span className="text-slate-100">Afiliation</span>
          <input
            className="w-full p-2 text-gray-300 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            placeholder="Affiliation"
          />
        </div>

        <div>
          <span className="text-slate-100">Name</span>
          <input
            className="w-full p-2 text-gray-300 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
        >
          Save Change
        </button>
        <Toaster richColors />
      </form>
    </div>
  );
}

export default EditProfile;
