import { authRoutes } from "../auth/routes/auth-routes";
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
  }
}
