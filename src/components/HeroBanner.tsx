import { Play, Info } from "lucide-react";
import { DbMovie } from "@/types/movie";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroBannerProps {
  movie: DbMovie;
  onPlay: () => void;
}

export default function HeroBanner({ movie, onPlay }: HeroBannerProps) {
  return (
    <div className="relative w-full" style={{ height: "clamp(400px, 60vw, 680px)" }}>
      {/* Background image — use movie thumbnail or fallback */}
      <img
        src={movie.thumbnail ?? heroBanner}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
          {/* Genre badge */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Featured
            </span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              {movie.genre}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-shadow-lg mb-3 text-foreground"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1 }}
          >
            {movie.title.toUpperCase()}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-green-400">{movie.year}</span>
            <span className="text-xs border border-muted-foreground/50 rounded px-1.5 py-0.5 text-muted-foreground">
              {movie.rating}
            </span>
            <span className="text-sm text-muted-foreground">{movie.duration}</span>
          </div>

          {/* Description */}
          <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 text-shadow-lg">
            {movie.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onPlay}
              className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105"
              style={{
                background: "hsl(var(--foreground))",
                color: "hsl(var(--background))",
              }}
            >
              <Play className="w-5 h-5 fill-current" />
              Play
            </button>
            <button
              onClick={onPlay}
              className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105"
              style={{ background: "hsl(0 0% 100% / 0.2)", color: "hsl(var(--foreground))" }}
            >
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
