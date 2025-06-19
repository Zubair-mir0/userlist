import Link from 'next/link';
import { notFound } from 'next/navigation';

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

const UserDetailPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  
  if (!res.ok) return notFound();

  const user: User = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">User Detail</h1>

        <div className="space-y-4 text-gray-700">
          <div><span className="font-semibold">Name:</span> {user.name}</div>
          <div><span className="font-semibold">Username:</span> {user.username}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Phone:</span> {user.phone}</div>
          <div><span className="font-semibold">Website:</span> <a href={`http://${user.website}`} target="_blank" className="text-blue-600 hover:underline">{user.website}</a></div>

          <div>
            <span className="font-semibold">Address:</span>
            <p className="ml-4">
              {user.address.suite}, {user.address.street},<br />
              {user.address.city} - {user.address.zipcode}
              <br />
              <small className="text-gray-500">Geo: {user.address.geo.lat}, {user.address.geo.lng}</small>
            </p>
          </div>

          <div>
            <span className="font-semibold">Company:</span>
            <p className="ml-4">
              <strong>{user.company.name}</strong><br />
              <em className="text-gray-600">{user.company.catchPhrase}</em><br />
              <span className="text-sm text-gray-500">{user.company.bs}</span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/users">
            <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              ← Back to Users
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
