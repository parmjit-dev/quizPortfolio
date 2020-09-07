// A function that returns a function of every model -- works due to closures

const AppError = require('./appError');
const catchAsync = require('./catchAsync');
const APIFeatures = require('./apiFeatures');

exports.deleteOne = (Model) => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id); // another mongoose function -- takes url params

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({ status: 'success', data: null }); // 204 is for successful status' without any creation
});

exports.updateOne = (Model) => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { // another mongoose function -- finds the id in the request url params and takes the body data to update at id
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: { doc } }); // successful creation
});

exports.createOne = (Model) => catchAsync(async (req, res, next) => {
  let modeledReq = req.body;

  if (req.body.createdBy) { modeledReq.createdBy = req.user._Id }
  const doc = await Model.create(modeledReq); // .create is a mongoose function - which takes a model and the request body
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getOne = (Model, population) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);

  if (population) query = query.populate(population);
  const doc = await query; // params give access to the url req

  if (!doc) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    data: { doc },
  });
});

exports.getAll = (Model, population) => catchAsync(async (req, res, next) => {
  let filter = {}; // only for populating reviews with tours
  if (req.params.tourId) filter = { tour: req.params.tourId };

  let modeledQuery = new APIFeatures(Model.find(filter), req.query).filter().sort().limit()
    .pagination();

  if (population) modeledQuery = modeledQuery.query.populate(population);

  const doc = await modeledQuery;

  if (!doc) {
    return next(new AppError('No tour found with that ID', 404));
  }
    // you pass the finder or query you want to use -- same as the mongo db basically.
    // execute the query -- after modelling the query you then consume it.
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: doc.length,
    data: { doc },
  });
});