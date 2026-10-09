import { redirect } from "next/navigation";

// Projects live on the home page now; keep old /projects links working.
export default function ProjectsPage() {
  redirect("/#projects");
}
