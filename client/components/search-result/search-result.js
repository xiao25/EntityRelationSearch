import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import { ItemClass } from './result__item.js';

import './search-result.html';

const tplName = 'search_result',
      tpl = Template[tplName];

let $selectedItem = null;

const itemIsSelected = ($ele) => $ele.hasClass('search-result__item--active');

const deselectItem = ($ele) => {
  $ele.addClass('mdl-shadow--2dp');
  $ele.removeClass('search-result__item--active mdl-shadow--4dp');
};

const selectItem = ($ele = null) => {
  if ($selectedItem) {
    deselectItem($selectedItem);
    $selectedItem = null;
  }
  if ($ele) {
    $ele.addClass('search-result__item--active mdl-shadow--4dp');
    $ele.removeClass('mdl-shadow--2dp');
    $selectedItem = $ele;
  }
};

tpl.onCreated(function () {
  // @type ReactiveVar
  const resultData = this.data.rawData;

  this.data.parsedItems = new ReactiveVar([]);

  this.autorun((comp) => {
    const parsedItems = resultData.get().map((rawItem) => new ItemClass(rawItem));
    this.data.parsedItems.set(parsedItems);
  });

});

tpl.helpers({
  listItems () {
    return this.parsedItems.get();
  }
});

tpl.events({
  'click #search-result' (event, tpl) {
    selectItem(null);
  },
  'click .search-result__item' (event, tpl) {
    event.stopPropagation();
    const $target = $(event.currentTarget);
    if (!itemIsSelected($target)) {
      selectItem($target);
    }
  }
});