const exchangeCodeForToken = async (code) => {
  // eslint-disable-next-line no-console
  console.log(`CALLING MOCK exchangeCodeForToken!' ${code}`);
  return 'MOCK TOKEN FOR CODE';
};

const getGithubProfile = async (token) => {
  // eslint-disable-next-line no-console
  console.log(`CALLING MOCK getGithubProfile ${token}`);
  return {
    login: 'mock-github-user',
    email: 'mock@test.com',
    avatar_url: 'https://www.placecage.com/gif/300/300',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
