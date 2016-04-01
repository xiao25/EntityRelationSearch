import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './search.html';

const tplName = 'search',
      tpl = Template[tplName];

tpl.onCreated(function () {
  // @type {ReactiveVar}
  const suggestedKeywords = this.data.rawData;

  this.data.parsedItems = suggestedKeywords;
});

tpl.helpers({
  suggestedKeywords () {
    return this.parsedItems.get();
  }
});

tpl.events({
  'click .search__suggest-keywords__action-add' (event, tpl) {
    const $keywordsTextField = tpl.find('#search-keywords-input');

  }
});
