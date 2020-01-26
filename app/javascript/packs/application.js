require("@rails/ujs").start()
require("turbolinks").start()

import App from '../app.svelte'

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    target: document.getElementById('entry-index'),
    props: {
      name: 'Svelte'
    }
  });

  window.app = app;
});