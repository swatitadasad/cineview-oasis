import { useState } from "react";
import AuthPage from "@/components/AuthPage";
import HomePage from "@/pages/HomePage";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

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
    return (
      <AuthPage
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
      />
    );
  }

  return <HomePage />;
};

export default Index;
