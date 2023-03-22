const User = require("../models/User");

exports.signupService = async (data) => {
  const result = await User.create(data);

  return { result, data };
};
exports.findUserByEmailService = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

exports.getUsersService = async (queries, { filterByAge }) => {
  console.log(filterByAge);
  const result = await User.find(filterByAge)
    .skip(queries.skip)
    .limit(queries.limit);

  const total = await User.countDocuments(result);
  const page = Math.ceil(total / queries.limit);
  // const pageFound = Math.ceil(totalFound / queries.limit);
  return { page, result, total };
};

exports.updateUsersRoleService = async (emails) => {
  const result = await User.updateMany(
    { email: emails },
    { $set: { status: "blocked" } },
    { runValidators: true }
  );
  return result;
};
