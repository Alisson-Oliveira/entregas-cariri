import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default {
  async execute(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader)
      return response.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if(!(parts.length === 2)){
      return response.status(401).send({ error: 'Token error' });}

    const [ , token ] = parts;

    try {
      const decoded = jwt.verify(token, authConfig.jwt.auth);
      
      const { sub } = decoded as TokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch (error) {
      return response.status(401).send({ error: 'Token invalid' });
    }
  }
}