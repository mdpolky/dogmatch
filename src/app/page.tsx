"use client";
import React, { useState } from "react";
import fetchClient from "../client";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  //name and email should be "" but let's pre-fill to allow for easy demos
  const [name, setName] = useState("Demo Account");
  const [email, setEmail] = useState("ClickLogin@gmail.com");
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchClient("POST", "/auth/login", {
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      router.push("/dogs");
    } catch (error) {
      console.error("Error while logging in:", error);
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src="https://res.cloudinary.com/dnxa7tvty/image/upload/v1693584268/dogfetch/mdp_dogfetch_name_logo.png"
        alt="DogFetch Logo"
        className="w-full max-w-md mb-4"
      />
      <div className=" w-full max-w-sm bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login />
    </main>
  );
}
