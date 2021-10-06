const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApplyVaccine = require('../models/applyVaccine');


exports.getAllApplyVaccine = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.vaccineId) filter = { vaccine: req.params.vaccineId };
  
    const applyVaccine = await ApplyVaccine.find(filter);
  
    res.status(200).json({
      status: 'success',
      results: applyVaccine.length,
      data: {
        applyVaccine,
      },
    });
  });

  exports.getapplyVaccine = catchAsync(async (req, res, next, id) => {
    let query = ApplyVaccine.findById(req.params.applyVaccineId);
    // query = query.populate({ path: 'subclassification' });
  
    const doc = await query;
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

  exports.setVaccineUserId = catchAsync(async (req, res, next) => {
    if (!req.body.vaccine) req.body.vaccine = req.params.vaccineId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  });

  exports.applyVaccineById = catchAsync(async (req, res, next, id) => {
    const main = await ApplyVaccine.findById(req.params.applyVaccineId);
  
    if (!main) {
      return next(new AppError('No document found with that ID', 404));
    }
  
    req.vaccine = main;
    next();
  });

  exports.createApplyVaccine = catchAsync(async (req, res) => {
    const main = await ApplyVaccine.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        main,
      },
    });
  });

  exports.updateApplyVaccine = catchAsync(async (req, res, next) => {
    const doc = await ApplyVaccine.findByIdAndUpdate(req.params.applyVaccineId, req.body, {
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

  exports.deleteApplyVaccine = catchAsync(async (req, res, next) => {
    //const doc = await Maincategory.findByIdAndDelete(req.params.id);
    // const applyVaccine = req.applyVaccine;
    // console.log(req.params.applyVaccineId);
    const doc = await ApplyVaccine.findByIdAndDelete(req.params.applyVaccineId);
  
    if (!doc) {
      return next(new AppError('No Document find with that ID!', 404));
    }
  
    res.json({
      status: 'success',
      data: null,
    });
  });
  
