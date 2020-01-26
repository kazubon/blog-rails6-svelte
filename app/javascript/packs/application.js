import "core-js/stable";
import "regenerator-runtime/runtime";

require("@rails/ujs").start();
require("turbolinks").start();

import EntryIndex from '../entries/index';
import EntryForm from '../entries/form';
import EntryStar from '../entries/star';
import Flash from '../flash';

document.addEventListener('turbolinks:visit', () => {
  if(window.svelteApp) {
    window.svelteApp.$destroy();
    window.svelteApp = null;
  }
});

document.addEventListener('turbolinks:load', () => {
  Flash.show();

  let apps = [
    { elem: '#entry-index', object: EntryIndex },
    { elem: '#entry-form', object: EntryForm },
    { elem: '#entry-star', object: EntryStar }
  ];

  let props = window.jsProps || {};
  apps.forEach((app) => {
    if($(app.elem).length) {
      window.svelteApp = new app.object({ target: $(app.elem)[0], props });
    }
  });
});
