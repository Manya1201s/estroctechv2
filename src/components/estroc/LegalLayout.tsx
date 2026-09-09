import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

/** Shared shell for the standalone legal pages — no motion, no JS-dependent
 * content, so it reads and indexes fine even if a script fails to load. */
export default function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  useEffect(() => {
    document.title = `ESTROC / ${title}`;
    return () => {
      document.title = "ESTROC — We Build What Comes Next";
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f5f7]" data-testid="legal-page">
      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex h-[72px] max-w-3xl items-center px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-[#ff5500]" data-testid="legal-back-link">
            <ArrowLeft className="h-4 w-4" />
            ESTROC
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#ff5500]">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-zinc-100 sm:text-5xl">{title}</h1>
        <p className="mt-3 text-xs font-mono uppercase tracking-wider text-zinc-600">Last updated {updated}</p>

        <div className="prose-legal mt-12 space-y-8 text-sm leading-relaxed text-zinc-400 sm:text-base [&_a]:text-[#ff5500] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-100 [&_h2]:sm:text-2xl [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </main>
    </div>
  );
}
