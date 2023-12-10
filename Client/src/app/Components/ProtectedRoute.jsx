"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (
      pathname !== "/" &&
      !isActivateRoute(pathname) &&
      pathname !== "/register" &&
      pathname !== "/aditionalForm" &&
      pathname !== "/forget-password" &&
      !isChangePasswordRoute(pathname) && // Comprobación para la ruta dinámica
      !token
    ) {
      router.push("/login");
    }
  }, [pathname, router]);

  // Función de utilidad para verificar si la ruta es "/changePassword/[token]"
  const isChangePasswordRoute = (path) => path.startsWith("/changePassword/");
  const isActivateRoute = (path) => path.startsWith("/activate/");

  // Renderiza children independientemente de si hay un token o no
  return <>{children}</>;
};

export default ProtectedRoute;
