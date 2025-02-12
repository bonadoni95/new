import { verifyToken } from '@/utils/jwt';
import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(403).json({
      code: 403,
      message: 'You are not allowed to access this endpoint',
    });
  }

  const userToken = authToken.split(' ')[1];
  if (!userToken) {
    return res.status(403).json({
      code: 403,
      message: 'You are not allowed to access this endpoint',
    });
  }

  const verifyTokenResult = verifyToken(userToken);

  if (!verifyTokenResult.isValid) {
    return res.status(403).json({
      code: 403,
      message: 'Invalid Token',
    });
  }

  const { id, username, email, role } = verifyTokenResult.data;

  const isStoreAdmin = role === 'storeAdmin';
  const isSuperAdmin = role === 'superAdmin';

  req.body = { id, username, email, role, authToken, ...req.body };

  next();
};
