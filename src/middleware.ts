import {authMiddleware} from "@clerk/nextjs";

const apiPath = /^.*\/api\/.*$/;
export default authMiddleware({
  publicRoutes: ["/", apiPath]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};