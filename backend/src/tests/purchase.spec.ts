import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import chaiSubset from 'chai-subset';

use(chaiHttp);
use(chaiSubset);

interface PurchaseTest {
  id: Number,
  purchaseNumber: string, 
  state: string, 
  purchaseList: string
}

const purchaseSchame = {
  user: (user: PurchaseTest) => user
};

const baseURL = 'http://localhost:3333';

describe('# TEST - Purchase', () => {
  it('- Creating new purchase on the platform.', () => {
    request(baseURL)
      .post('/purchases/purchase')
      .send({
        purchaseNumber: '60-25112020115145', 
        state: 'Lista de Espera', 
        purchaseList: '1kg de Arroz ...',
        id: 60
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.containSubset(purchaseSchame);
    });
  });

  it('- Showing purchase on the platform', () => {
    request(baseURL)
      .get('/purchases/purchase/19')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.containSubset(purchaseSchame);
      });
  });
});