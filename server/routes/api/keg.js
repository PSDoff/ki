const sanitizeHtml = require('sanitize-html');
const Keg = require('../../models/Keg');

module.exports = (app) => {
  app.get('/api/kegs', (req, res) => {
    Keg.find().sort('-createdAt').exec((err, kegs) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ kegs });
    });
  });

  /**
   * Get a single keg
   * @param req
   * @param res
   * @returns void
   */
  app.get('/api/kegs/:id', (req, res) => {
    Keg.findOne({ _id: req.params.id }).exec((err, keg) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ keg });
    });
  });

  /**
   * Save a new keg
   * @param req
   * @param res
   * @returns void
   */
  app.post('/api/kegs', (req, res) => {
    const newKeg = new Keg(req.body.keg);

    newKeg.name = sanitizeHtml(newKeg.name);
    newKeg.description = sanitizeHtml(newKeg.description);

    console.log(`newKeg : ${newKeg}`);
    newKeg.save((err, saved) => {
      console.log(err);
      console.log(saved);
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.json({ keg: saved });
    });
  });

  /**
   * Edit a keg
   * @param req
   * @param res
   * @returns void
   */
  app.post('/api/kegs/:id', (req, res) => {
    const newKeg = new Keg(req.body.keg);
    // Let's sanitize inputs
    newKeg.name = sanitizeHtml(newKeg.name);
    newKeg.description = sanitizeHtml(newKeg.description);

    const error = newKeg.validateSync();
    if (error) {
      res.status(403).end();
      return;
    }

    Keg.update({ _id: req.params.id }, { $set: { name: newKeg.name, description: newKeg.description } }, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(req.body.keg).end();
      }
    });
  });

  app.delete('/api/kegs/:id', (req, res) => {
    Keg.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  });
};
