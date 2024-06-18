export const isRequestAuth = (auth?: string) => {
  if (!auth) return false;
  const token = auth.replace('Bearer ', '');
  if (token !== process.env.GENERAL_AUTH_TOKEN) return false;
  return true;
};
