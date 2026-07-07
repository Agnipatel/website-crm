import mongoose, {
  Schema,
  Document,
  model,
  models,
} from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  source?: string;
  services?: string[];
  budget?: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      default: "Website",
      trim: true,
    },

    services: {
      type: [String],
      default: [],
    },

    budget: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatic
  }
);

// Prevent model overwrite error in Next.js
const Lead =
  models.Lead || model<ILead>("Lead", LeadSchema);

export default Lead;