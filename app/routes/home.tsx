import { redirect } from "react-router"
import type { Route } from "./+types/home"

export function loader({ request }: Route.LoaderArgs) {
  return redirect("/dashboard")
}

export default function Home() {
  return null
}
