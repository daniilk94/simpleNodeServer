const authUsers = [
  {
    username: "dm",
    password: "pass1",
    rateLimiting: { window: 0, requestCounter: 0 },
  },
  {
    username: "jk",
    password: "pass2",
    rateLimiting: { window: 0, requestCounter: 0 },
  },
  {
    username: "pl",
    password: "pass3",
    rateLimiting: { window: 0, requestCounter: 0 },
  },
];

export const getAuthUser = (username) =>
  authUsers.find((u) => u.username === username);

export const userNameExist = (username) =>
  authUsers.some((u) => u.username === username);
