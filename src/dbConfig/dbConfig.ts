import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB Succesfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDb Connection Error Please make sure MOngoDb is running" + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error);
  }
}
