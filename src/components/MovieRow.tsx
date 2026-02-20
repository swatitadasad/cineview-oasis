import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { DbMovie } from "@/types/movie";

interface MovieRowProps {
  title: string;
  movies: DbMovie[];
  onMovieClick: (movie: DbMovie) => void;
}

export default function MovieRow({ title, movies, onMovieClick }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="mb-8">
      <h2 className="text-base sm:text-lg font-bold text-foreground mb-3 px-6 sm:px-12 lg:px-16">
        {title}
      </h2>

      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          style={{ background: "hsl(0 0% 0% / 0.8)", border: "1px solid hsl(var(--border))" }}
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Movie strip */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-6 sm:px-12 lg:px-16"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card flex-shrink-0"
              style={{
                width: "clamp(130px, 18vw, 200px)",
                scrollSnapAlign: "start",
              }}
              onClick={() => onMovieClick(movie)}
            >
              {/* Poster */}
              <div className="aspect-[2/3] bg-secondary">
                <img
                  src={movie.thumbnail ?? "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlay on hover */}
              <div className="card-overlay flex flex-col justify-end p-3">
                <div className="flex items-center gap-1 mb-1">
                  <button
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(var(--foreground))" }}
                  >
                    <Play
                      className="w-3.5 h-3.5 fill-current"
                      style={{ color: "hsl(var(--background))" }}
                    />
                  </button>
                </div>
                <p className="text-foreground text-xs font-semibold line-clamp-1">{movie.title}</p>
                <p className="text-muted-foreground text-xs">
                  {movie.year} · {movie.genre}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          style={{ background: "hsl(0 0% 0% / 0.8)", border: "1px solid hsl(var(--border))" }}
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}
