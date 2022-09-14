/**
 * . Verify if the route has access
 * . Verify if the access is public
 * . Verify if the token exist
 * . If token exist check the token
 * . If token is ok then proceed
 */
 import { decrypt } from "../tools/encryption";
 import boom from "@hapi/boom";
 import AccessService from "../services/access.service";
 import errorCodes from "../config/errorCodes";
 
 const service = new AccessService();
 
 const authHandler = async (req, res, next) => {
   try {
     const access = await service.findOne({
       pathname: req._parsedUrl.pathname,
     });
     if (access) {
       if (access.isPublic) {
         next();
       } else {
         let token = req.headers.token;
         const user = decrypt(token);
         if (user) {
           req.user = user;
           next();
         } else {
           next(boom.badData(errorCodes.BAD_TOKEN.name, errorCodes.BAD_TOKEN));
         }
       }
     } else {
       next(
         boom.forbidden(errorCodes.FORBIDDEN.name, errorCodes.FORBIDDEN)
       );
     }
   } catch (error) {
     next(error);
   }
 };
 
 export default authHandler;
 