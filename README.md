# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you are using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to make sure you are using the same version of Node locally and in your lambda runtime.

### Using NPM

- Run `npm i` to install the project dependencies.
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Endpoint

This template contains lambda functions triggered by HTTP requests made by the Gateway REST API. The request body must be provided as `application/json`. The body structure is checked by API Gateway with the JSON schema definition in the `/schemes` path.

For a clearer documentation of the endpoints, the postman data is left at the following url: https://documenter.getpostman.com/view/12147069/UV5Xgwja

- requesting any other path not defined in the documentation will cause API Gateway to return a `403` HTTP error code.
- To send the request, set in the HEADER of the query an {"Authorization": "123456789"} which is used to validate the user authentication.


### Locally

To test locally, run the following command:





### Third-party libraries

- json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses the JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda handler codebase.
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert the `event.body` property of the Gateway API, originally passed as a chained JSON, to its corresponding parsed object
- @serverless/typescript](https://github.com/serverless/typescript) - provides updated TypeScript definitions for your `serverless.ts` service file.
- aws-xray-sdk](https://www.npmjs.com/package/aws-xray-sdk) - The AWS X-Ray SDK automatically records information for incoming and outgoing requests and responses (via middleware), as well as local data such as function calls, time, variables (via metadata and annotations), even EC2 instance data (via plugins).
- mongoid-js](https://www.npmjs.com/package/aws-xray-sdk) - Generates unique id strings. The ids are constructed like MongoDB document ids, built out of a timestamp, system id, process id and sequence number. Similar to BSON.ObjectID(), but at 12 million ids / sec, 35 x faster. Example for get data for id generated:
```
var parts = MongoId.parse("543f376340e2816497000013");
// => { timestamp: 1413429091, // 0x543f3763
// machineid: 4252289, // 0x40e281
// pid: 25751, // 0x6497
// sequence: 19 } // 0x000013
```
- [@shelf/jest-dynamodb](https://github.com/shelfio/jest-dynamodb) - Used to map dynamoDB data when doing unit tests without needing to connect to dynamo locally.
- eslint](https://github.com/eslint/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions:
-ESLint uses Espree for JavaScript parsing.
-ESLint uses an AST to evaluate patterns in code.
-ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.
- prettier](https://github.com/prettier/prettier) - Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
- husky](https://www.npmjs.com/package/husky) - Package used to run certain commands before doing a git commit, in this project we use them to run `npm test` and `npm run pretest` for unit tests and validate the format with eslint and prettier.
- serverless-iam-roles-per-function](https://www.npmjs.com/package/serverless-iam-roles-per-function) - A Serverless plugin to easily define IAM roles per function via the use of iamRoleStatements at the function definition block.
- [serverless-plugin-warmup](https://github.com/juanjoDiaz/serverless-plugin-warmup) - WarmUp resuelve los arranques en frío creando una lambda programada (el calentador) que invoca todas las lambdas del servicio seleccionado en un intervalo de tiempo configurado (por defecto: 5 minutos) y forzando a sus contenedores a permanecer calientes.

### Uso avanzado

Se puede utilizar cualquier tsconfig.json, pero si lo haces, establece la variable de entorno `TS_NODE_CONFIG` para construir la aplicación, por ejemplo `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`.
