import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import ItemClass from './result__item.class.js';

import './result__item.html';

const tplName = 'search_result__item',
      tpl = Template[tplName];

export { ItemClass };
