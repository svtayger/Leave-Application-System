"use client"

import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"

export default function ManagerCreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      setMessage('User created successfully!');
      setFormData({ name: '', email: '', password: '', role: 'user' });
    } catch (error: any) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <DashboardLayout userRole="manager">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New User</h1>

        <Tabs defaultValue="create-user" className="w-full">
          <TabsList>
            <TabsTrigger value="create-user">Create User</TabsTrigger>
          </TabsList>

          <TabsContent value="create-user" className="mt-6">
            <Card>
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                <CardTitle>Create New User</CardTitle>
                <CardDescription>Fill in the details to create a new user.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-1 font-medium">Role</label>
                    <select
                      name="role"
                      className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                  >
                    Create User
                  </button>

                  {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}