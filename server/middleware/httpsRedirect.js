import url from 'url';

export default function ({ enabled = false }) {
  return function(req, res, next) {
    if (enabled && !req.secure) {
      const secureUrl = url.resolve(`https://${req.headers.host}`, req.url);
      return res.redirect(secureUrl);
    }

    return next();
  };
}
