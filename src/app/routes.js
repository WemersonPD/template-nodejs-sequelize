module.exports = (app) => {
  const uri = `/api/${process.env.API_VERSION}`;

  app.use(uri + '/test', require('./modules/test'));

  // If is not valid route
  app.route('*').get(function (req, res) {
    res
      .status(404)
      .json({ message: 'Rota não encontrada!', rota: uri });
  });
};
