import { Request, Response, NextFunction } from 'express';

export default {
  async show(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    console.log(authHeader);

    // if(!authHeader)
    //   return response.status(401).send({ error: 'No token provided' });

    // const parts = authHeader.split(' ');

    // if(!(parts.length === 2))
    //   return response.status(401).send({ error: 'Token error' });

    // const [ schema, token ] = parts;

    // if (!/^Bearer$^/i.test(schema))
    //   return response.status(401).send({ error: 'Token malformato' });

    // jwt.verify(token, authConfig.auth, (err, decoded) => {
    //   if (err) return response.status(401).send({ error: 'Token invalid' });
    
    //   next();
    // });
  }
}