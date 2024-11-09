<script>
  import { router } from "$data";
  import { findRoute } from "rou3";
  import { createRawSnippet } from "svelte";
  import { normalize, join } from "pathe";

  /**
   * @type {import('../node/types').Route} route
   */
  let route = $derived.by(() => {
    return findRoute(router, "GET", location.pathname)?.data;
  });

  /**
   * @type {import('svelte').Component}
   */
  let RouteComponent = $derived.by(async () => {
    return import(/* @vite-ignore */ normalize(join(route.cwd, route.file)));
  });
</script>

<RouteComponent></RouteComponent>
