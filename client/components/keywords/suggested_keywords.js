import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './suggested_keywords.html';

const tplName = 'suggested_keywords',
      tpl = Template[tplName];

tpl.onCreated(function () {
  // @type {ReactiveVar}
  const suggestedKeywords = this.data.rawData;

  this.data.parsedItems = new ReactiveVar([]);

  this.autorun((comp) => {

     if (suggestedKeywords.get() != undefined) {

        this.data.parsedItems.set(suggestedKeywords.get().map((w) => {
            return {
              word: w,
              isSelected: false
            };
      }));
    }
  });
});

tpl.helpers({
  suggestedKeywords () {
    return this.parsedItems.get();
  }
});

tpl.events({
  'click .search__suggest-keywords__action-add' (event, tpl) {
    const keyword = event.currentTarget.getAttribute('data-keyword');
    tpl.data.parsedItems.set(tpl.data.parsedItems.get().map((kw) => {
      return (kw.word !== keyword) ? kw : {
        ...kw,
        isSelected: true
      };
    }));
  }
});