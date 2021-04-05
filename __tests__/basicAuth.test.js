/* eslint-disable indent */

'use strict';

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
const base64 = require('base-64');



describe('api server', () => {
  it('should be able to create a user on POST /signup', async () => {
    const response = await request.post('/signup').send({
      username: "haneen",
      password: "1234",
    });
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('haneen');
    
  });

  it('should be able to signin on POST /signin', async () => {
    const string = 'haneen:1234';
    const user = base64.encode(string);
    let response = await request.post('/signin')
      .set(`Authorization`, `Basic ${user}`);
    expect(response.body.username).toEqual('haneen');
    expect(response.status).toEqual(200);
    
    
  });

  it('handle server errors', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(404);
  });

  it('handle method errors', async () => {
      const response = await request.post('/');
      expect(response.status).toEqual(404);
    });

    
});


