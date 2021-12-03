import logger from "logger";
import UserModel from "../model/user.js";

const authCheck = async (req, res, next) => {
  // Remove last slash
  const path = req.path.endsWith("/") ? req.path.slice(0, -1) : req.path;
  const method =
    req.method === "GET" ||
    req.method === "DELETE" ||
    req.method === "PUT" ||
    req.method === "POST";

  // if (path === "/test") {
  //   next();
  //   return;
  // }
  if (path === "/user/signup") {
    next();
    return;
  }

  if (path === "/user/login") {
    next();
    return;
  }

  if (path === "/store") {
    next();
    return;
  }

  if (path === "/event") {
    next();
    return;
  }

  if (path === "/category") {
    next();
    return;
  }

  if (path === "/order/exchange-voucher") {
    next();
    return;
  }

  if (path.slice(0, 8) === "/product") {
    next();
    return;
  }

  if (path === "/voucher2") {
    next();
    return;
  }

  // Get x-auth-token in header
  var token = req.header("Authorization");
  if (token && token.startsWith("Bearer ")) {
    token = token.substring(7, token.length);
    const auth = await UserModel.findOne({ where: { id: token } });
    if (auth) {
      next();
      return;
    }
  }

  res.status(401).json({
    error: {
      message: "The user is not authorized to make the request.",
    },
  });
  // Check authentization

  // checkAuthorization(method, token, path)
  //   .then((authorization) => {
  //     if (authorization.unauthorized) {
  //       // 401 - Unauthorized
  //       res.status(401).json({
  //         error: {
  //           message: "COMMON_ERR_016",
  //           errors: [
  //             {
  //               messages: ["The user is not authorized to make the request."],
  //             },
  //           ],
  //         },
  //       });
  //     } else if (authorization.forbidden) {
  //       // 403 - Forbidden
  //       res.status(403).json({
  //         error: {
  //           message: "COMMON_ERR_017",
  //           errors: [
  //             {
  //               message: [
  //                 "The requested operation is forbidden and cannot be completed.",
  //               ],
  //             },
  //           ],
  //         },
  //       });
  //     } else {
  //       // Authorized
  //       logger.error(
  //         "Login successfully: " + JSON.stringify(authorization.user)
  //       );
  //       req.user = authorization.user;
  //       req.session = authorization.session;
  //       next();
  //     }
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
};

// const checkAuthorization = function (method, accessToken, path) {
//   return new Promise((resolve, reject) => {
//     let authorization = {
//       unauthorized: true,
//       forbidden: false,
//       user: {},
//       message: {},
//     }

//     if (accessToken) {
//       const cacheKey = `accessToken:${accessToken}`
//       if (cacheService.has(cacheKey)) {
//         authorization = cacheService.get(cacheKey)
//         authorization.unauthorized = false
//         cacheService.set(`accessToken:${accessToken}`, authorization, 10 * 60)
//         resolve(authorization)
//       } else {
//         const accessTokenSecret = config.ACCESS_TOKEN_SECRET
//         jwtHelper
//           .verifyToken(accessToken, accessTokenSecret)
//           .then(async response => {
//             authorization.unauthorized = false
//             const user = response.data
//             authorization.user = user
//             cacheService.set(
//               `accessToken:${accessToken}`,
//               authorization,
//               10 * 60
//             )
//             resolve(authorization)
//           })
//           .catch(err => {
//             authorization.unauthorized = false
//             authorization.message = err
//             cacheService.set(
//               `accessToken:${accessToken}`,
//               authorization,
//               10 * 60
//             )
//             reject(authorization)
//           })
//       }
//     } else {
//       authorization.unauthorized = true
//       cacheService.set(`accessToken:${accessToken}`, authorization, 10 * 60)
//       resolve(authorization)
//     }
//   })
// }

export default authCheck;
