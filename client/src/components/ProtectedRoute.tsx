import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  requiredRole?: "admin" | "customer";
  path?: string;
}

export default function ProtectedRoute({
  component: Component,
  requiredRole,
  ...rest
}: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        // If no token or user data, redirect to login
        if (!token || !userStr) {
          console.log("No token found, redirecting to login");
          setLocation("/login");
          setIsLoading(false);
          return;
        }

        // Parse user data
        let user;
        try {
          user = JSON.parse(userStr);
        } catch (e) {
          console.error("Error parsing user data", e);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setLocation("/login");
          setIsLoading(false);
          return;
        }

        // Check role if required
        if (requiredRole && user.role !== requiredRole) {
          console.log(
            `Role mismatch. Required: ${requiredRole}, Found: ${user.role}`
          );
          setLocation("/");
          setIsLoading(false);
          return;
        }

        // Validate token with backend (optional but recommended for security)
        try {
          const response = await fetch("/api/auth/verify", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.log("Token validation failed, redirecting to login");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setLocation("/login");
            setIsLoading(false);
            return;
          }
        } catch (e) {
          // If verify endpoint doesn't exist yet, just allow based on localStorage
          // This is a graceful fallback
          console.warn("Could not verify token with backend:", e);
        }

        // All checks passed
        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLocation("/login");
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setLocation, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect via useEffect
  }

  return <Component {...rest} />;
}