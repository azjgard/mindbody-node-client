# Mind Body API - Node.js Client

I couldn't find a client
implemented in Node for the [Mind Body](https://developers.mindbodyonline.com)
API beyond [this long-forgotten PR](https://github.com/mindbody/API-Examples/pull/6/files), so I took that PR and used it as the basis for creating what
you now see before you.

As you can see, the codebase currently only handles a couple of endpoints,
(the ones that I used in my project) and has only two tests written (which are
designed to serve more as examples than anything else).

Additionally, everything is currently in one file; I imagine that if we
added more endpoints that we'd need to modularize things a bit to avoid
a bit of a mess, but that wouldn't be hard at all should the need arise.

Feel free to contribute!

## Supported Endpoints

#### [Client Service](https://developers.mindbodyonline.com/PublicDocumentation/ClientService?version=v5.1)

* AddOrUpdateClients
* GetClients

#### [Site Service](https://developers.mindbodyonline.com/PublicDocumentation/SiteService?version=v5.1)

* GetActivationCode

## Installation

`npm install --save mindbody-node-client`

## Standard Usage (Env. Variables)

```javascript
const MindBodyAPI = require('mindbody-node-client');
const mindBodyAPI = new MindBodyAPI();

mindBodyAPI.GetClients().then(result => {
  console.log(result);
  // do some stuff with the client
});
```

By default, the library will use the environment variables listed
further down on this page.

However, you can also explicitly pass in your credentials when you're
creating an instance of the module. These will always overwrite your env.
variables (if present).

## Explicit Usage (Config. Object)

```javascript
const MindBodyAPI = require('mindbody-node-client');
const mindBodyAPI = new MindBodyAPI({
  sourceName: 'foo',
  sourcePassword: 'bar',
  siteID: '-99',
  username: 'foo',
  password: 'bar',
});

mindBodyAPI.GetClients().then(result => {
  console.log(result);
  // do some stuff with the client
});
```

## Environment Variables

* SourceCredentials
  > * Name: MB_SOURCE_NAME
  > * Password: MB_SOURCE_PASSWORD

- UserCredentials
  > * Username: MB_USERNAME
  > * Password: MB_PASSWORD
