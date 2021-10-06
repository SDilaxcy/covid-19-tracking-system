const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const slugify = require('slugify');

const vaccineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A vaccination must have a name'],
      unique: true,
      trim: true,
    },

    slug: String,
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'A vaccination must have a quantity'],
    },
    manufacturingCountry: {
      type: String,
      required: [true, 'A vaccination must have a manufacturingCountry'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

vaccineSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
vaccineSchema.pre('findOneAndUpdate', function (next) {
  // console.log(this.name);

  //this.slug = slugify(this.name, { lower: true });
  next();
});

vaccineSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  this.slug = slugify(this.r.name, { lower: true });

  console.log(this.r);
  next();
});

module.exports = mongoose.model('Vaccine', vaccineSchema);
