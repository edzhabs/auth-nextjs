"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast/headless";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successfully.");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 1 && user.password.length > 1) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-2xl text-center">
        {loading ? "Logging in.." : "Login"}
      </h1>
      <label htmlFor="email">email</label>
      <input
        className="p-2 border rounded-lg border-gray-300 mb-4 text-black focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border rounded-lg border-gray-300 mb-4 text-black focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onLogin}
        disabled={loading}
        className="p-2 border rounded-lg border-gray-300 mb-4 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Logging in.." : "Login"}
      </button>
      <Link href="/signup">Click here to Signup</Link>
    </div>
  );
}
