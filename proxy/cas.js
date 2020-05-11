const CASAuthentication = require('cas-authentication');

let cas = new CASAuthentication({
  cas_url     : process.env.CAS_URL,
  service_url : process.env.APP_URL
});

function init(app, proxy) {

  return (req, res) => {
    console.log('CAS Service: starting CAS redirection');

    req.query.returnTo = process.env.APP_URL+'/vivo/loginExternalAuthReturn';
    cas.service_url = process.env.APP_URL+'/vivo/loginExternalAuthReturn';

    cas.bounce(req, res, async () => {
      console.log('CAS Service: CAS redirection complete');

      let username = '';
      if( cas.session_name && req.session[cas.session_name] ) {
        username = req.session[cas.session_name];
      }

      if( username ) {
        req.headers['ucd-cas-id']=username;
        console.log('CAS Service: CAS login success: '+username);
      } else {
        console.error('CAS Service: CAS login failure.  No username found');
      }

      proxy.web(req, res, { target: `http://vivo:8080/vivo/loginExternalAuthReturn` });
    });
  };
}



module.exports = {init, cas};