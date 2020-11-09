import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

interface DecodedId {
  id: string
}

export default {
  async execute(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader)
      return response.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    console.log(parts);

    if(!(parts.length === 2)){
      return response.status(401).send({ error: 'Token error' });}

    const [ schema, token ] = parts;

    if (!/^Bearer$^/i.test(schema)){
      console.log(schema, token);
      return response.status(401).send({ error: 'Token malformato' })};

    try {
      jwt.verify(token, authConfig.jwt.auth) as DecodedId;
      
      next();
    } catch (error) {
      return response.status(401).send({ error: 'Token invalid' });
    }
  }
}