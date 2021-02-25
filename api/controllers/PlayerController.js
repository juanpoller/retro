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
         
            Player.findOne(
              //para el get by pasamos un json con el parametro que necesitamos
              {
                id: req.param('id')
              })
              .then((player) => {
                if (!player || player.length === 0) {
                  sails.log.debug(err);
                  res.status(setStatus(err.code));
                  return res.send({
                    'code': err.code,
                    'message': err.message
                  });
                }
                return res.send(player);
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
    getByRetroId: (req, res) => {
      let retroId = req.param('id');
      let query = "select * from player where retro_id = '" + retroId +"'"
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
  getByRetroIdPromedio: (req, res) => {
    let retroId = req.param('id');
    let query = "select retro_id, " +
    "(select COUNT(ownership) from player c2 where c2.retro_id =  '" + retroId +
    "') as ownership," +
    "(select COUNT(details) from player c2 where c2.retro_id =  '" + retroId +
    "') as details" +
    " from player where retro_id = '" + retroId +"'"
    console.log(query)
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