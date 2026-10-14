"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type VideoEmbedProps = {
  title: string;
  src?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  caption?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
};

export function VideoEmbed({
  title,
  src,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  playsInline = true,
  caption,
  className,
  aspectRatio = "16/9",
}: VideoEmbedProps) {
  const [mediaState, setMediaState] = useState<{ src?: string; status: "ready" | "error" }>({ status: "ready" });
  const status = mediaState.src === src ? mediaState.status : "loading";
  // The browser may finish loading server-rendered media before hydration attaches events.
  const attachVideo = useCallback((video: HTMLVideoElement | null) => {
    if (video?.error) setMediaState({ src, status: "error" });
    else if (video && video.readyState >= 2) setMediaState({ src, status: "ready" });
  }, [src]);
  const localVideo = Boolean(src && (/^\/(?!\/)/.test(src) || /\.(webm|mp4|ogg)(?:[?#]|$)/i.test(src)));
  const aspectClass =
    aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "1/1"
        ? "aspect-square"
        : "aspect-video";

  return (
    <figure
      className={cn(
        "group overflow-hidden rounded-xl border border-border bg-midnight text-white shadow-lg",
        className,
      )}
    >
      <div className={cn("relative w-full bg-black/70", aspectClass)}>
        {src && localVideo ? (
          <>
            <video
              key={src}
              ref={attachVideo}
              src={src}
              poster={poster}
              title={title}
              aria-label={title}
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              controls={controls}
              playsInline={playsInline}
              preload={autoPlay ? "auto" : "metadata"}
              onLoadedData={() => setMediaState({ src, status: "ready" })}
              onPlaying={() => setMediaState({ src, status: "ready" })}
              onError={() => setMediaState({ src, status: "error" })}
              className="size-full object-contain"
            >
              Your browser does not support this video. <a href={src}>Open the walkthrough</a>.
            </video>
            {status !== "ready" ? (
              <div role="status" className="pointer-events-none absolute inset-x-4 top-4 mx-auto w-fit rounded-lg bg-zinc-900/90 px-4 py-2 text-sm text-white">
                {status === "error" ? "Walkthrough unavailable. Explore the interactive demo below." : "Loading walkthrough…"}
              </div>
            ) : null}
          </>
        ) : src ? (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center p-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full border border-primary-light/40 bg-primary/20 text-primary-light transition-transform duration-300 group-hover:scale-105">
              <svg
                className="ml-1 size-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="mt-4 text-base font-semibold text-white">{title}</p>
            <p className="mt-1 max-w-[45ch] text-xs text-white/65">
              Video walkthrough slot · Recording not yet published
            </p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="border-t border-white/10 bg-white/[0.04] px-5 py-3.5 text-xs leading-5 text-white/70">
          <span className="font-semibold text-primary-light">Walkthrough: </span>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
