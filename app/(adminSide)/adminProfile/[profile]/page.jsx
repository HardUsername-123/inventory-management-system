"use client";

import Loading from "@/app/_components/Loading";
import axios from "axios";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const AdminProfile = ({ params }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();

  const { profile } = use(params);

  useEffect(() => {
    const userProfile = async (profile) => {
      const res = await axios.get(`/api/authLogin/${profile}`);
      try {
        if (res.status === 200) {
          setUser(res.data.getUser);
          setId(res.data.getUser._id);
          console.log(res.data.getUser, "Fetched item");
        } else {
          throw new Error(`Unexpected response: ${res.statusText}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    userProfile(profile);
  }, [profile]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-myBgDark-lifgtDark rounded-lg shadow-lg p-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          {/* <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
            <img
              src={
                user && user.image
                  ? user.image
                  : "https://via.placeholder.com/100"
              }
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div> */}

          {/* Profile Information */}
          {user ? (
            <div className="text-center mt-4">
              <h1 className="text-2xl font-bold text-slate-100">{user.name}</h1>
              <p className="text-sm text-gray-500">
                Username: @{user.username}
              </p>
              <p className="text-sm text-gray-500">Password: {user.password}</p>
              <p className="text-sm text-slate-100 mt-2">{user.affiliation}</p>
            </div>
          ) : (
            <span>No data found</span>
          )}
        </div>

        {/* Contact or Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Link href={`/editProfile/${id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
              Edit Profile
            </button>
          </Link>

          <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-300">
            Logout
          </button>
        </div>
      </div>
      {/* Loading Dialog */}
      <Loading isOpen={loading} onClose={() => setLoading(false)} />
    </div>
  );
};

export default AdminProfile;
