
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Vaccine = require('../models/vaccine');
const { json } = require('body-parser');


// get by vaccine id
exports.vaccineById = catchAsync(async (req, res, next, id) => {
  const main = await Vaccine.findById(req.params.vaccineId);

  if (!main) {
    return next(new AppError('No document found with that ID', 404));
  }

  req.vaccine = main;
  next();
});

//get all products

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.getAllVaccines = catchAsync(async (req, res, next) => {
  let filter = {};
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

//   if (req.params.proId) filter = { subcategory: req.params.proId };

  const vaccine = await Vaccine.find(filter)
    .sort([[sortBy, order]])
    .limit(limit);

  res.status(200).json({
    status: 'success',
    results: vaccine.length,
    data: {
        vaccine,
    },
  });
});

//get one product
exports.getOneVaccine = catchAsync(async (req, res, next, id) => {
  let query = Vaccine.findById(req.params.vaccineId);
//   query = query.populate({ path: 'review' });

  const vaccine = await query;
  if (!vaccine) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      vaccine,
    },
  });
});

//create product
exports.createVaccine = catchAsync(async (req, res) => {
	console.log(req.body);
  const main = await Vaccine.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      main,
    },
  });
});

exports.updateVaccine = catchAsync(async (req, res, next) => {
  const doc = await Vaccine.findByIdAndUpdate(req.params.vaccineId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

exports.deleteVaccine = catchAsync(async (req, res, next) => {
  //const doc = await Maincategory.findByIdAndDelete(req.params.id);
  const vaccine = req.vaccine;
  const doc = await Vaccine.findByIdAndDelete(req.params.vaccineId);

  if (!doc) {
    return next(new AppError('No Document find with that ID!', 404));
  }

  res.json({
    status: 'success',
    data: null,
  });
});




exports.listBySearch = catchAsync(async (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  const doc = await Vaccine.find(findArgs)
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    results: doc.length,
    status: 'success',
    data: {
      doc,
    },
  });
});

exports.listSearch = catchAsync(async (req, res) => {
  var q = req.query.q;
  var doc = await Vaccine.find({
    name: {
      $regex: new RegExp(q),
    },
  }).limit(5);

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
