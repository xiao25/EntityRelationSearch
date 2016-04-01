import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './components/search/search.js';
import './components/search-result/search-result.js';

import { rps as fakedata, keywrods_suggested } from '../fakedata.js';

import './main.html';

const tplName = 'body',
      tpl = Template[tplName];

const suggestedKeywords = new ReactiveVar(keywrods_suggested);

const resultData = new ReactiveVar(Object.keys(fakedata).map((key) => {
  return {
    key,
    value: fakedata[key]
  };
}));

tpl.helpers({
  suggestedKeywords () {
    return suggestedKeywords;
  },
  resultData () {
    return resultData;
  }
});

/*

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
