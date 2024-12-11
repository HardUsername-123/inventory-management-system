"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import RemoveBtn from "./_components/RemoveBtn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/authLogin/createUser", {
        name,
        username,
        password,
        affiliation,
        role,
        image,
      });

      if (res.status === 201) {
        toast.success("Successful add user");

        setName("");
        setUsername("");
        setAffiliation("");
        setImage("");
        setPassword("");
        setRole("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/api/getUser");

        setUsers(res.data.getUsers);
        console.log(res.data.getUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  });

  const updatedUsers = users.slice(1);

  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // The "image" key matches the Multer configuration

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setUploadedImage(res.data.fileUrl); // Set the uploaded image URL
        setError("");
      }
    } catch (error) {
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleDelete = (id) => {
    // Remove deleted item from product array
    setUsers(users.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full  bg-myBgDark-lifgtDark rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-slate-100 mb-4">
            User Management
          </h1>

          {/* Form */}
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Affiliation"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Passwowrd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {/* <input
              type="file"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}

            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-fit col-span-2 px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600"
            >
              Add User
            </button>
          </form>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto w-full  bg-myBgDark-lifgtDark rounded-lg shadow-lg p-6 mt-5">
          <h3 className="text-xl font-semibold text-slate-100 mb-2">
            User List
          </h3>
          <table className="w-full text-left border-collapse ">
            <thead>
              <tr className="bg-myBgDark-textSoft text-slate-100  text-sm">
                <th className="px-4 py-2 ">Name</th>
                <th className="px-4 py-2 ">Username</th>
                <th className="px-4 py-2 ">Password</th>
                <th className="px-4 py-2 ">Role</th>
                <th className="px-4 py-2 ">Affiliation</th>
                <th className="px-4 py-2 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {updatedUsers.length > 0 ? (
                updatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-myBgDark-darkBg text-slate-100"
                  >
                    <td className="px-4 py-2 border border-myBgDark-textSoft">
                      {/* <img
                        src={user.image || null}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      /> */}
                      {user.name}
                    </td>
                    <td className="px-4 py-2 border border-myBgDark-textSoft">
                      @{user.username}
                    </td>
                    <td className="px-4 py-2 border border-myBgDark-textSoft">
                      {user.password}
                    </td>
                    <td className="px-4 py-2 border border-myBgDark-textSoft">
                      {user.role}
                    </td>
                    <td className="px-4 py-2 border border-myBgDark-textSoft">
                      {user.affiliation}
                    </td>
                    <td className="px-4 py-2 border border-myBgDark-textSoft">
                      <Link href={`/user/editUser/${user._id}`}>
                        <Button
                          aria-label="Edit"
                          variant="outline"
                          className="text-blue-500 hover:text-blue-700 mr-3"
                        >
                          <PencilIcon />
                        </Button>
                      </Link>
                      <RemoveBtn id={user._id} onDelete={handleDelete} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center px-4 py-2 text-slate-100 border border-myBgDark-textSoft"
                  >
                    No users added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
