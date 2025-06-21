'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { isAllowed } from '@/lib/auth';
interface UserDetails {
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
export default function UserDetailsPage() {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
    if (!isAllowed()) {
      router.push('/dashboard');
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await fetch(`https:        if (!res.ok) {
          throw new Error('Failed to fetch user');
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
  }, [userId, router]);
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>User not found</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Dashboard
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {user.name}</p>
              <p><span className="font-medium">Username:</span> {user.username}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
              <p><span className="font-medium">Website:</span> {user.website}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Address</h2>
            <div className="space-y-2">
              <p>{user.address.street}</p>
              <p>{user.address.suite}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
              <p>Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Company</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {user.company.name}</p>
              <p><span className="font-medium">Catch Phrase:</span> {user.company.catchPhrase}</p>
              <p><span className="font-medium">BS:</span> {user.company.bs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
