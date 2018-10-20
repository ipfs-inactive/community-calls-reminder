const request = require('request-promise');
const cron = require('node-cron');

const endpoint = 'https://api.github.com'
const ua = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
const usertoken = '?access_token=PutTokenHere'
const message = JSON.stringify({
                body: 'Please remember to sign up to speak at the next community call. https://somegooglespreadsheet.com :memo:',
              })

// Send message to Community Call issues section
async function communityCallReminder() {
    try {
        const res = await request({
            url: `${endpoint}/repos/protocol/community-calls-reminder/issues/1/comments${usertoken}`,
            method: 'POST',
            headers: {
                'User-Agent': ua
            },
            body: message,
        })
        console.log(res);
    } catch(e) {
        console.log(e.message);
    }
};

// Signup reminder will be posted in comments every Monday, 1:00pm EST
function postReminder() {
    cron.schedule('13***', () => {
        communityCallReminder();
    }, {
        scheduled: true,
        timezone: "America/New_York"
      });
};
postReminder()