import { AccountService } from 'app/account/account.service';
import { environment } from '../../environments/environment';
import { InjectorInstance } from '../app.module';

const getConfiguration = (body: any, method: string) => {
  const accountService = InjectorInstance.get<AccountService>(AccountService);

  const hdrs = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let finalHdrs = {};

  if (accountService.userValue)
    finalHdrs = { ...hdrs, Authorization: `Bearer ${accountService.token}` };
  else finalHdrs = { ...hdrs };

  if (body)
    return {
      method: method,
      body: JSON.stringify(body),
      headers: finalHdrs,
    };
  else
    return {
      method: method,
      headers: finalHdrs,
    };
};

export const GetService = async (route: string) => {
  try {
    let url = environment.webService + route;
    const config = getConfiguration(null, 'GET');
    const response = await fetch(url, config);

    if (response.ok) {
      return await response.json();
    }

    if (response.status === 401) {
      throw new Error('You are unauthorized.');
    }

    const errorResponse = await response.json();
    throw errorResponse;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }

  // let url = environment.webService + route;

  // var config = getConfiguration(null, 'GET');

  // return fetch(url, config)
  //   .then(async (response) => {
  //     if (response.ok) return Promise.resolve(response.json());

  //     if (!response.ok && response.status == 401) {
  //       throw 'You are unauthorized.';
  //     }

  //     return Promise.resolve(response.json()).then((responseInJson) => {
  //       // This will end up in ERROR part
  //       return Promise.reject(responseInJson);
  //     });
  //   })
  //   .then(function (result) {
  //     // console.log('API response1 ==>' + JSON.stringify(result));
  //     return result;
  //   })
  //   .catch(function (error) {
  //     console.log('Error: ', error);
  //     console.log('Error: ' + JSON.stringify(error));

  //     if (error.Message === undefined) {
  //       // errorHandler(error);
  //       return;
  //     }
  //     if (error.Message !== null) {
  //       // errorHandler(error.Message);
  //       return;
  //     }
  //   });
};

export const SaveService = async (
  route: string,
  body: any,
  method: string = 'POST'
) => {
  let url = environment.webService + route;

  var config = getConfiguration(body, method);

  // return fetch(url, config)
  //   .then(async (response) => {
  //     // this needs to be fixed
  //     if (response.ok) {
  //       const resp = response.json();
  //       console.log({ resp });
  //       return Promise.resolve(resp);
  //     }

  //     if (!response.ok && response.status == 401) {
  //       throw 'You are unauthorized.';
  //     }

  //     return Promise.resolve(response.json()).then((responseInJson) => {
  //       // This will end up in ERROR part
  //       return Promise.reject(responseInJson);
  //     });
  //   })
  //   .then((result) => {
  //     return result;
  //   })
  //   .catch((error) => {
  //     console.log('Error: ' + JSON.stringify(error));

  //     throw error;
  //   });

  try {
    const response = await fetch(url, config);

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }

    if (response.status === 401) {
      throw new Error('You are unauthorized.');
    }

    const errorResponse = await response.json();
    throw errorResponse;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
};
