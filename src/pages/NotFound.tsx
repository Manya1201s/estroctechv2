import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Branded 404 instead of the old silent redirect-to-home, so a stray or
 * outdated link tells the visitor what happened rather than teleporting them.
 * Not indexed — there is nothing here for search engines to rank.
 */
export default function NotFound() {
  useEffect(() => {
    document.title = "ESTROC / 404";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
      document.title = "ESTROC — We Build What Comes Next";
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-5 text-center text-[#f5f5f7]" data-testid="not-found-page">
      <p className="text-xs font-mono uppercase tracking-[0.24em] text-[#ff5500]">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-[-0.06em] text-zinc-100 sm:text-6xl">
        LOST IN THE SYSTEM.
      </h1>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500 sm:text-base">
        The page you're looking for doesn't exist, or has moved.
      </p>
      <Button type="button" className="mt-9" render={<Link to="/" />} data-testid="not-found-home-link">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return to ESTROC
      </Button>
    </div>
  );
}
