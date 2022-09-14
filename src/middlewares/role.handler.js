/**
 * 1.Verify fi the route is accesible by user
 */

import boom from "@hapi/boom";
import errorCodes from "../config/errorCodes";
import AccessService from "../services/access.service";

const service = new AccessService();

const roleHandler = async (req, res, next) => {
  try {
    const access = await service.findOne({
      pathname: req._parsedUrl.pathname,
    });
    if (access.isPublic) {
      next();
    } else {
      const isAllowed = access[`${req.method}`].some(
        (e) => e === req.user.role
      );
      if (isAllowed) {
        next();
      } else {
        next(boom.forbidden(errorCodes.FORBIDDEN.name, errorCodes.FORBIDDEN));
      }
    }
  } catch (error) {
    next(boom.forbidden(errorCodes.FORBIDDEN.name, errorCodes.FORBIDDEN));
  }
};

export default roleHandler;
