import { useState } from "react";
import { Play, Search, Bell, LogOut, User, Menu, X } from "lucide-react";
import { useFirebaseAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, signOut } = useFirebaseAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const initial = user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 lg:px-16 py-4 flex items-center justify-between transition-all duration-300"
      style={{
        background: "linear-gradient(to bottom, hsl(0 0% 0% / 0.8) 0%, transparent 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Play className="w-4 h-4 fill-primary-foreground text-primary-foreground ml-0.5" />
        </div>
        <span className="font-display text-2xl tracking-widest text-foreground hidden sm:block">
          STREAMVAULT
        </span>
        <span className="font-display text-xl tracking-widest text-foreground sm:hidden">
          SV
        </span>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">Home</a>
        <a href="#" className="hover:text-foreground transition-colors">Movies</a>
        <a href="#" className="hover:text-foreground transition-colors">Series</a>
        <a href="#" className="hover:text-foreground transition-colors">My List</a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1 hidden sm:block">
          <Bell className="w-5 h-5" />
        </button>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all hover:ring-2 hover:ring-primary"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            {initial}
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 top-11 w-52 rounded-lg border border-border py-2 z-50"
              style={{ background: "hsl(var(--card))" }}
            >
              <div className="px-4 py-2 border-b border-border mb-1">
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => { signOut(); setShowUserMenu(false); }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
