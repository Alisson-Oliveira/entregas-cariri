import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import authConfig from '../config/auth';

import UserView from '../views/UserViews';

// function generationTokin(params = {}) {
//   return jwt.sign(params, authConfig.jwt.auth, {
//     expiresIn: 86400,
//   });
// }

export default {
  async show(request: Request, response: Response)  {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) 
      return response.status(400).send({ error: 'User not found.' });

    if (!await bcrypt.compare(password, user.password))
      return response.status(400).send({ error: 'Invalid password.' });

    return response.json({ user: UserView.render(user) }); 
    // return response.json({ 
    //   user, 
    //   token: generationTokin({ id: user.id })
    // });  
  },

  async index(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usersRepository = getRepository(User);
  
      const user = await usersRepository.findOneOrFail(id);
  
      return response.status(201).json(UserView.render(user));      
    } catch (error) {
      console.error('Error seaching user - ' + error); 

      return response.status(401).json({ message: 'Error seaching user' }); 
    }
  },

  async create(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        address,
      } = request.body;
  
      const password = await bcrypt.hash(request.body.password, 10);
  
      const usersRepository = getRepository(User);
  
      const data = {
        name,
        email,
        address,
        password,
      }
  
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        address: Yup.string().required(),
        password: Yup.string().required(),
      });
  
      await schema.validate(data, { 
        abortEarly: false,
      });
  
      const user = usersRepository.create(data);
  
      await usersRepository.save(user);
      
      return response.status(201).json({ user: UserView.render(user) });       
      // return response.status(201).json({ 
      //   user: UserView.render(user), 
      //   token: generationTokin({ id: user.id })
      // });      
    } catch (error) {
      console.error('Error creating user - ' + error); 

      return response.status(401).json({ message: 'Error creating user' });      
    }
  },
}