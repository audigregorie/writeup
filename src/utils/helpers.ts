export const secretEmail = (email: string | null) => {
  const [username, domain] = email!.split('@');
  return username.substring(0, 2) + '*'.repeat(username.length) + '@' + domain;
};
