"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";

const UpdateProduct = () => {
  const router = useRouter();
  const { id } = useParams(); // Using router.query to access the ID

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUserById = async (id) => {
      try {
        const res = await axios.get(`/api/authLogin/${id}`);

        if (res.status !== 200) {
          throw new Error("Failed to fetch Supplier");
        } else {
          const user = res.data.getUser;
          setData(user);

          //   setuserId(user.userId || "");
          setName(user.name || "");
          setUsername(user.username || "");
          setPassword(user.password || "");
          setImage(user.image || "");
          setAffiliation(user.affiliation || "");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !name || !affiliation || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await axios.put(`/api/authLogin/${id}`, {
        username,
        password,
        image,
        affiliation,
        name,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update the user");
      }

      setOpen(false);

      toast.success("User updated successfully.");

      router.push("/user");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the User.");
    }
  };

  return (
    <div className="w-3/5 bg-myBgDark-lifgtDark m-5 p-5 rounded-lg text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 "
      >
        <div>
          <span className="text-slate-100">Name</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <span className="text-slate-100">Username</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <span className="text-slate-100">Affiliation</span>
          <input
            type="text"
            placeholder="Affiliation"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <span className="text-slate-100">Password</span>
          <input
            type="text"
            placeholder="Passwowrd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* <div>
          <span className="text-slate-100">Image</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} // Set the file in state
            className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div> */}

        {/* <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 text-slate-100 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        /> */}
        <div>
          <button
            type="submit"
            className="w-fit col-span-1 px-6 py-2 mt-5 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
