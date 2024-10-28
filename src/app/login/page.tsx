"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile"); // Redirect to the dashboard after login
        } catch (error) {
            console.log("Login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-10">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-gray-800">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    {loading ? "Processing..." : "Login to Your Account"}
                </h1>
                <hr className="mb-6" />

                <label htmlFor="email" className="block font-medium mb-2">Email Address</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-600 text-gray-800"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />

                <label htmlFor="password" className="block font-medium mb-2">Password</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-purple-600 text-gray-800"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />

                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    className={`w-full py-2 rounded-lg text-white ${
                        buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    } font-semibold transition duration-300 ease-in-out`}
                >
                    {buttonDisabled ? "Fill All Fields" : "Log In"}
                </button>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
