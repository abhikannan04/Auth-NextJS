"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error) {
            console.log("Signup failed" );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-10">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-gray-800">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    {loading ? "Processing..." : "Create Your Account"}
                </h1>
                <hr className="mb-6" />
                
                <label htmlFor="username" className="block font-medium mb-2">Username</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-600 text-gray-800"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                />

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
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    className={`w-full py-2 rounded-lg text-white ${
                        buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    } font-semibold transition duration-300 ease-in-out`}
                >
                    {buttonDisabled ? "Fill All Fields" : "Sign Up"}
                </button>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
