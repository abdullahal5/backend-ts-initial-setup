import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.route";
import { RecuiterRoutes } from "../modules/recruiter/recruiter.routes";
import { JobSeekerRoutes } from "../modules/jobSeeker/jobSeeker.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/recuiter",
    route: RecuiterRoutes,
  },
  {
    path: "/job-seeker",
    route: JobSeekerRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
