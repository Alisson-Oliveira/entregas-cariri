import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import PurchaseView from '../views/PurchaseView';

import Purchase from '../models/Purchase';
import User from '../models/User';

export default {
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const currenty = await getRepository(Purchase)
        .createQueryBuilder('purchases')
        .where('purchases.userId = :id', { id })
        .andWhere('purchases.state = :state', { state: 'Em andamento' })
        .getCount();

      const completed = await getRepository(Purchase)
        .createQueryBuilder('purchases')
        .where('purchases.userId = :id', { id })
        .andWhere('purchases.state = :state', { state: 'Concluído' })
        .getCount();
        
      return response.status(201).json({currenty, completed});      
    } catch (error) {
      console.error('Error currenty and completed purchese - ' + error);

      return response.status(401).json('Error currenty and completed purchese');       
    }
  }, 

  async index(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const purchases = await getRepository(Purchase)
                                .createQueryBuilder('purchases')
                                .where('purchases.userId = :id', {id})
                                .getMany();
  
      return response.status(201).json(PurchaseView.renderMany(purchases));      
    } catch (error) {
      console.error('Error seaching purchese - ' + error);

      return response.status(401).json('Error seaching purchese');       
    }
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
    
      return response.status(201).json({ message: 'Purchase completed' });      
    } catch (error) {
      console.error('Error creating purchese - ' + error);

      return response.status(401).json('Error creating purchese');       
    }
  },
}