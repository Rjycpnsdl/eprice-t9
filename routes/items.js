var express = require('express');
var router = express.Router();
var moment = require('moment');
var Item = require('../models/items');

// router.use(function(req, res, next) {
//   if (!req.user) {
//     res.redirect('/auth/login')
//   }
//   next();
// });

router.post('/search', function(req, res){
  res.redirect('/items');
});

router.get('/', function(req, res) {
  Item.find( function(err, items, count) {
    res.render('list', {items: items , user: req.user, moment: moment});
  })
});
router.post('/', function(req, res) {
    new Item({
      product: req.body.product,
      price: req.body.price,
      shop: req.body.shop,
      description: req.body.description,
      description1: req.body.description1,
      description2: req.body.description2,
      description3: req.body.description3,
      image: req.body.image,
    }).save(function(err, item, count) {
      if(err) {
        res.status(400).send('Error saving new item: ' + err);
      } else {
        res.send('Success, please go back to list')
      }
    })
});

router.get('/add', function(req, res) {
  res.render('add', {item: {}});
});

router.route('/:item_id')
  .all(function(req, res, next) {
    item_id = req.params.item_id;
    item = {};
    Item.findById(item_id, function(err, c) {
      item = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit', {item: item, moment: moment});
  })

  // .post(function(req, res) {
  //   movie.sypnosis.push({
  //     sypnosis: req.body.sypnosis
  //   });

  //   movie.save(function(err, movie, count) {
  //     if(err) {
  //       res.status(400).send('Error editing: ' + err);
  //     } else {
  //       res.send('Success!');
  //     }
  //   });
  // })

  .post(function(req, res) {
    item.product = req.body.product;
    item.price = req.body.price;
    item.shop = req.body.shop;
    item.description = req.body.description;
    item.description1 = req.body.description1;
    item.description2 = req.body.description2;
    item.description3 = req.body.description3;
    item.image = req.body.image;

    item.save(function(err, item, count) {
      if(err) {
        res.status(400).send('Error saving item: ' + err);
      } else {
        res.send('Successfully saved');
      }
    });
  })

  .delete(function(req, res) {
    item.remove(function(err, item) {
      if(err) {
        res.status(400).send("Error removing item: " + err);
      } else {
        res.send('Successfully removed');
      }
    });
  });

module.exports = router;
