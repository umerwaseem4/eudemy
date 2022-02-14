import User from "../model/user.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) return res.status(400).send("name is required");
        if (!password || password.length < 6) {
            return res
                .status(400)
                .send("Password is required and should be min 6 and max 64");
        }

        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email is already taken");

        // hash the password
        const hashedPassword = await hashPassword(password);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error try again");
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) return res.status(400).send("No user found");
        // check for password
        const match = await comparePassword(password, user.password);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        // return user and token to client and exclude password
        user.password = undefined;
        // set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // only works on https secure
        });
        // send user as json response
        res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error try again");
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Signout Success" });
    } catch (error) {
        console.log(error);
    }
};

export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")
            .exec();
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
    }
};
