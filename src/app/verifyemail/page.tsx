"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(true);
      console.log("Error verifying email", err.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Verify Email</h1>
      <h2 className="p-4 rounded-md bg-orange-500 text-black text-lg font-semibold mb-6 shadow-md">
        {token ? `${token}` : "No token available"}
      </h2>

      {verified && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">Email Verified</h2>
          <Link href="/login">
            <button className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      )}
      {error && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold bg-red-500 text-black rounded-md p-2 mb-4 shadow-md">
            Error Verifying Email
          </h2>
        </div>
      )}
    </div>
  );
}
