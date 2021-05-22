const Heroku = require('heroku-client');
const { MY_APP_ID, HEROKU_AUTH_TOKEN } = require('./constants');
const { getLatestGithubSHA } = require('./utils');
const heroku = new Heroku({ token: HEROKU_AUTH_TOKEN })

heroku.get('/apps').then(async (apps) => {
    try {
        let newConfigVars = await getLatestGithubSHA();

        for (let i = 0; i < apps.length; i++) {
            if (apps[i].id === MY_APP_ID) {
                await heroku.patch(`/apps/${MY_APP_ID}/config-vars`, { body: newConfigVars });
                response = await heroku.get(`/apps/${MY_APP_ID}/config-vars`);
                console.log(response)
            }
        }
    }
    catch (e) {
        console.log(e)
    }


});