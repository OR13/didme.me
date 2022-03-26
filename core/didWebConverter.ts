export const didWeb = (didMeme: string, username: string) => {
  return `did:web:${username.toLowerCase()}.github.io:${didMeme
    .split(":")
    .pop()}`;
};
