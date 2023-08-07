"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
useRouter;

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.username.length > 1 &&
      user.email.length > 1 &&
      user.password.length > 1
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-2xl text-center">
        {loading ? "Proccessing.." : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border rounded-lg border-gray-300 mb-4 text-black focus:outline-none focus:border-gray-600"
        type="text"
        name="username"
        id="username"
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border rounded-lg border-gray-300 mb-4 text-black focus:outline-none focus:border-gray-600"
        type="email"
        name="email"
        id="email"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border rounded-lg border-gray-300 mb-4 text-black focus:outline-none focus:border-gray-600"
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onSignup}
        disabled={loading || buttonDisabled}
        className="p-2 border rounded-lg border-gray-300 mb-4 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Saving.." : "Signup"}
      </button>
      <Link href="/login">Click here to login</Link>
    </div>
  );
}
