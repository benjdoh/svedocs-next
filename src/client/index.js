import Entry from "./entry.svelte";
import { mount } from "svelte";

async function startApp() {
  console.log("hello");

  mount(Entry, {
    target: document.body,
  });
}

startApp();
