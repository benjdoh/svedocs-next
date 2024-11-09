import Entry from "./entry.svelte";
import { mount } from "svelte";

async function startApp() {
  mount(Entry, {
    target: document.body,
  });
}

startApp();
