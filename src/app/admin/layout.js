'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (status === 'authenticated' && session?.user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Simple Admin Sidebar */}
        <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:block">
          <div className="p-6">
            <h2 className="text-xl font-bold text-purple-600">Admin Dashboard</h2>
          </div>
          <nav className="mt-6">
            <Link href="/admin" className="block px-6 py-3 text-purple-600 bg-purple-50 font-medium">
              Overview
            </Link>
            <Link href="/" className="block px-6 py-3 text-gray-600 hover:bg-gray-50">
              Return to Site
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  return null;
}
