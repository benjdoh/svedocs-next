import { RouterContext } from "rou3";
import { Route } from "../node/types";

declare module "$data" {
  export const router: RouterContext<Route>;
}
