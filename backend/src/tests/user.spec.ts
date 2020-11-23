import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import chaiSubset from 'chai-subset';

use(chaiHttp);
use(chaiSubset);

interface UserTest {
  id: Number
  name: string,
  email: string,
  address: string
}

const userTokenSchame = {
  user: (user: UserTest) => user, 
  token: (token: string) => token
};

const userSchame = {
  user: (user: UserTest) => user
};

const baseURL = 'http://localhost:3333';

describe('# TEST - User', () => {
  it('- Creating new user on the platform.', () => {
    request(baseURL)
      .post('/register')
      .send({
        name: 'Alisson Oliveira',
        email: 'test@test.com',
        address: 'Rua Ana Loiola',
        password: '01234567'
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.containSubset(userTokenSchame);
    });
  });

  it('- Authenticating user on the platform', () => {
    request(baseURL)
      .post('/authenticate')
      .send({
        email: 'test@test.com',
        password: '01234567'
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.containSubset(userTokenSchame);
      });
  });

  it('- Showing user on the platform', () => {
    request(baseURL)
      .get('/users/20')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.containSubset(userSchame);
      });
  });
});