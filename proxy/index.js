const express = require('express');
const session = require('express-session');
const httpProxy = require('http-proxy');
const cas = require('./cas');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const {URL} = require('url');

// global catch alls for errors
process.on('uncaughtException', (e) => {
  console.error(e)
  process.exit(-1);
});
process.on('unhandledRejection', (e) => console.error(e));

// create express instance
const app = express();
const proxy = httpProxy.createProxyServer({
  ignorePath : true
});

app.use(session({
  name              : 'cas-service-id',
  secret            : 'foobar',
  resave            : false,
  saveUninitialized : true
}));

// setup simple http logging
app.use((req, res, next) => {
  res.on('finish',() => {
    console.log(`${res.statusCode} ${req.protocol}/${req.httpVersion} ${req.originalUrl || req.url} ${req.get('User-Agent') || 'no-user-agent'}`);
  });
  next();
});

// handle cas logins
app.get('/vivo/loginExternalAuth', (req, res) => {
  proxy.web(req, res, { target: `http://vivo:8080${req.originalUrl}` });
});
app.use('/vivo/loginExternalAuthReturn', cas.init(app, proxy));
app.use('/vivo/logout', (req, res) => {
  console.log('CAS Service: destorying session');
  req.session.destroy();
  proxy.web(req, res, { target: `http://vivo:8080/vivo/logout` });
});

// handle vivo logins
app.post('/vivo/authenticate', (req, res) => {
  req.headers.referer = req.headers.origin+'/vivo/login';
  proxy.web(req, res, { 
    target: `http://vivo:8080${req.originalUrl}`,
    selfHandleResponse : true
  });
});
proxy.on('proxyRes', async (proxyRes, expReq, expRes) => {
  if( expReq.path === '/vivo/authenticate' ) {
    // see if cookie is set via set-cookie
    let cookie = (proxyRes.headers['set-cookie'] || [])
      .find(item => item.match(/^JSESSIONID/) ? true : false)
    if( cookie ) cookie = cookie.replace(/;.*/, '');
    else cookie = expReq.headers.cookie;

    if( !cookie ) console.warn('unable to find cookie!');

    // sniff out if the cookie has access to user account
    let resp = await fetch('http://vivo:8080/vivo/accounts/myAccount', {
      redirect : 'manual',
      headers : {cookie}
    });

    try {
      // if they user account request redirects to authenticate, they did not login
      let location = resp.headers.get('location');
      if( location && resp.status === 302 && new URL(location).pathname === '/vivo/authenticate' ) {
        console.log('Invalid username/password login');
        expRes.redirect('/vivo/ucd-login.html?error='+encodeURIComponent('Invalid username or password'));
        return;
      }
    } catch(e) {
      // badness
      expRes.redirect('/vivo/ucd-login.html?error='+encodeURIComponent(e.message));
      console.error('Error on proxy response', e);
      return;
    }

    // set they are logged in via vivo and return
    expReq.session['vivo-session'] = true;
    console.log('Vivo login successful, redirecting to: '+getRedirectUrl(expReq.session.originalUrl));
    if( proxyRes.headers['set-cookie'] ) {
      expRes.set('set-cookie', proxyRes.headers['set-cookie']);
    }

    expRes.redirect(getRedirectUrl(expReq.session.originalUrl));
  }
});

function getRedirectUrl(url) {
  if( !url ) return '/vivo';
  if( url === '/' ) return '/vivo';
  return url;
}

app.get('/vivo/ucd-login.html', (req, res) => {
  res.send(fs.readFileSync(path.join(__dirname, 'ucd-login.html'), 'utf-8'));
})

app.use(/.*/, (req, res) => {
  // TODO check for authentication
  if( !req.session[cas.cas.session_name] && !req.session['vivo-session'] ) {
    if( !req.session.originalUrl ) {
      console.log('setting originalUrl:', req.originalUrl);
      req.session.originalUrl = req.originalUrl;
    }
    res.redirect('/vivo/ucd-login.html');
    return;
  }

  proxy.web(req, res, { target: `http://vivo:8080${req.originalUrl}` });
});

app.listen(8080, () => {
  console.log('server ready on port 8080');
});


