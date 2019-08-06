var express = require('express');
var router = express.Router();
const Character = require('../models/character')
var request = require('request');
const _ = require('underscore')
const moment = require('moment')
//api para registrar masivamente personajes de una api externa
//obs: deberia ser un post ya que se estan insertando registros
router.post('/character', function (req, res, next) {

  request('https://api.got.show/api/book/characters', function (err, response, body) {

    //si ocurre un error en la request se devuelve con su respectivo estado
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    //si existe una respuesta y el codigo es de exito se procesa la data
    if (response && response.statusCode == 200) {
      //console.log("todo bien");
      //se guardan todos los personajes en fornato JSON
      let allCharacters = JSON.parse(body);
      //uso de underscore para contar el total de elementos de la coleccion
      let total = _.size(allCharacters)
      //console.log("cantidad de personajes :", total)

      //recorre todos los personajes que posean un pagerank
      allCharacters.filter(elem => elem.pagerank !== null).map((elem, i) => {
        //console.log("pos",i,"character: ",elem)
        let pagerank = elem.pagerank

        //completando el modelo
        let character = new Character({
          titles: elem.titles,
          allegiance: elem.allegiance,
          books: elem.books,
          image: elem.image,
          name: elem.name,
          slug: elem.slug,
          gender: elem.gender,
          culture: elem.culture,
          birth: elem.birth,
          alive: elem.alive,
          pagerank: pagerank,
          created_at: moment(elem.createdAt).format("YYYY-MM-DD hh:mm:ss"),
          updated_at: moment(elem.updatedAt).format("YYYY-MM-DD hh:mm:ss")
        })

        //guardarndo al personaje
        character.save((err, characterDB) => {
          //apenas hay un error dispararlo
          if (err) {
            throw new err
          }

        })
      })
    }
    //si todo salio bien 
    return res.json({
      ok: true
    })

  });

})

//api para obtener usuarios con parametros para la paginacion de los usuarios (solo si es administrador)
router.get('/character', function (req, res, next) {

  let desde = req.query.desde || 0
  desde = Number(desde)
  let limite = req.query.limite || 0
  limite = Number(limite)
  //consulta pero filtrando los campos
  Character.find({}, 'name slug gender image culture birth pagerank books allegiance alive titles')
    .skip(desde)
    .limit(limite)
    .exec((err, characters) => {
      //si hay un error, 400 con el error
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        total_characters: _.size(characters),
        characters
      })


    })

})

//api para obtener usuarios con parametros para la paginacion de los usuarios (solo si es administrador)
router.get('/character/:id', function (req, res, next) {

  let id = req.params.id
  //consulta pero filtrando los campos
  Character.find({
      _id: id
    }, 'name slug gender image culture birth pagerank books allegiance alive titles')
    .exec((err, character) => {
      //si hay un error, 400 con el error
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        character
      })

    })

})
module.exports = router;