import { Router } from "express";
import usersRoute from "./users.mjs";
import productsRoute from "./products.mjs";

const router = Router();

router.use(usersRoute);
router.use(productsRoute);

export default router;
