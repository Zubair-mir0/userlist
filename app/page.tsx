'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Transform your ideas into reality with our powerful tools and seamless experience.
            Join thousands of satisfied users today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200 text-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Easy to Use',
              description: 'Intuitive interface that makes managing your tasks a breeze.'
            },
            {
              title: 'Powerful Features',
              description: 'All the tools you need to be productive and organized.'
            },
            {
              title: 'Secure & Private',
              description: 'Your data is protected with enterprise-grade security.'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
