export default class SearchResultItem {
  // @param {{key: String, value: Object}} rawData
  constructor (rawData) {
    this._relation = rawData.key;
    // @type {{tokens: Array.<Object>, link: String}}
    this._sentences = rawData.value;
  }

  get relation () {
    return this._relation;
  }

  // @returns {Array.<Sentence>}
  get sentences () {
    return this._sentences;
  }
}