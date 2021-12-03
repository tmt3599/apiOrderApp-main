import pkg from "sequelize";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { APIError } from "../common/api-res.js";
import {
  THROW_ERROR_MES,
  VOUCHER_TYPE,
  ORDER_STATUS,
  SHIPPING_FEE,
} from "../common/constant.js";
import Sequelize from "../model/index.js";
import UserModel from "../model/user.js";
import StoreModel from "../model/store.js";
import ProductToppingModel from "../model/product_topping.js";
import ProductModel from "../model/product.js";
import EventModel from "../model/event.js";
import OrderModel from "../model/order.js";
import OrderDetailModel from "../model/order_detail.js";
import ToppingModel from "../model/topping.js";
import VoucherModel from "../model/voucher.js";
import UserVoucherModel from "../model/user_voucher.js";
import CategoryModel from "../model/category.js";

const { Op } = pkg;

const test = async (userId) => {
  const test = await ProductModel.findOne();
  // if('s'=="S")
  return test.size;
  return false;
  return { userId: userId };
};

//------------------------------------USER
const signup = async (firstName, lastName, phone, password) => {
  const conflict = await UserModel.findOne({ where: { phone } });
  if (conflict)
    //return { err: httpStatus.CONFLICT };
    throw new APIError(THROW_ERROR_MES.PHONE_CONFLICT, httpStatus.CONFLICT);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await UserModel.create({
    firstName,
    lastName,
    phone,
    password: hash,
  });
  if (user) return user;
  throw new APIError("Không thể đăng ký", httpStatus.GATEWAY_TIMEOUT);
};

const login = async (phone, password) => {
  const user = await UserModel.findOne({ where: { phone } });
  if (!user)
    throw new APIError(THROW_ERROR_MES.ACCOUNT_NOTFOUND, httpStatus.NOT_FOUND);
  if (!(await bcrypt.compare(password, user.password)))
    throw new APIError(THROW_ERROR_MES.WRONG_PASSWORD, httpStatus.UNAUTHORIZED);
  return { id: user.id };
};

//---------------------------- IMPORTANT LIST
const getStore = async () => {
  const store = await StoreModel.findAll();
  return store;
};

const getEvent = async () => {
  const event = await EventModel.findAll({
    where: { date: { [Op.gte]: new Date() } },
  });
  return event;
};

const getVoucher = async (userId) => {
  const query = `
  select uv.id,uv.expired,v.title,v.description,v.discount, v.imgUrl
  from userVoucher uv join voucher v on uv.voucherId=v.id
  where userId='${userId}' and (uv.expired> now() or uv.expired is null)
  order by uv.expired asc`;

  const voucher = await Sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  return voucher;
};

const getVoucher2 = async () => {
  const query = `
  select uv.id,uv.expired,v.title,v.description,v.discount, v.imgUrl
  from userVoucher uv join voucher v on uv.voucherId=v.id
  where (uv.expired> now() or uv.expired is null)
  order by uv.expired asc`;

  const voucher = await Sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  return voucher;
};

//-----------------------------PRODUCT
const getListProduct = async (categoryId) => {
  let query = `select p.id as productId,categoryId, p.name as productName, description, p.imageUrl as productImg, p.price, p.size, c.name as categoryName,
      c.imageUrl as categoryImg
     from product p join category c on c.id=p.categoryId where true `;
  if (categoryId) query += ` and categoryId='${categoryId}' `;
  query += " order by categoryId ";
  const products = await Sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  return products;
};

const getProductById = async (id) => {
  let product = await ProductModel.findOne({ where: { id } });
  if (!product)
    throw new APIError(THROW_ERROR_MES.PRODUCT_NOTFOUND, httpStatus.NOT_FOUND);

  const query = `select t.id, t.title, t.price
                from topping t join productTopping pt on t.id=pt.toppingId
                where pt.productId='${id}'`;
  const topping = await Sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  let size = [];
  if (product.size) {
    let str = product.size;
    str = str.split(";");
    str.forEach((e) => {
      size.push(JSON.parse(e));
    });
  }
  let data = {};
  data.product = product;
  data.product.size = size;
  data.topping = topping;

  return data;
};

const getCategories = async () => {
  return await CategoryModel.findAll();
};

//---------------------ORDER
const updateOrderDetail = async (
  id,
  productId,
  price,
  size,
  quantity = 1,
  toppingId,
  total,
  orderId
) => {
  //kiem tra xem yeu cau la update hay add cart
  if (id) {
    //update
    const update = await OrderDetailModel.update(
      { quantity: quantity, total },
      { where: { id } }
    );
    return update;
  }
  const exist = await OrderDetailModel.findOne({
    where: {
      orderId: orderId,
      productId: productId,
      size: size,
      toppingId: toppingId,
    },
  });
  if (exist) {
    const update = await OrderDetailModel.update(
      { quantity: quantity, total },
      { where: { id: exist.id } }
    );
    return update;
  }
  const add = await OrderDetailModel.create({
    productId,
    price,
    size,
    quantity,
    toppingId,
    total,
    orderId,
  });
  return add;
};

const applyVoucher = (
  orderDetail,
  price,
  quantity,
  minOrder,
  minQuantity,
  maxDiscount,
  discount,
  type
) => {
  if (
    (minOrder != null && minOrder > price) ||
    (minQuantity != null && quantity < minQuantity)
  )
    return price + SHIPPING_FEE;

  if (type === VOUCHER_TYPE.BUY2_GIVE1) {
    let arrPrice = orderDetail.map((e) => e.total / e.quantity);
    price -= Math.min(...arrPrice);
  } else if (type === VOUCHER_TYPE.FREESHIP) {
    return price;
  } else if (type === VOUCHER_TYPE.DISCOUNT_PRICE) {
    price -= discount;
  } else if (type === VOUCHER_TYPE.DISCOUNT_PERCENT) {
    let reduce = price * (discount / 100);
    if (reduce > maxDiscount) reduce = maxDiscount;
    price -= reduce;
  }
  price = price > 0 ? price : 0;
  price += SHIPPING_FEE;
  return price;
};

const updateOrder = async (orderId) => {
  //kiem tra order ton tai
  const order = await OrderModel.findOne({ where: { id: orderId } });
  if (!order)
    throw new APIError(THROW_ERROR_MES.ORDER_NOTFOUND, httpStatus.NOT_FOUND);
  // return order.userVoucherId
  let price = 0,
    quantity = 0;

  //danh sach chi tiet order
  const orderDetail = await OrderDetailModel.findAll(
    // { attributes: ['total'] },
    { where: { orderId } }
  );
  if (!orderDetail) return await OrderModel.destroy({ where: { id: orderId } });

  //tinh gia goc don hang
  orderDetail.map((e) => (price += e.total));
  let total = price + SHIPPING_FEE;
  //lay so luong sp trong 1 don
  orderDetail.map((e) => (quantity += e.quantity));
  //kiem tra voucher
  if (order.userVoucherId) {
    let now = new Date();
    now = now.toISOString();
    let query = `select v.id, v.type, v.minOrder, v.minQuantity, v.maxDiscount, v.discount 
                from userVoucher uv join voucher v on v.id=uv.voucherId
                where uv.id='${order.userVoucherId}' and (expired >= '${now}' or expired is null) and userId='${order.userId}'`;
    let voucher = await Sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    //voucher valid
    if (voucher.length != 0) {
      voucher = voucher[0];
      total = applyVoucher(
        orderDetail,
        price,
        quantity,
        voucher.minOrder,
        voucher.minQuantity,
        voucher.maxDiscount,
        voucher.discount,
        voucher.type
      );
    }
  }
  const update = await OrderModel.update(
    { price, quantity, total },
    { where: { id: orderId } }
  );
  // return "abc";
  if (!update)
    throw new APIError(
      THROW_ERROR_MES.UPDATE_ORDER_FAIL,
      httpStatus.EXPECTATION_FAILED
    );
};

const addCart = async (productId, size, quantity, toppingId, userId) => {
  //create data
  let price = 0,
    total = 0;

  //kiem tra san pham ton tai
  let product = await ProductModel.findOne({ where: { id: productId } });
  if (!product)
    throw new APIError(THROW_ERROR_MES.PRODUCT_NOTFOUND, httpStatus.NOT_FOUND);

  total = price = product.price;

  //kiem tra topping ton tai
  if (toppingId !== undefined) {
    const query = `select * from productTopping pt join topping t on pt.toppingId=t.id 
                  where pt.productId='${productId}' and t.id='${toppingId}'
                  limit 1`;
    const topping = await Sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    if (!topping || topping.length == 0) toppingId = null;
    //cong gia topping vao gia goc
    else total += topping[0].price;
  }
  toppingId = toppingId || null;

  //kiem tra size
  if (product.size != null && size) {
    product.size = product.size.split(";");
    product.size = product.size.map((e) => JSON.parse(e));

    size = product.size.find((e) => e.size === size.toUpperCase()) || null;
    //cong gia cua size vao gia goc
    if (size) total += size.price;
  } else size = null;
  //chuyen size ve string neu size != null
  if (size != null) size = JSON.stringify(size);

  //kiem tra so luong san pham
  quantity = quantity <= 0 || !quantity ? 1 : quantity;
  //tinh tong tien order detail
  total = total * quantity;

  // return orderDetail;
  //kiem tra hien dang co order nao ko
  const existOrder = await OrderModel.findOne({
    where: { userId, status: ORDER_STATUS.PENDING },
  });
  let orderId = null;
  if (existOrder) {
    orderId = existOrder.id;
    // const addCart = await OrderDetailModel.create(orderDetail);
  } else {
    const order = await OrderModel.create({ userId });
    orderId = order.id;
  }

  //cap nhat chi tiet order va order
  let add = await updateOrderDetail(
    null,
    productId,
    price,
    size,
    quantity,
    toppingId,
    total,
    orderId
  );
  await updateOrder(orderId);

  return add;
};

const deleteItem = async (orderDetailId, userId) => {
  const query = `select o.id
                from \`order\` o join orderDetail od on o.id=od.orderId
                where o.userId='${userId}' and o.status=0 and od.id='${orderDetailId}'`;
  const exist = await Sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  if (!exist || exist.length != 1)
    throw new APIError(
      THROW_ERROR_MES.ORDER_DETAIL_NOTFOUND,
      httpStatus.NOT_FOUND
    );
  console.log(exist);
  const del = await OrderDetailModel.destroy({ where: { id: orderDetailId } });
  await updateOrder(exist[0].id);
  return del;
};

const updateCart = async (orderDetailId, quantity, userId) => {
  const query = `
  select count(od.id) as count, o.id,od.total,od.quantity
  from orderDetail od join \`order\` o on od.orderId=o.id
  where o.userId='${userId}' and od.id='${orderDetailId}'`;
  const orderDetail = await Sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return orderDetail[0]
  if (orderDetail[0].count != 1)
    throw new APIError(
      THROW_ERROR_MES.ORDER_DETAIL_NOTFOUND,
      httpStatus.NOT_FOUND
    );

  let total = (orderDetail[0].total / orderDetail[0].quantity) * quantity;
  console.log(total);
  const update = await updateOrderDetail(
    orderDetailId,
    null,
    null,
    null,
    quantity,
    null,
    total,
    null
  );
  await updateOrder(orderDetail[0].id);
  return update;
};

const deleteCart = async (id, userId) => {
  const t = await Sequelize.transaction();
  const order = await OrderModel.findOne({
    where: { id, userId, status: ORDER_STATUS.PENDING },
    transaction: t,
  });
  if (!order)
    throw new APIError(THROW_ERROR_MES.ORDER_NOTFOUND, httpStatus.NOT_FOUND);
  const detail = await OrderDetailModel.destroy({
    where: { orderId: id },
    transaction: t,
  });
  const res = await OrderModel.destroy({ where: { id }, transaction: t });
  if (!detail || !res) {
    t.rollback();
    throw new APIError(
      THROW_ERROR_MES.DELETE_ORDER_FAIL,
      httpStatus.IM_A_TEAPOT
    );
  }
  t.commit();
  return res;
};

const addVoucher = async (orderId, userVoucherId, userId) => {
  const order = await OrderModel.findOne({
    where: { id: orderId, status: ORDER_STATUS.PENDING, userId },
  });
  if (!order)
    throw new APIError(THROW_ERROR_MES.ORDER_NOTFOUND, httpStatus.NOT_FOUND);

  if (!userVoucherId) {
    const voucher = await OrderModel.update(
      { userVoucherId: null },
      { where: { id: orderId } }
    );
    await updateOrder(orderId);
    return voucher;
  }
  let now = new Date();
  now = now.toISOString();
  let query = `select v.id, v.type, v.minOrder, v.minQuantity, v.maxDiscount, v.discount 
                from userVoucher uv join voucher v on v.id=uv.voucherId
                where uv.id='${userVoucherId}' and (expired >= '${now}' or expired is null) and userId='${userId}'`;
  let voucher = await Sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  if (voucher.length != 1)
    throw new APIError(THROW_ERROR_MES.VOUCHER_NOTFOUND, httpStatus.NOT_FOUND);

  const res = await OrderModel.update(
    { userVoucherId },
    { where: { id: orderId } }
  );
  if (res) await updateOrder(orderId);
  else
    throw new APIError(
      THROW_ERROR_MES.UPDATE_ORDER_FAIL,
      httpStatus.IM_A_TEAPOT
    );
  return res;
};

const exchangeVoucher = async () => {
  const voucher = await VoucherModel.findAll();
  return voucher;
};

const payment = async (orderId, userId) => {
  const order = await OrderModel.findOne({
    where: { id: orderId, userId, status: ORDER_STATUS.PENDING },
  });
  if (!order)
    throw new APIError(THROW_ERROR_MES.ORDER_NOTFOUND, httpStatus.NOT_FOUND);

  await updateOrder(orderId);

  const t = await Sequelize.transaction();
  const res = await OrderModel.update(
    { status: ORDER_STATUS.DONE },
    { where: { id: orderId }, transaction: t }
  );

  if (!res) {
    t.rollback();
    throw new APIError(
      THROW_ERROR_MES.UPDATE_ORDER_FAIL,
      httpStatus.IM_A_TEAPOT
    );
  }

  await UserVoucherModel.destroy({
    where: { id: order.userVoucherId },
    transaction: t,
  });
  t.commit();
  return res;
};

export default {
  test,
  signup,
  login,
  getStore,
  getListProduct,
  getEvent,
  getProductById,
  addCart,
  updateOrder,
  deleteItem,
  updateOrderDetail,
  updateCart,
  getVoucher,
  getCategories,
  getVoucher2,
  deleteCart,
  addVoucher,
  exchangeVoucher,
  payment,
};
