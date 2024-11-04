
import { InlineConfig } from "vite"
import { RouterContext } from "rou3";

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
}

export type SiteConfig = Omit<UserConfig, 'vite'> & {
    router: RouterContext<Route>
}