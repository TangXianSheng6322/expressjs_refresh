import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  res.send([{ id: 2, name: "doughnut", price: 29.99 }]);
});

export default router;
