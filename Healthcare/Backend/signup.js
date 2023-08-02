const MongoClient = require("mongodb".MongoClient);
const dbName = "HealthCare";

const { uuid } = require("uuidv4");

async function signup(req, res) {
  try {
    console.log("body", req.body);
    const uuid_ = uuid();
    console.log(uuid_);
    const client = await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
    db = client.db(dbName);
    const collection = db.collection("users");
    const newEmp = await collection.insertOne({
      user_id: uuid_,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.phone,
    });
    res.send({
      success: true,
      massage: "Account Created",
      newEmp,
    });
  } catch (error) {
    console.log("Error", error);
  }
}

module.exports = signup;
