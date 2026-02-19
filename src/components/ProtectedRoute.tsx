import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useFirebaseAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "hsl(var(--background))" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
            style={{
              borderColor: "hsl(var(--border))",
              borderTopColor: "hsl(var(--primary))",
            }}
          />
          <p className="text-muted-foreground text-sm">Loading StreamVault...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
