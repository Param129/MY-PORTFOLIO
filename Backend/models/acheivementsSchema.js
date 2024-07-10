import mongoose from "mongoose";

const acheivementSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

export const Acheivement = mongoose.model("Acheivement", acheivementSchema);