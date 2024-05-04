const mongoose = require("mongoose");
const { Schema } = mongoose;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("succesfully connected with the database");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const productSchema = new Schema({
  id: String,
  image: String,
  company: String,
  item_name: String,
  original_price: Number,
  current_price: Number,
  discount_percentage: Number,
  return_period: Number,
  delivery_date: String,
  rating: String,
});

exports.Items = mongoose.model("Items", productSchema);
