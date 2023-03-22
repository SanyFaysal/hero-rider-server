const {
  findUserByEmailService,
  signupService,
  getUsersService,
  updateUsersRoleService,
} = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    let data = req.body;
    const { email } = data;
    console.log(data);
    const [profilePicture, nid, drivingLicense] = req.files;

    console.log(profilePicture, drivingLicense, nid);
    data.profilePicture = profilePicture || [];
    data.nid = nid || [];
    data.drivingLicense = drivingLicense || [];
    const isAvailableUser = await findUserByEmailService(email);
    if (isAvailableUser) {
      return res.status(404).json({
        status: "failed",
        error: "User already existed",
      });
    }
    const result = await signupService(data);
    const token = generateToken(result.result);

    res.status(200).json({
      status: "Success",
      message: "Signup successful",
      token,
      data: result?.data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.findUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        error: "Please give your credentials",
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "No result found with this email",
      });
    }

    const isValidPassword = user.comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: "failed",
        error: "Password not matched",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await findUserByEmailService(email);
    if (!result) {
      return res.status(400).json({
        status: "failed",
        error: "Token is not verified",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "successfully get data",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let queries = {};
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * parseInt(limit);
    queries.skip = skip;
    queries.limit = parseInt(limit);

    //
    const filters = {};
    const { age: ageRange } = req.query;
    let filterByAge = { age: ageRange };

    let filterString = JSON.stringify(filterByAge);
    filterString = filterString.replace(
      /\b(gte|lte)\b/g,
      (match) => `$${match}`
    );

    filterByAge = JSON.parse(filterString);
    filters.filterByAge = filterByAge;
    const {
      page: totalPage,
      result,
      total,
    } = await getUsersService(queries, filters);
    res.status(200).json({
      status: "Success",
      message: "successfully get data",
      data: result,
      page: totalPage,
      total,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.updateUsersRole = async (req, res) => {
  try {
    const emails = req.body;
    const result = await updateUsersRoleService(emails);
    res.status(200).json({
      status: "Success",
      message: "Successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
