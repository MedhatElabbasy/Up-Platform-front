import { authRoutes } from "../auth/routes/auth-routes";
import { clubRoutes } from "../club/routes/club-routes";
import { projectsRoutes } from "../projects/routes/projects-routes";
import { servicesRoutes } from "../services/routes/services-routes";
import { trainingRoutes } from "../training/routes/training-routes";

export const Routing = {
  home: {
    module: 'home',
  },
  Auth: {
    module: 'auth',
    children: authRoutes
  },
  Training: {
    module: 'training',
    children: trainingRoutes
  },
  Club: {
    module: 'club',
    children: clubRoutes
  },
  services:{
    module:'services',
    children:servicesRoutes
  },
  projects:{
    module:'projects',
    children:projectsRoutes
  }
} 
