import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './components/search/search.js';
import './components/search-result/search-result.js';
import './components/keywords/keyword_search.js';
import './components/keywords/suggested_keywords.js';

//import { rps as fakedata, keywrods_suggested } from '../fakedata.js';

import './main.html';

const tplName = 'body',
      tpl = Template[tplName];

 //state variables
const is_loading = new ReactiveVar(false);
const is_started = new ReactiveVar(false);
const error_msg = new ReactiveVar();



const suggestedKeywords = new ReactiveVar();
const resultData = new ReactiveVar();

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
  },

  error_msg () {
    return error_msg.get();
  }
});





tpl.events({
  'click #search-button' (event, tpl) {
    event.stopPropagation();
    const entity1 = tpl.find('#Entity1').value;
    const entity2 = tpl.find('#Entity2').value;
    const keywords = tpl.find('#search-keywords-input').value;

    if(entity1 != '' && entity2 != '') {


      console.log('search event');
      is_loading.set(true);

      //send requst
      //TODO: query validation; Keyword chunk


      const query_data = {
        'entity1': entity1,
        'entity2': entity2,
        'keywords': keywords
      };


      $.ajax({
        url: 'http://172.17.6.173:5000/search',
        type: 'GET',
        data: query_data,
        success: function (response) {
          const response_data = JSON.parse(response);
          const keywrods_suggested = response_data['suggest_keywords'];
          const rps = response_data['ranked_rps'];

          suggestedKeywords.set(keywrods_suggested);

          resultData.set(rps.map((relation_dict) => {
              const keys = Object.keys(relation_dict);
              return {
                key: keys[0],
                value: relation_dict[keys[0]]
              };
          }));


          is_loading.set(false);

        },
        error: function (error) {
          is_loading.set(false);
          error_msg.set(error);
          var dialog = document.querySelector('dialog');
          dialog.showModal();
        }
      });

    }
    else {
      error_msg.set('Query Entity can not be empty!');
      var dialog = document.querySelector('dialog');
      dialog.showModal();
    }

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
