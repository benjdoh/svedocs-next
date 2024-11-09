
import { InlineConfig } from "vite"
import { RouterContext } from "rou3";
import { mdsvex } from "mdsvex";
import { SvelteConfig } from "@sveltejs/vite-plugin-svelte";
import { SvelteComponent } from "svelte";

export type Route = {
    file: string
}

export type UserConfig = {
    vite?: InlineConfig
    head?: {
        title?: string
        description?: string
    },
    layouts?: {
        routes?: string[]
        component?: string
    }
    svelte?: SvelteConfig
    mdsvex?: Parameters<typeof mdsvex>[0]
}

export type SiteConfig = Omit<UserConfig, 'vite'> & {
    router: RouterContext<Route>
    component: SvelteComponent
    cwd: string
}