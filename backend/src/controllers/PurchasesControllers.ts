import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import PurchaseView from '../views/PurchaseView';

import Purchase from '../models/Purchase';
import User from '../models/User';

export default {
  async details(request: Request, response: Response) {
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

      const waitList = await getRepository(Purchase)
        .createQueryBuilder('purchases')
        .where('purchases.userId = :id', { id })
        .andWhere('purchases.state = :state', { state: 'Lista de Espera' })
        .getCount();

      const canceled = await getRepository(Purchase)
        .createQueryBuilder('purchases')
        .where('purchases.userId = :id', { id })
        .andWhere('purchases.state = :state', { state: 'Cancelado' })
        .getCount();
          
      return response.status(201).json({currenty, completed, waitList, canceled});      
    } catch (error) {
      console.error('Error currenty and completed purchese - ' + error);

      return response.status(401).json('Error currenty and completed purchese');;       
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
      console.error('Error seaching purcheses - ' + error);

      return response.status(401).json('Error seaching purcheses');       
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
  
      if (purchaseNumber || state || purchaseList || id) {
        return response.status(401).json('Error creating purchese'); 
      }

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

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const purchaseRepository = getRepository(Purchase);

      const purchase = await purchaseRepository.findOneOrFail(id);

      return response.status(201).json(PurchaseView.render(purchase));    
    } catch (error) {
      console.error('Error seaching purchese - ' + error);

      return response.status(401).json('Error seaching purchese');  
    }
  },

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const purchaseRepository = getRepository(Purchase);

      const purchase = await purchaseRepository.findOne({
        where: { id }
      });
      
      const data = { ...purchase, state: 'Concluído' };

      purchaseRepository.save({
        ...purchase, // existing fields
        ...data // updated fields
      });

      return response.status(201).json({ message: 'Purchase updated' });
    } catch (error) {
      console.error('Error currenty and completed purchese - ' + error);

      return response.status(401).json('Error currenty and completed purchese');
    }
  },

  async cancel(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const purchaseRepository = getRepository(Purchase);

      const purchase = await purchaseRepository.findOne({
        where: { id }
      });
      
      const data = { ...purchase, state: 'Cancelado' };

      purchaseRepository.save({
        ...purchase, // existing fields
        ...data // updated fields
      });

      return response.status(201).json({ message: 'Purchase canceled' });
    } catch (error) {
      console.error('Error currenty and canceled purchese - ' + error);

      return response.status(401).json('Error currenty and canceled purchese');
    }
  }
}