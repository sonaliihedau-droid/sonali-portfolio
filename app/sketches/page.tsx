import { redirect } from "next/navigation";

// Sketches live in the Sketchbook on the home page now; keep old /sketches links working.
export default function SketchesPage() {
  redirect("/#sketchbook");
}
