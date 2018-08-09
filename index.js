require('dotenv').config();

const soap = require('soap');

const services = {
  Client: {
    url: 'https://api.mindbodyonline.com/0_5/ClientService.asmx?wsdl',
    endpoint: 'https://api.mindbodyonline.com/0_5/ClientService.asmx',
  },
  Site: {
    url: 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl',
    endpoint: 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx',
  },
};

const createSoapClient = (url, endpoint) =>
  new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) reject(err);
      else {
        client.setEndpoint(endpoint);
        resolve(client);
      }
    });
  });

const connectClientService = () =>
  createSoapClient(services.Client.url, services.Client.endpoint);

const connectSiteService = () =>
  createSoapClient(services.Site.url, services.Site.endpoint);

class MindBodyAPI {
  constructor(data = {}) {
    this.SourceCredentials = {
      SourceName: data.sourceName || process.env['MB_SOURCE_NAME'],
      Password: data.sourcePassword || process.env['MB_SOURCE_PASSWORD'],
      SiteIDs: {
        int: [data.siteID || process.env['MB_SITE_ID']],
      },
    };

    this.UserCredentials = {
      Username: data.username || process.env['MB_USERNAME'],
      Password: data.password || process.env['MB_PASSWORD'],
      SiteIDs: {
        int: [data.siteID || process.env['MB_SITE_ID']],
      },
    };
  }

  async GetActivationCode(siteID) {
    const client = await connectSiteService();

    const params = {
      Request: {
        SourceCredentials,
      },
    };

    return new Promise((resolve, reject) =>
      client.Site_x0020_Service.Site_x0020_ServiceSoap.GetActivationCode(
        params,
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        },
      ),
    );
  }
  async AddOrUpdateClients(Client) {
    const client = await connectClientService();

    const params = {
      Request: {
        SourceCredentials: this.SourceCredentials,
        UserCredentials: this.UserCredentials,
        Clients: {Client},
      },
    };

    return new Promise((resolve, reject) =>
      client.Client_x0020_Service.Client_x0020_ServiceSoap.AddOrUpdateClients(
        params,
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        },
      ),
    );
  }
  async GetClients(data = {}) {
    const client = await connectClientService();

    const params = {
      Request: {
        SourceCredentials: this.SourceCredentials,
        UserCredentials: this.UserCredentials,
        SearchText: data.searchText || data.SearchText || '',
      },
    };

    for (let key in data) {
      if (!params.Request.hasOwnProperty(key)) {
        params.Request[key] = data[key];
      }
    }

    return new Promise((resolve, reject) =>
      client.Client_x0020_Service.Client_x0020_ServiceSoap.GetClients(
        params,
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        },
      ),
    );
  }
}

module.exports = MindBodyAPI;
