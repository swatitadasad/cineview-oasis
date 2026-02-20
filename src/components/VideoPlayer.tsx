import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { DbMovie } from "@/types/movie";

interface VideoPlayerProps {
  movie: DbMovie;
  onClose: () => void;
}

export default function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Auto-play
    videoRef.current?.play().catch(() => {});

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "hsl(0 0% 0% / 0.9)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-5xl mx-4 rounded-xl overflow-hidden border border-border/30"
        style={{ boxShadow: "0 25px 80px hsl(0 0% 0% / 0.8)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "hsl(0 0% 0% / 0.7)" }}
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Video */}
        <div className="aspect-video bg-black">
          <video
            ref={videoRef}
            src={movie.video_url ?? undefined}
            controls
            className="w-full h-full"
            poster={movie.thumbnail ?? undefined}
          />
        </div>

        {/* Movie info bar */}
        <div className="p-5" style={{ background: "hsl(var(--card))" }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground truncate">{movie.title}</h2>
              <div className="flex items-center gap-3 mt-1 mb-2">
                <span className="text-primary text-sm font-semibold">{movie.year}</span>
                <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                  {movie.rating}
                </span>
                <span className="text-muted-foreground text-sm">{movie.duration}</span>
                <span className="text-muted-foreground text-sm">{movie.genre}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
