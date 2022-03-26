export const didWeb = (didMeme: string, username: string) => {
  const id = didMeme.split(":").pop();
  return `did:web:${username.toLowerCase()}.github.io:memes:${id}`;
};
