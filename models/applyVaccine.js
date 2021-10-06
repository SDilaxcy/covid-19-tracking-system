const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const slugify = require('slugify');
const Vaccine = require('./vaccine');

const applyVaccineSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please tell us your first name '],
    },
    lastname: {
      type: String,
      required: [true, 'Please tell us your last name '],
    },
    phone_number: {
      type: String,
      required: [true, 'Please provide your phone number'],
      unique: true,
    },
    address: {
      type: Array,
      default: [],
    },
    age: {
      type: String,
    },
    vaccine: {
      type: ObjectId,
      ref: 'Vaccine',
      required: [true, 'vaccine details must be included '],
    },
    // user: {
    //   type: ObjectId,
    //   ref: 'User',
    //   required: [true, 'Review must brlong to a user'],
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

applyVaccineSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'vaccine',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name photo',
  });
  this.select('-__v');
  next();
});

applyVaccineSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r);
  next();
});

applyVaccineSchema.statics.calcAverageRatings = async function (vaccineId) {
  const demo = await Vaccine.findById(vaccineId);
  await Vaccine.findByIdAndUpdate(vaccineId, {
    quantity: demo.quantity - 1,
  });
};

applyVaccineSchema.post('save', function () {
  //this points to current review
  this.constructor.calcAverageRatings(this.vaccine);
});

module.exports = mongoose.model('ApplyVaccine', applyVaccineSchema);
