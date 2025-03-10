const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: [true, "Service title is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Service type is required"],
    enum: ["catering", "decoration", "venue", "photography", "entertainment"],
  },
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
    trim: true,
    maxlength: [150, "Short description cannot exceed 150 characters"],
  },
  location: {
    type: String,
    required: [true, "Service location is required"],
    trim: true,
  },
  detailedDescription: {
    type: String,
    trim: true,
  },

  // Pricing & Packages
  basePrice: {
    type: Number,
    required: [true, "Base price is required"],
  },
  priceUnit: {
    type: String,
    required: [true, "Price unit is required"],
    enum: ["per_person", "per_event", "per_hour", "per_day"],
  },
  advancePayment: {
    type: Number,
    default: 50,
    min: [0, "Advance payment cannot be less than 0%"],
    max: [100, "Advance payment cannot exceed 100%"],
  },
  cancelationPolicy: {
    type: String,
    enum: ["flexible", "moderate", "strict", "custom"],
    default: "moderate",
  },
  customCancelationPolicy: {
    type: String,
    trim: true,
  },

  // Service Details
  cuisines: [
    {
      type: String,
      enum: [
        "nepali",
        "indian",
        "chinese",
        "italian",
        "continental",
        "thai",
        "mexican",
        "japanese",
        "fusion",
      ],
    },
  ],
  dietaryOptions: [
    {
      type: String,
      enum: [
        "vegetarian",
        "vegan",
        "glutenFree",
        "dairyFree",
        "nutFree",
        "halal",
        "kosher",
      ],
    },
  ],
  minGuests: {
    type: Number,
    default: 20,
  },
  maxGuests: {
    type: Number,
    default: 200,
  },
  additionalServices: [
    {
      type: String,
      trim: true,
    },
  ],

  // Packages
  packages: [
    {
      name: {
        type: String,
        required: [true, "Package name is required"],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, "Package price is required"],
      },
      description: {
        type: String,
        trim: true,
      },
      features: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  ],

  // Photos & Media
  photos: [
    {
      url: {
        type: String,
        required: [true, "Photo URL is required"],
      },
      name: {
        type: String,
        required: [true, "Photo name is required"],
      },
    },
  ],
  videoLink: {
    type: String,
    trim: true,
  },
  menuPdf: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  // Vendor Reference
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Vendor ID is required"],
  },

  // Status
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update 'updatedAt' before saving
serviceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Service", serviceSchema);
