import { useState } from "react";
import { Movie } from "@/data/movies";
import { MOVIE_ROWS, FEATURED_MOVIE } from "@/data/movies";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import VideoPlayer from "@/components/VideoPlayer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar />

      {/* Hero */}
      <HeroBanner
        movie={FEATURED_MOVIE}
        onPlay={() => setSelectedMovie(FEATURED_MOVIE)}
      />

      {/* Movie rows */}
      <div className="pb-16 -mt-8 relative z-10">
        {MOVIE_ROWS.map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            movies={row.movies}
            onMovieClick={setSelectedMovie}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-muted-foreground text-sm border-t border-border/30">
        <p>© 2024 StreamVault. All rights reserved.</p>
      </footer>

      {/* Video player modal */}
      {selectedMovie && (
        <VideoPlayer
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
