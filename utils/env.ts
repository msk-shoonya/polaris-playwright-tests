type Env = 'main' | 'buggy';

const ENV = (process.env.RUN_ENV as Env) || 'main';

const config = {
  main: {
    baseURL: 'https://practicesoftwaretesting.com/',
  },
  buggy: {
    baseURL: 'https://with-bugs.practicesoftwaretesting.com/',
  },
};

export const getEnvConfig = () => config[ENV];
export const currentEnv = ENV;