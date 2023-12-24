// add db

import mongoose from "mongoose";

export const connectDB = async () => {

 // Set the 'strictQuery' option to false
  mongoose.set('strictQuery', false);


  // hear destructuring connection because use it in below step . 
  const { connection } = await mongoose.connect(process.env.MONGO_URI);

  console.log(`Database is connect with ${connection.host}`);
};


