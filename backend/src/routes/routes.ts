import { Router } from "express";
import { verifyAuth, validateRegistration } from "../middleware/middleware";
import {
  login,
  logout,
  greetings,
  refreshToken,
} from "../controllers/authControllers";
import {
  registration,
  confirmEmail,
  confirmationLinkRequest,
} from "../controllers/registrationControllers";
import {
  getUserData,
  changePassword,
  updateUserData,
  deleteAccount,
} from "../controllers/userMangement";
const router = Router();

//registration
router.post("/signUp", validateRegistration, registration);

//login
router.post("/signIn", login);

router.get("/greetings", verifyAuth, greetings);

router.post("/logout", logout);

router.get("/user", verifyAuth, getUserData);

router.patch("/changePassword", verifyAuth, changePassword);

router.patch("/updateData", verifyAuth, updateUserData);

router.patch("/confirmRegistration", confirmEmail);

router.post("/deleteAccount", verifyAuth, deleteAccount);

router.post("/refreshConfirmation", confirmationLinkRequest);

router.post("/refreshAuth", refreshToken);

export default router;
