import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
  async execute(request: Request, response: Response)  {
    const { email } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    return user ? response.status(200).send({ notExist: true }) : response.status(200).send({ notExist: false });
  }
}