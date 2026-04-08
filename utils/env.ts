// type Env = 'main' | 'buggy';

// const ENV = (process.env.RUN_ENV as Env) || 'main';

// const config = {
//   main: {
//     baseURL: 'https://practicesoftwaretesting.com/',
//   },
//   buggy: {
//     baseURL: 'https://with-bugs.practicesoftwaretesting.com/',
//   },
// };

// export const getEnvConfig = () => config[ENV];
// export const currentEnv = ENV;

export type Env = 'main' | 'buggy';

export const currentEnv: Env =
  (process.env.RUN_ENV as Env) || 'main';

const config = {
  main: {
    uiBaseUrl: 'https://practicesoftwaretesting.com',
    apiBaseUrl: 'https://api.practicesoftwaretesting.com',
  },
  buggy: {
    uiBaseUrl: 'https://with-bugs.practicesoftwaretesting.com',
    apiBaseUrl: 'https://api-with-bugs.practicesoftwaretesting.com',
  },
} as const;

export const getEnvConfig = () => config[currentEnv];