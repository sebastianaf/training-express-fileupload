const errorCodes = {
  BAD_USER_OR_PASSWORD: {
    name: `Authentication error`,
    message: `Invalid password or alias`,
  },
  NOT_FOUND: {
    name: `Not found`,
    message: `The element wasn't found, possibly it never exist or it's already deleted`,
  },
  BAD_TOKEN: {
    name: `Invalid token`,
    message: `Error reading the token data`,
  },
  UNAUTHORIZED: {
    name: `Not authenticated`,
    message: `Request couldn't be aswered because you do not have credentials`,
  },
  FORBIDDEN: {
    name: `Not authorized`,
    message: `Resquest couldn't be aswered because you are not allowed to access this resorce`,
  },
};

export default errorCodes;
