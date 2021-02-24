/**
 * PlayerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    get: (req, res) => {
        Player.find()
          .then((players) => {
            if (!players || players.length === 0) {
              let code = 'not_found';
              res.status(setStatus(code));
              return res.send({
                'code': code,
                'message': 'No hay players cargados'
              });
            }
            return res.send({
              'data': players
            });
          })
          .catch((err) => {
            sails.log.debug(err);
            res.status(err.status);
            return res.send({
              'code': err.code,
              'message': err.message
            });
          });
      },
      getById: (req, res) => {
        try {
          let auth = tokenDecoder(req.header('Authorization'));
          if (auth.data.id != req.param('id')) {
            res.status('forbidden');
            res.send({
              'code': 'forbidden',
              'message': 'Wrong logged user'
            });
          } else {
            Alumno.findOne(
              //para el get by pasamos un json con el parametro que necesitamos
              {
                id: req.param('id')
              })
              .then((alumno) => {
                if (!alumno || alumno.length === 0) {
                  sails.log.debug(err);
                  res.status(setStatus(err.code));
                  return res.send({
                    'code': err.code,
                    'message': err.message
                  });
                }
                return res.send({
                  id: alumno.id,
                  name: alumno.name,
                  email: alumno.email,
                  area_code: alumno.area_code,
                  phone_number: alumno.phone_number,
                  image: alumno.image,
                  occupation: alumno.occupation,
                  financial_knowledge: alumno.financial_knowledge,
                });
              })
              .catch((err) => {
                sails.log.debug(err);
                res.status(setStatus(err.code));
                return res.send({
                  'code': err.code,
                  'message': err.message
                });
              });
          }
        } catch (err) {
          sails.log.debug(err);
          res.status(setStatus(err.code));
          return res.send({
            'code': err.code,
            'message': err.message
          });
        }
      },
      create: (req, res) => {
        try {
          // let schema = getCreateSchemma();
          // isValidRequest(req.allParams(), schema);
          Player.create(req.allParams())
            .then((curso) => { //eslint-disable-line
              return res.send('OK');
            })
            .catch((err) => {
              sails.log.debug(err);
              res.status(setStatus(err.code));
              return res.send({
                'code': err.code,
                'message': err.message
              });
            });
        } catch (err) {
          res.status(setStatus(err.code));
          return res.send({
            'code': err.code,
            'message': err.message
          });
        }
      },
      query: (req, res) => {
        let query = req.body.query;
        sails.sendNativeQuery(query, [1], (
            err, rawResult
        ) => {
            if (err) {
                sails.log.debug(err);
                res.status(setStatus(err.code));
                return res.send({
                    'code': err.code,
                    'message': err.message
                });
            }

            return res.send(rawResult.rows);

        });
    },
};

function setStatus(code) {
    switch (code) {
      case 'E_UNIQUE':
        return 400;
      case 'not_found':
        return 404;
      case 'bad_request':
        return 400;
      case 'forbidden':
        return 403;
      case 'ERR_HTTP_INVALID_STATUS_CODE':
        return 401;
      default:
        return 500;
    }
  }