import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Acheivement } from "../models/acheivementsSchema.js"


export const addNewAcheivement = catchAsyncErrors(async (req, res, next) => {

  const { title } = req.body;
  if (!title ) {
    return next(new ErrorHandler("Please enter title!", 400));
  }
  
  const acheivement = await Acheivement.create({
    title,
  });
  res.status(201).json({
    success: true,
    message: "New Acheivement Added",
    acheivement,
  });
});



export const deleteAcheivement = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let acheivement = await Acheivement.findById(id);
  if (!acheivement) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }

  await Acheivement.deleteOne();
  res.status(200).json({
    success: true,
    message: "Acheivement Deleted!",
  });
});


export const updateAcheivement = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let Acheivement = await Acheivement.findById(id);
  if (!Acheivement) {
    return next(new ErrorHandler("Acheivement not found!", 404));
  }
  const { title } = req.body;
  Acheivement = await Acheivement.findByIdAndUpdate(
    id,
    { title },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Acheivement Updated!",
    Acheivement,
  });
});


export const getAllAcheivements = catchAsyncErrors(async (req, res, next) => {
  const Acheivements = await Acheivement.find();
  res.status(200).json({
    success: true,
    Acheivements,
  });
});