import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Auth routes (unauthenticated)
  layout("routes/auth/layout.tsx", [
    route("auth/login", "routes/auth/login.tsx"),
    route("auth/signup", "routes/auth/signup.tsx"),
    route("auth/callback", "routes/auth/callback.tsx"),
  ]),

  // App routes (authenticated)
  layout("routes/app/layout.tsx", [route("feed", "routes/app/feed.tsx")]),
] satisfies RouteConfig;
