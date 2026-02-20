import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DbMovie } from "@/types/movie";
import { supabase } from "@/integrations/supabase/client";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import Navbar from "@/components/Navbar";

const ROW_CATEGORIES = [
  { key: "trending", label: "🔥 Trending Now" },
  { key: "action", label: "🎬 Action & Adventure" },
  { key: "thriller", label: "😱 Thrillers & Horror" },
  { key: "acclaimed", label: "🌟 Critically Acclaimed" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<DbMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setMovies(data as DbMovie[]);
      }
      setLoading(false);
    }
    fetchMovies();
  }, []);

  const featuredMovie = movies.find((m) => m.featured) ?? movies[0] ?? null;

  const movieRows = ROW_CATEGORIES.map((cat) => ({
    label: cat.label,
    movies: movies.filter((m) => m.row_category === cat.key),
  })).filter((row) => row.movies.length > 0);

  const handleMovieClick = (movie: DbMovie) => {
    navigate(`/watch/${movie.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--background))" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading your movies…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar />

      {/* Hero */}
      {featuredMovie && (
        <HeroBanner
          movie={featuredMovie}
          onPlay={() => handleMovieClick(featuredMovie)}
        />
      )}

      {/* Movie rows */}
      <div className="pb-16 -mt-8 relative z-10">
        {movieRows.map((row) => (
          <MovieRow
            key={row.label}
            title={row.label}
            movies={row.movies}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-muted-foreground text-sm border-t border-border/30">
        <p>© 2024 StreamVault. All rights reserved.</p>
      </footer>
    </div>
  );
}
