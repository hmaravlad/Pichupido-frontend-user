const LocalEnvironment: Environment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
};

const DevEnvironment: Environment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
};

const StageEnvironment: Environment = {
  clientUrl: 'http://localhost:8000',
  adminUrl: 'http://localhost:8081',
  baseApiUrl: 'http://localhost:3000',
};

const ProdEnvironment: Environment = {
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

interface Environment {
  clientUrl: string;
  adminUrl: string;
  baseApiUrl: string;
}
