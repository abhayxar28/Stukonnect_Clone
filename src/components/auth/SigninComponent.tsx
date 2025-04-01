"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role: string;
    };
  }
}

export default function SignInComponent() {
  const router = useRouter();
  const routerRef = useRef(router);
  const { data: session, status, update } = useSession(); 
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Session status:", status, "Session data:", session);

    if (status === "authenticated" && session?.user?.role === "admin") {
      console.log("✅ User is authenticated and admin, redirecting...");
      routerRef.current.replace("/addmentors");
    }
  }, [status, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

      try {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
        redirect: false,
        });

      console.log("Sign in response:", res);

        if (res?.error) {
        setError(res.error);
        return;
      }

      // Force session update to get latest user role
      await update();
      
      // Use router.replace for client-side navigation
      if (session?.user?.role === "admin") {
        console.log("🔄 Redirecting to /addmentors...");
        routerRef.current.replace("/addmentors");
      } else {
        console.log("🚫 Not an admin, staying on sign-in page.");
        setError("Invalid email or password");
      }

      } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message || "An error occurred during sign-in.");
      } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"}
                `}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
