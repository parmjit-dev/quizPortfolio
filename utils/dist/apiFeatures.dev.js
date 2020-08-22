"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//can be copied and pasted for future projects
var APIFeatures =
/*#__PURE__*/
function () {
  function APIFeatures(query, queryString) {
    _classCallCheck(this, APIFeatures);

    //query is what you want to do (ex find() select * in mysql)
    //queryString is the req query
    this.query = query;
    this.queryString = queryString;
  }

  _createClass(APIFeatures, [{
    key: "filter",
    value: function filter() {
      //filter
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      var queryObj = _objectSpread({}, this.queryString); //contains the string of the query


      var excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(function (el) {
        return delete queryObj[el];
      }); //deletes the queryObj  elements which contain the fields
      //advanced filtering

      var queryStr = JSON.stringify(queryObj); //converts the json to string of queryobj

      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, function (match) {
        return "$".concat(match);
      }); //.replace can take a regular expression and a function which then replace all occurances of the phrases and adds  a $ infront pretty neat

      this.query = this.query.find(JSON.parse(queryStr)); //the query is now equal to .query.find(modelled query string) .find is mongodb
      // let query = Tour.find(JSON.parse(queryStr));

      return this;
    }
  }, {
    key: "sort",
    value: function sort() {
      if (this.queryString.sort) {
        //if the query contains a sort
        var sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }

      return this;
    }
  }, {
    key: "limit",
    value: function limit() {
      //limits the amount of returned values
      if (this.queryString.fields) {
        var fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }

      return this;
    }
  }, {
    key: "pagination",
    value: function pagination() {
      var page = this.queryString.page * 1 || 1;
      var limit = this.queryString.limit * 1 || 100;
      var skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit); // you need to skip how many results after creating a page
      // if (this.queryString.page) {
      // 	const numTours = await Tour.countDocuments(); //awaits a promise -- counts number of documents
      // 	if (skip > numTours) throw new Error('This page does not exist');
      // }

      return this;
    }
  }]);

  return APIFeatures;
}();

module.exports = APIFeatures;