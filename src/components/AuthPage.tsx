import { useState } from "react";
import { useFirebaseAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Play } from "lucide-react";

interface AuthPageProps {
  mode: "login" | "signup";
  onToggleMode: () => void;
}

export default function AuthPage({ mode, onToggleMode }: AuthPageProps) {
  const { signIn, signUp } = useFirebaseAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: "radial-gradient(ellipse at center, hsl(0 0% 10%) 0%, hsl(0 0% 3%) 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-5 h-5 fill-primary-foreground text-primary-foreground ml-0.5" />
          </div>
          <span className="font-display text-3xl tracking-widest text-foreground">
            STREAMVAULT
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-xl p-8 border border-border/50"
          style={{ background: "hsl(0 0% 9% / 0.95)", backdropFilter: "blur(12px)" }}
        >
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            {mode === "login"
              ? "Sign in to continue watching"
              : "Start streaming thousands of movies & shows"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80 text-sm">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-11 focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/80 text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"}
                  minLength={6}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-11 pr-10 focus:border-primary focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-[1.01]"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {mode === "login" ? "New to StreamVault?" : "Already have an account?"}
              {" "}
              <button
                onClick={onToggleMode}
                className="text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
              >
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
