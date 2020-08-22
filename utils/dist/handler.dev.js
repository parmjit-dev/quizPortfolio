"use strict";

// A function that returns a function of every model -- works due to closures
var AppError = require('./appError');

var catchAsync = require('./catchAsync');

var APIFeatures = require('./apiFeatures');

exports.deleteOne = function (Model) {
  return catchAsync(function _callee(req, res, next) {
    var doc;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Model.findByIdAndDelete(req.params.id));

          case 2:
            doc = _context.sent;

            if (doc) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", next(new AppError('No document found with that ID', 404)));

          case 5:
            res.status(204).json({
              status: 'success',
              data: null
            }); // 204 is for successful status' without any creation

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

exports.updateOne = function (Model) {
  return catchAsync(function _callee2(req, res, next) {
    var doc;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Model.findByIdAndUpdate(req.params.id, req.body, {
              // another mongoose function -- finds the id in the request url params and takes the body data to update at id
              "new": true,
              runValidators: true
            }));

          case 2:
            doc = _context2.sent;

            if (doc) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", next(new AppError('No tour found with that ID', 404)));

          case 5:
            res.status(200).json({
              status: 'success',
              data: {
                doc: doc
              }
            }); // successful creation

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};

exports.createOne = function (Model) {
  return catchAsync(function _callee3(req, res, next) {
    var modeledReq, doc;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            modeledReq = req.body;

            if (req.body.createdBy) {
              modeledReq.createdBy = req.user._Id;
            }

            _context3.next = 4;
            return regeneratorRuntime.awrap(Model.create(modeledReq, {
              "new": true,
              runValidators: true
            }));

          case 4:
            doc = _context3.sent;
            // .create is a mongoose function - which takes a model and the request body
            res.status(201).json({
              status: 'success',
              data: {
                data: doc
              }
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
};

exports.getOne = function (Model, population) {
  return catchAsync(function _callee4(req, res, next) {
    var query, doc;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            query = Model.findById(req.params.id);
            if (population) query = query.populate(population);
            _context4.next = 4;
            return regeneratorRuntime.awrap(query);

          case 4:
            doc = _context4.sent;

            if (doc) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", next(new AppError('No tour found with that ID', 404)));

          case 7:
            res.status(200).json({
              status: 'success',
              requestAt: req.requestTime,
              data: {
                doc: doc
              }
            });

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
};

exports.getAll = function (Model) {
  return catchAsync(function _callee5(req, res, next) {
    var filter, modeledQuery, doc;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filter = {}; // only for populating reviews with tours

            if (req.params.tourId) filter = {
              tour: req.params.tourId
            };
            modeledQuery = new APIFeatures(Model.find(filter), req.query).filter().sort().limit().pagination(); // you pass the finder or query you want to use -- same as the mongo db basically.
            // execute the query -- after modelling the query you then consume it.

            _context5.next = 5;
            return regeneratorRuntime.awrap(modeledQuery.query.explain());

          case 5:
            doc = _context5.sent;
            res.status(200).json({
              status: 'success',
              requestAt: req.requestTime,
              results: doc.length,
              data: {
                doc: doc
              }
            });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
};