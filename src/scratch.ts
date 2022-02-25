// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// const OAuthClient = require('intuit-oauth');
import OAuthClient from 'intuit-oauth';


const oauthClient = new OAuthClient({
  clientId: process.env.QB_CLIENT_ID,
  clientSecret: process.env.QB_CLIENT_SECRET,
  environment: process.env.QB_ENVIRONMENT,
});


(async () => {
  const refreshRes = await oauthClient
    .refreshUsingToken(getRefreshToken());
  console.log(refreshRes.token);
  console.log(new Date(1645753056440));

})();


function getRefreshToken() {
  return 'AB11654487518TkuwR7TuGzGwTlBosZOUQfyM3LYDoDVg2Ic5U';
}
