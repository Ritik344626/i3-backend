import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as user from "../controllers/user";
import * as userValidator from "../validators/user";
import passport from "passport";
const router = Router();

router
  .get("/",passport.authenticate('jwt'), user.getLoggedInUser)
  .get("/:id", user.getUserById)
  .delete("/:id", user.deleteUser)
  .post("/", userValidator.createUser, catchError, user.createUser)
  .put("/:id", userValidator.updateUser, catchError, user.updateUser)
  .patch("/:id", userValidator.editUser, catchError, user.editUser)
  .post("/login",userValidator.loginUser, catchError, user.loginUser)

export default router;
