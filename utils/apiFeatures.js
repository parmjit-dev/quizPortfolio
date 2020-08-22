//can be copied and pasted for future projects

class APIFeatures {
  constructor(query, queryString) {
    //query is what you want to do (ex find() select * in mysql)
    //queryString is the req query
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //filter
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryString }; //contains the string of the query
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]); //deletes the queryObj  elements which contain the fields

    //advanced filtering
    let queryStr = JSON.stringify(queryObj); //converts the json to string of queryobj
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //.replace can take a regular expression and a function which then replace all occurances of the phrases and adds  a $ infront pretty neat
    this.query = this.query.find(JSON.parse(queryStr)); //the query is now equal to .query.find(modelled query string) .find is mongodb
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) { //if the query contains a sort
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() { //limits the amount of returned values
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit); // you need to skip how many results after creating a page

    // if (this.queryString.page) {
    // 	const numTours = await Tour.countDocuments(); //awaits a promise -- counts number of documents
    // 	if (skip > numTours) throw new Error('This page does not exist');
    // }
    return this;
  }
}

module.exports = APIFeatures;