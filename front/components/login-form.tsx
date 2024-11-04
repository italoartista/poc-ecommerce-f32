'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true when the component mounts on the client side
  }, []);
  const router = isMounted ? useRouter() : null;

  const validateForm = () => {
    if (!email || !password) {
      setError("Both fields are required");
      return false;
    }
    if(!(/\S+@\S+\.\S+/.test(email))){
      setError("Please enter a valid email");
      return false;
    }
    if(password.length < 6){
      setError("Password must have at least 6 characters");
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
        if (router) {
          // Safe to use router.push or other router methods here
          router.push("/dashboard");
        } else {
          console.error("Router is not mounted yet.");
        }

      } catch (error) {
        console.log(error);
        setError('Server error');
      }
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
                type="text"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">Login successful!</div>}
            <Button type="submit" className="w-full">
              Login
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
      </CardContent>
    </Card>
  );
}