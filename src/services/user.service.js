require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sequelize, User} = require('../models');
const { Op } = require('sequelize');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  const t = await sequelize.transaction();

  try {
    // 1. Check username duplicated
    const existingUser = await User.findOne({
      where: { email: email },
      transaction: t,
    });

    if (existingUser) {
      await t.rollback();
      return { EC: 1, EM: "Email already exists", DT: "" };
    }

    // 2. Hash password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // 3. Generate new UserId: UA###
    const prefixUser = "UA";
    const latestUser = await User.findOne({
      where: { userId: { [Op.like]: `${prefixUser}%` } },
      order: [["userId", "DESC"]],
      transaction: t,
      lock: true,
    });

    const nextUserNumber = latestUser
      ? parseInt(latestUser.userId.replace(prefixUser, ""), 10) + 1
      : 1;

    const nextUserId = `${prefixUser}${String(nextUserNumber).padStart(3, "0")}`;

    // 4. Create USER ACCOUNT
    const newUser = await User.create(
      {
        userId: nextUserId,
        name: name,
        email: email,
        passwordHash: hashPassword,
      },
      { transaction: t }
    );

    await t.commit();

    return {
      EC: 0,
      EM: "User created successfully",
      DT: newUser,
    };
  } catch (error) {
    await t.rollback();
    console.error("Error in createUserService:", error);
    return { EC: -1, EM: "Server error", DT: null };
  }
};

const loginService = async (email, password) => {
  try {
    // 1. Find user by username
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return { EC: 1, EM: "Username/password not found", DT: "" };
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return { EC: 2, EM: "Username/password not found", DT: "" };
    }

    // 3. Create JWT token
    const payload = {
      userId: user.userId,
      email: user.email,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      EC: 0,
      EM: "Login successful",
      DT: {
        accessToken,
        user: {
          userId: user.userId,
          email: user.email,
          name: user.name,
        },
      },
    };
  } catch (error) {
    console.error("Error in loginService:", error);
    return { EC: -1, EM: "Server error", DT: "" };
  }
};

module.exports = {
    createUserService,
    loginService
}