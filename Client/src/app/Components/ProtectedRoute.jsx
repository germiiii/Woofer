'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (pathname !== '/' && pathname !== '/register' && pathname !== '/aditionalForm' && pathname !=='/forget-password' && pathname !=='/forget-password' && pathname !== '/changePassword/:token' && !token) {
      router.push('/login');
    } 
  }, [pathname, router]);

  return <>{children}</>
};

export default ProtectedRoute;