const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handlePatchUserByID,
  handleDeleteUserByID
} = require("../controller/user");

const router = express.Router();

router.get("/", handleGetAllUsers);

router.get("/:id", handleGetUserById);

router.post("/", handleCreateUser);

// edit the data
router.patch("/patch/:id", handlePatchUserByID);

router.delete("/delete/:id", handleDeleteUserByID);

module.exports = router;
