import { Home } from "./home";
import { Issue } from "./issue";
import { Verify } from "./verify";
import { Resolver } from "./resolver";

export const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/issue", exact: true, component: Issue },
  { path: "/verify", exact: true, component: Verify },
  { path: "/:did", exact: true, component: Resolver },
];
