const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User Not found" });
  }
  return res.json(user);
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.job_title ||
    !body.gender ||
    !body.email
  ) {
    return res.status(400).json("All fields are required");
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Sucess" });
}

async function handlePatchUserByID(req, res) {
  const updateFields = {};

  if (req.body.first_name) updateFields.firstName = req.body.first_name;
  if (req.body.last_name) updateFields.lastName = req.body.last_name;
  if (req.body.email) updateFields.email = req.body.email;
  if (req.body.gender) updateFields.gender = req.body.gender;
  if (req.body.job_title) updateFields.jobTitle = req.body.job_title;

  try {
    await User.findByIdAndUpdate(req.params.id, updateFields);
    return res.json({ msg: "Success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Failed to update user" });
  }
}

async function handleDeleteUserByID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Success" });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handlePatchUserByID,
  handleDeleteUserByID,
};
