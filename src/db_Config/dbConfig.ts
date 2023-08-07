import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connect = mongoose.connection;

    connect.on("connected", () => {
      console.log("MongoDB successfully connected.");
    });
    connect.on("error", (err) => {
      console.log(
        "Mongo connection error. Please make sure MongoDB is running. " + err
      );
    });
  } catch (error) {
    console.log("Something went wrong.");
    console.log(error);
  }
}
