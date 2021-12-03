import Service from "./service.js";
import { APISuccess } from "../common/api-res.js";
import usefull from "../common/usefull.js";

// const getUserFromHeader = (req) => {
//   let token = req.header("Authorization");
//   if (token && token.startsWith("Bearer ")) {
//     token = token.substring(7, token.length);
//   }
//   return token || null;
// };

const test = async (req, res, next) => {
  // let userId = usefull.getUserFromHeader(req);
  const { orderId } = req.query;
  Service.updateOrder(orderId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

//------------------------USER
const signup = async (req, res, next) => {
  const { firstName, lastName, phone, password } = req.body;
  Service.signup(firstName, lastName, phone, password)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const login = async (req, res, next) => {
  const { phone, password } = req.body;
  Service.login(phone, password)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

//------------------------IMPORTANT LIST
const getStore = async (req, res, next) => {
  Service.getStore()
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const getEvent = async (req, res, next) => {
  Service.getEvent()
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const getVoucher = async (req, res, next) => {
  const userId = usefull.getUserFromHeader(req);
  Service.getVoucher(userId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const getVoucher2 = async (req, res, next) => {
  // const userId = usefull.getUserFromHeader(req);
  Service.getVoucher2()
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

//---------------------------------PRODUCT
const getListProduct = async (req, res, next) => {
  const { categoryId } = req.query;
  Service.getListProduct(categoryId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  Service.getProductById(id)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const getCategories = async (req, res, next) => {
  Service.getCategories()
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

//------------------------CART
const addCart = async (req, res, next) => {
  const userId = usefull.getUserFromHeader(req);
  const { size, quantity, toppingId } = req.body;
  const { productId } = req.params;
  Service.addCart(productId, size, quantity, toppingId, userId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const deleteItem = async (req, res, next) => {
  const userId = usefull.getUserFromHeader(req);
  const { orderDetailId } = req.params;
  Service.deleteItem(orderDetailId, userId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const updateCart = async (req, res, next) => {
  const userId = usefull.getUserFromHeader(req);
  const { orderDetailId } = req.params;
  const { quantity } = req.query;
  Service.updateCart(orderDetailId, quantity, userId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const deleteCart = async (req, res, next) => {
  const userId = usefull.getUserFromHeader(req);
  const { id } = req.params;
  Service.deleteCart(id, userId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const addVoucher = async (req, res, next) => {
  const userId = usefull.getUserFromHeader(req);
  const { orderId, userVoucherId } = req.body;
  Service.addVoucher(orderId, userVoucherId, userId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const exchangeVoucher = async (req, res, next) => {
  Service.exchangeVoucher()
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
};

const payment = async (req, res, next) => {
  const userId = usefull.getUserFromHeader(req);
  const { orderId } = req.params;
  Service.payment(orderId, userId)
    .then((data) => {
      return new APISuccess(res, {
        data: data,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ message: err.message });
    });
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
  deleteItem,
  updateCart,
  getVoucher,
  getCategories,
  getVoucher2,
  deleteCart,
  addVoucher,
  exchangeVoucher,
  payment,
};
