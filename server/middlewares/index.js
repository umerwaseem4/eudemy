import expressjwt from "express-jwt";

export const requireSignIn = expressjwt({
    getToken: (req, res) => req.cookies.token,
    secret: "Umerwaseem4",
    algorithms: ["HS256"],
});
