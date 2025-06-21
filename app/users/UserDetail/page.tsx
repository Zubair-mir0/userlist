'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Dashboard
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Username</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <Link
                      href={`/users/${user.id}`}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
