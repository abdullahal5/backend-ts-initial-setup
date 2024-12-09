import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config.databse_url as string, {
      dbName: "mupicomputerclub",
    });

    app.listen(config.port, () => {
      console.log(`Server is running on ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
