'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = Array.isArray(params.id) ? params.id[0] : params.id;
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!res.ok) {
          throw new Error('User not found');
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError('Failed to load user details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'User not found'}</p>
          <button
            onClick={() => router.push('/users/UserDetail')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">User Detail</h1>
        <div className="space-y-4 text-gray-700">
          <div><span className="font-semibold">Name:</span> {user.name}</div>
          <div><span className="font-semibold">Username:</span> {user.username}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Phone:</span> {user.phone}</div>
          <div><span className="font-semibold">Website:</span> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.website}</a></div>
          {user.address && (
            <div>
            <span className="font-semibold">Address:</span>
            <p className="ml-4">
              {user.address.suite}, {user.address.street},<br />
              {user.address.city} - {user.address.zipcode}
              <br />
              <small className="text-gray-500">
                Geo: {user.address.geo.lat}, {user.address.geo.lng}
              </small>
            </p>
          </div>
          )}
          {user.company && (
            <div>
              <span className="font-semibold">Company:</span>
              <p className="ml-4">
                <strong>{user.company.name}</strong><br />
                <em className="text-gray-600">{user.company.catchPhrase}</em><br />
                <span className="text-sm text-gray-500">{user.company.bs}</span>
              </p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Link href="/users/UserDetail">
            <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              ← Back to Users
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
