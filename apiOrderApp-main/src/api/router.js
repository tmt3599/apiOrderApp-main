import Router from "express";
import validate from "express-validation";
import controller from "./controller.js";
import authCheck from "../middleware/index.js";

const router = Router();

router.route("/test").post(controller.test);

//------------------------USER
router.route("/user/signup").post(
  // (req, res, next) => {
  // res.send(controller.test(req,res));
  controller.signup //(req, res, next);
);

router.route("/user/login").post(controller.login);

//------------------------- IMPORTANT LIST
router.route("/store").get(controller.getStore);

router.route("/event").get(controller.getEvent);

router.route("/voucher").get(controller.getVoucher);

router.route("/category").get(controller.getCategories);

router.route("/voucher2").get(controller.getVoucher2);

//---------------------PRODUCT
router.route("/product").get(controller.getListProduct);

router.route("/product/:id").get(controller.getProductById);

//----------------------ORDER
router.route("/order/add-cart/:productId").post(controller.addCart);

router.route("/order/delete-item/:orderDetailId").delete(controller.deleteItem);

router.route("/order/update-cart/:orderDetailId").put(controller.updateCart);

router.route("/order/:id").delete(controller.deleteCart);

router.route("/order/addVoucher").post(controller.addVoucher);

router.route("/order/exchange-voucher").get(controller.exchangeVoucher);

router.route("/order/payment/:orderId").post(controller.payment);

export default router;
