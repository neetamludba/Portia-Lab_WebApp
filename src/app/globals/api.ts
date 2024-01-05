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

};

export const SaveService = async (
  route: string,
  body: any,
  method: string = 'POST'
) => {
  let url = environment.webService + route;

  let config = getConfiguration(body, method);

 

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
