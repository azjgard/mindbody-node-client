require('dotenv').config();

const assert = require('assert');
const MB = require('./index');
const MindBodyAPI = new MB();

const randomString = x =>
  Math.random()
    .toString(36)
    .slice(-1 * x);

describe('Client Service', function() {
  describe('AddOrUpdateClients', function() {
    it('should successfully create a new client', async function() {
      this.timeout(5000);

      const randomEmail = `${randomString(8)}@test.com`;

      const result = await MindBodyAPI.AddOrUpdateClients({
        Email: randomEmail,
        Username: randomEmail,
        FirstName: 'Foo',
        LastName: 'Bar',
        Password: randomString(8),
        ReferredBy: 'Other',
        AddressLine1: '222 W Foo',
        City: 'Bar',
        State: 'TX',
        Country: 'US',
        BirthDate: new Date().toISOString(),
      }).catch(e => console.error);

      assert.equal('Success', result.AddOrUpdateClientsResult.Status);
    });
  });

  describe('GetClients', function() {
    it('should successfully return a list of clients', async function() {
      this.timeout(5000);

      const result = await MindBodyAPI.GetClients();

      assert.equal('Success', result.GetClientsResult.Status);
    });
  });
});
