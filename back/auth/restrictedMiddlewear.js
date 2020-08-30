module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // console.log('logged in restricted')
    next()
  } else {
    // console.log('not logged in restricted')
    res.redirect('/login.html')
  }

  // next()
}