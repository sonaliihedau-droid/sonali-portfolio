import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sketches — Sonali",
};

export default function SketchesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-8 sm:pt-32">
      <h1 className="font-display text-3xl font-bold text-[#5A83BB] sm:text-4xl">Sketches</h1>
    </main>
  );
}
