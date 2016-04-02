import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './components/search/search.js';
import './components/search-result/search-result.js';
import './components/keywords/keyword_search.js';
import './components/keywords/suggested_keywords.js';

import { rps as fakedata, keywrods_suggested } from '../fakedata.js';

import './main.html';

const tplName = 'body',
      tpl = Template[tplName];

// state variables
const is_loading = new ReactiveVar(false);
const is_started = new ReactiveVar(false);

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
  },
  isLoading () {
    return is_loading.get();
  },
  isStarted () {
    return is_started.get();
  }
});



tpl.events({
  'click #search-button' (event, tpl) {
    event.stopPropagation();
    const entity1 = tpl.find('#Entity1').value;
    const entity2 = tpl.find('#Entity2').value;
    const keywords = tpl.find('#search-keywords-input').value;

    console.log('search event');
    is_loading.set(true);

    //send requst
    //TODO: query validation; Keyword chunk
    is_loading.set(false);

  },

  'click .search__suggest-keywords__action-add' (event, tpl) {
    const target = event.currentTarget.getAttribute('data-keyword');
    const keywords_input = tpl.find('#search-keywords-input');
    const keywords_materialTextfield = tpl.find('#search-keywords-textfield').MaterialTextfield;
    let keywords_arr = keywords_input.value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    keywords_arr.push(target);
    keywords_materialTextfield.change(keywords_arr.join(','));
  }
});
