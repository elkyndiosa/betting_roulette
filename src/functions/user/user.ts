import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import middyfy from '@libs/lambda';
import HelloType from 'src/structures/hello.type';
import MySchema from 'schemes/mySchema';
import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import { Table } from 'dynamodb-onetable';
import client from '@libs/dynamoDBORM';

const create: ValidatedEventAPIGatewayProxyEvent<HelloType> = async (): Promise<Response> => {
  try {
    const table = new Table({
      client,
      name: 'user-local',
      schema: MySchema,
    });
    const User = table.getModel('User');//Se obtiene el modelo User definido en el esquema

    const id = '8e7bbe6a-4afc-4117-9218-67081afsc935b';
    const city = 'Acme medellin';
    /* FUNCION PARA CREAR UN USUARIO */
    /* const user = await User.create(
      {
        id: '8e7bbe6a-4afc-4117-9218-67081afsc935b',
        city: 'Acme bogota',
        data: 'test',
      },
      { log: true },
    );
    console.log('usuario creado', user); */
    /* FIN FUNCION PARA CREAR UN USUARIO */

    /* FUNCION PARA UN SOLO USUARIO POR ID Y SORT  */
    /* const user = await User.get({
      id: '8e7bbe6a-4afc-4117-9218-67081afsc935b',
      city: 'Acme barranquilla',
    }); */
    /* FIN FUNCION PARA UN SOLO USUARIO POR ID Y SORT  */

    /* FUNCION 'FIND' PARA UNO O VARIOS REGISTROS POR ID Y SE LE PUEDE AÑADIR LA BUSQUEDA
    POR ALGUN OTRO CAMPO  */
    /* const users = await User.find({ id, data: 'tesst2' }); */
    /* let users = await User.find(
       { id },
       {
         where: '${data} = {"tesst22"}',
       },
    ); */
    /* FIN FUNCION FIND */

    /* const users = await User.find({ id }, { count: true });
    console.log(users);
    const { count } = users; */

    /* FUNCION 'UPDATE' PARA ACTUALIZAR UN REGISTRO POR ID Y POR SORT */
    /* await User.update({ id, data: 'tesst2' }); NO SABEMOS QUE ES */
    /* await User.update({ id, city }, { add: { balance: 10.0 } }); //add = suma la cantidad en el campo especificado */
    /* await User.update({ id, city }, { set: { status: '{active}' } });//set = actualiza el valor del campo */

    /* let transaction = {};
    await User.update({ id, city }, { transaction });
    await table.transact('write', transaction);*/
    const users = await User.scan({});
    return successResponse({
      message: `Hello, welcome to the exciting Serverless world!`,
      users,
    });
  } catch (error) {
    console.log('error', error);

    return errorResponse({
      message: `Hello, welcome to the exciting Serverless world!`,
      error,
    });
  }
};

export const main = middyfy(create);