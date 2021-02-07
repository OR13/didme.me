import { Home } from "./home";
import { Issue } from "./issue";
import { Derive } from "./derive";
import { Verify } from "./verify";
import { Resolver } from "./resolver";

export const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/issue", exact: true, component: Issue },
  { path: "/derive", exact: true, component: Derive },
  { path: "/verify", exact: true, component: Verify },
  { path: "/:did", exact: true, component: Resolver },
];
