import express from "express";
import bluebird from "bluebird";
import { createConnection } from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const connectionUri = {
  host: "localhost",
  user: "root",
  password: "Pankaj@3",
  database: "cdac",
};
//app.get("/", (req, res) => res.send("Hello, NodeJS people2!"));
//query writing simple format
app.get("/messages", async (req, res) => {
  let list = [];
  let connection = createConnection(connectionUri);

  bluebird.promisifyAll(connection);

  await connection.connectAsync();
  //let sql = `SELECT * FROM message2 ORDER BY ID DESC`;
  let sql = `SELECT * FROM message2`;

  list = await connection.queryAsync(sql);

  await connection.endAsync();
  res.json(list);
});
app.post("/message", async (req, res) => {
  let connection = createConnection(connectionUri);
  bluebird.promisifyAll(connection);

  await connection.connectAsync();

  let message = req.body.message;
  let reply = req.body.reply;
  // let sql = `INSERT INTO message (message, reply) VALUES ('${message}', ${reply})`;
  let sql = `INSERT INTO message2 (message, reply) VALUES (?, ?)`;
  await connection.queryAsync(sql, [message, reply]);

  await connection.endAsync();

  let output = { msg: "Record Created Successfully" };
  res.json(output);
});

app.listen(3001);
