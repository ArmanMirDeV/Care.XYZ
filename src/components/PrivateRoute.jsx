'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PrivateRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    const redirect = pathname || '/';
    router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
    return null;
  }

  return <>{children}</>;
}
