import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  CREATE_USERS,
  DELETE_USER,
  GET_USERS,
  GET_USERS_BY_ID,
  UPDATE_USER,
} from "./endPoints.js";

const PORT = 3500;
const app = express();

const userDetails = [
  {
    id: 1,
    name: "Harsh",
    age: 19,
  },
  {
    id: 2,
    name: "Smack",
    age: 21,
  },
];
let serialNumberProvider = 3;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(GET_USERS, (req, res) => {
  res.send(userDetails);
});

app.get(GET_USERS_BY_ID, (req, res) => {
  const reqUserId = Number(req.params.id);
  const reqUserIndex = userDetails.findIndex((user) => {
    return user.id === reqUserId;
  });
  console.log("Req User Index: ", reqUserIndex);
  if (reqUserIndex >= 0) {
    console.log("reqUserINdex: ", reqUserIndex);
    console.log(userDetails[reqUserIndex]);
    res.send({
      status: true,
      data: userDetails[reqUserIndex],
    });
  } else {
    res.send({
      status: false,
      message: "No User Found!",
    });
  }
});

app.put(UPDATE_USER, (req, res) => {
  const reqUserId = Number(req.params.id);
  const userUpdateInfo = req.body;
  const userUpdateKeyArr = Object.keys(userUpdateInfo);
  const reqUserIndex = userDetails.findIndex((user) => {
    return user.id === reqUserId;
  });
  if (reqUserIndex >= 0) {
    const userToBeUpdated = userDetails[reqUserIndex];
    userUpdateKeyArr.forEach((info, index) => {
      if (info !== "id") {
        userToBeUpdated[info] = userUpdateInfo[info];
      }
    });
    res.send({
      result: true,
      message: "User Updated!",
    });
  } else {
    res.send({
      result: false,
      message: "User not found!",
    });
  }
});

app.post(CREATE_USERS, (req, res) => {
  console.log("debug req.body:", req.body.data);
  const userInput = req.body.data;
  for (let i = 0; i < userInput.length; i++) {
    userInput[i].id = serialNumberProvider++;
    userDetails.push(userInput[i]);
  }
  res.send("Users Added!");
});

app.delete(DELETE_USER, (req, res) => {
  const reqUserId = Number(req.params.id);
  const reqUserIndex = userDetails.findIndex((user) => {
    return user.id === reqUserId;
  });
  if (reqUserIndex >= 0) {
    userDetails.splice(reqUserIndex, 1);
    res.send({
      status: true,
      message: "User Deleted!",
    });
  } else {
    res.send({
      status: false,
      message: "User Not Found!",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Working on PORT ${PORT}`);
});
