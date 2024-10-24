<<<<<<< HEAD
'use client';
import Link from "next/link"
import { useRouter } from "next/navigation"; 

import { useState } from "react"
import { Button } from "@/components/ui/button"
=======
'use client'

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
>>>>>>> main
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  id: number;
  email: string;
  username: string;
}

export function LoginForm() {
<<<<<<< HEAD
  const router = useRouter();
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  

  const validate = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    if (validate()) {
      try {
        const senha = password;
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }
  
        const data = await response.json();
        setUser(data.email);
        setToken(data.token);
        setIsAuthenticated(true);
        setSuccess(true);
        router.push("/");
      } catch (error) {
        setError(error.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
=======
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      setError("Both fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          throw new Error('Server error');
        }

        const data = await response.json();
        console.log('Server response:', data);

        setEmail("");
        setPassword("");
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setError('Server error');
      }
>>>>>>> main
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
<<<<<<< HEAD
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
=======
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
>>>>>>> main
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
<<<<<<< HEAD
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
=======
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">Login successful!</div>}
            <Button type="submit" className="w-full">
              Login
>>>>>>> main
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </form>
<<<<<<< HEAD
        {success && <p className="text-green-500">Login successful</p>}
        {isAuthenticated && user && (
          <div className="mt-4 text-center">
            <p>Welcome, {user.email}!</p>
            <p>Your token: {token}</p>
          </div>
        )}
=======
>>>>>>> main
      </CardContent>
    </Card>
  );
}