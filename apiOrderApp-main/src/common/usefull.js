const getUserFromHeader = (req) => {
  let token = req.header("Authorization");
  if (token && token.startsWith("Bearer ")) {
    token = token.substring(7, token.length);
  }
  return token || null;
};

export default {getUserFromHeader} ;
