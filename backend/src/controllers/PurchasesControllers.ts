import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Purchase from '../models/Purchase';
import User from '../models/User';

export default {
  async index(request: Request, response: Response) {
    const { id } = request.params;

    const allPurchases = await getRepository(User)
                                  .createQueryBuilder('users')
                                  .leftJoinAndSelect('users.purchases', 'purchase')
                                  .where('purchase.userId = :id', {id})
                                  .getOne();

    return response.json(allPurchases);
  },

  async create(request: Request, response: Response) { 
    try {
      const { 
        purchaseNumber, 
        state, 
        purchaseList,
        id
      } = request.body;
  
      const userRepository = getRepository(User);
      const purchaseRepository = getRepository(Purchase);
  
      const user = await userRepository.findOneOrFail(id);

      const data = {
        purchaseNumber,
        state,
        purchaseList,
        user
      }

      const schema = Yup.object().shape({
        purchaseNumber: Yup.string().required(),
        state: Yup.string().required(),
        purchaseList: Yup.string().required(),
        user: Yup.object().shape({ 
          id: Yup.string().required(),
          name: Yup.string().required(),
          address: Yup.string().required(),
          email: Yup.string().required(),
          password: Yup.string().required(),          
        }) as any,
      });
  
      await schema.validate(data, { 
        abortEarly: false,
      });
  
      const purchase = purchaseRepository.create(data);
  
      await purchaseRepository.save(purchase);
    
      return response.status(201).send();      
    } catch (error) {
      console.error('Error creating purchese - ' + error);

      return response.status(401).json('Error creating purchese');       
    }
  },
}