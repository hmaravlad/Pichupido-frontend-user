import Environment from '@/environment';

import axios from 'axios';

class Http {
  public service: any;

  public token: unknown;

  constructor() {
    this.setAxios();
  }

  public post(path: string, payload: unknown) {
    return this.service
      .post(path, payload)
      .then((res: Response) => this.handleSuccess(res))
      .catch((err: Error) => this.handleError(err));
  }

  public get(path: string) {
    return this.service
      .get(path)
      .then((res: Response) => this.handleSuccess(res))
      .catch((err: Error) => this.handleError(err));
  }

  public put(path: string, payload: unknown) {
    return this.service
      .put(path, payload)
      .then((res: Response) => this.handleSuccess(res))
      .catch((err: Error) => this.handleError(err));
  }

  public delete(path: string) {
    return this.service
      .delete(path)
      .then((res: Response) => this.handleSuccess(res))
      .catch((err: unknown) => this.handleError(err));
  }

  private handleSuccess(res: any) {
    return res.data;
  }

  private handleError(err: any) {
    console.info(err.response.data.error);
    throw err.response.data.error || 'Oops something bad just happen, pls contact us';
  }

  public setAxios() {
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.service = axios.create({
      baseURL: Environment.baseApiUrl,
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    });
  }
}

export default new Http();
