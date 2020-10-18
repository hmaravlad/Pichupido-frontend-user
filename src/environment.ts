const LocalEnvironment: IEnvironment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
};

const DevEnvironment: IEnvironment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
};

const StageEnvironment: IEnvironment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
};

const ProdEnvironment: IEnvironment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
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

interface IEnvironment {
  clientUrl: string;
  adminUrl: string;
  baseApiUrl: string;
}
