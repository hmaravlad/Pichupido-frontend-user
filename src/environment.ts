const LocalEnvironment: Environment = {
  clientUrl: 'http://localhost:8082',
  adminUrl: 'http://localhost:8083',
  // baseApiUrl: 'https://pichupido.herokuapp.com',
  baseApiUrl: 'http://localhost:3001',
  stripePublicKey: 'pk_test_51HkDmOD2ybAp44H75JWAC5zRY7SAd5Pqm1qBkme5WwMJ6hmOITBsFpEUyFPqhbzJpHeJeYka5Bzb7okJVneYeVTQ00Qg4q6TEZ',
};

const DevEnvironment: Environment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
  stripePublicKey: 'pk_test_51HkDmOD2ybAp44H75JWAC5zRY7SAd5Pqm1qBkme5WwMJ6hmOITBsFpEUyFPqhbzJpHeJeYka5Bzb7okJVneYeVTQ00Qg4q6TEZ',
};

const StageEnvironment: Environment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
  stripePublicKey: 'pk_test_51HkDmOD2ybAp44H75JWAC5zRY7SAd5Pqm1qBkme5WwMJ6hmOITBsFpEUyFPqhbzJpHeJeYka5Bzb7okJVneYeVTQ00Qg4q6TEZ',
};

const ProdEnvironment: Environment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'https://pichupido.herokuapp.com',
  stripePublicKey: 'pk_test_51HkDmOD2ybAp44H75JWAC5zRY7SAd5Pqm1qBkme5WwMJ6hmOITBsFpEUyFPqhbzJpHeJeYka5Bzb7okJVneYeVTQ00Qg4q6TEZ',
};

function configureEnvironment() {
  // eslint-disable-next-line no-console
  console.log('Current env: ', process.env.VUE_APP_ENV);
  // eslint-disable-next-line no-console

  switch (process.env.VUE_APP_ENV) {
    case 'dev':
      return DevEnvironment;
    case 'stage':
      return StageEnvironment;
    case 'prod':
      return ProdEnvironment;
    default:
      return LocalEnvironment;
  }
}

const Environment = configureEnvironment();

export default Environment;

interface Environment {
  clientUrl: string;
  adminUrl: string;
  baseApiUrl: string;
  stripePublicKey: string;
}
