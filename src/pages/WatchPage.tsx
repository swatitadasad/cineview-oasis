import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DbMovie } from "@/types/movie";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Loader2,
} from "lucide-react";

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [movie, setMovie] = useState<DbMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("movies")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setMovie(data as DbMovie);
        setLoading(false);
      });
  }, [id]);

  // Auto-hide controls
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
    resetControlsTimer();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "hsl(var(--background))" }}
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "hsl(var(--background))" }}
      >
        <p className="text-muted-foreground">Movie not found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-primary hover:underline text-sm"
        >
          ← Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* ── Video section ── */}
      <div
        className="relative w-full bg-black"
        style={{ aspectRatio: "16/9", maxHeight: "75vh" }}
        onMouseMove={resetControlsTimer}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={movie.video_url ?? undefined}
          poster={movie.thumbnail ?? undefined}
          className="w-full h-full object-contain"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Controls overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 transition-opacity duration-300"
          style={{
            opacity: showControls ? 1 : 0,
            background:
              "linear-gradient(to bottom, hsl(0 0% 0% / 0.6) 0%, transparent 30%, transparent 70%, hsl(0 0% 0% / 0.7) 100%)",
            pointerEvents: showControls ? "auto" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
            <span className="text-foreground font-semibold text-sm sm:text-base truncate">
              {movie.title}
            </span>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "hsl(var(--foreground))" }}
            >
              {playing ? (
                <Pause className="w-5 h-5" style={{ color: "hsl(var(--background))" }} />
              ) : (
                <Play
                  className="w-5 h-5 fill-current ml-0.5"
                  style={{ color: "hsl(var(--background))" }}
                />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <div className="flex-1" />

            <button
              onClick={handleFullscreen}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Movie details ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
            <div className="rounded-xl overflow-hidden aspect-[2/3] shadow-2xl">
              <img
                src={
                  movie.thumbnail ??
                  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
              {movie.title.toUpperCase()}
            </h1>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {movie.year && (
                <span className="text-sm font-semibold text-green-400">{movie.year}</span>
              )}
              {movie.rating && (
                <span className="text-xs border border-border rounded px-2 py-0.5 text-muted-foreground">
                  {movie.rating}
                </span>
              )}
              {movie.duration && (
                <span className="text-sm text-muted-foreground">{movie.duration}</span>
              )}
              {movie.genre && (
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "hsl(var(--primary) / 0.15)",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--primary) / 0.3)",
                  }}
                >
                  {movie.genre}
                </span>
              )}
            </div>

            <p className="text-foreground/80 text-base leading-relaxed mb-8">
              {movie.description}
            </p>

            {/* Play button */}
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-8 py-3 rounded-md font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                background: "hsl(var(--foreground))",
                color: "hsl(var(--background))",
              }}
            >
              {playing ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
