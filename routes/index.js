var express = require('express');
var router = express.Router();
var request = require('request');
// Todo:
// 1- GET home page.
// 2- Define search parameters.
// 3- Api call to fetch hotels data
// 4- Render the view and pass hotels data and the query search

router.get('/index/:destinationName?/:minTripStartDate?/:maxTripStartDate?/:lengthOfStay?/:minGuestRating?/:maxGuestRating?/:minTotalRate?/:maxTotalRate?',
  function (req, res, next) {
    console.log(req.param("destinationName"))
    // Define search parameters
    var params =
      {
        destinationName: req.param("destinationName"),
        minTripStartDate: req.param("minTripStartDate"),
        maxTripStartDate: req.param("maxTripStartDate"),
        lengthOfStay: req.param("lengthOfStay"),
        minStarRating: req.param("minStarRating"),
        maxStarRating: req.param("maxStarRating"),
        minTotalRate: req.param("minTotalRate"),
        maxTotalRate: req.param("maxTotalRate"),
        minGuestRating: req.param("minGuestRating"),
        maxGuestRating: req.param("maxGuestRating"),
      };
      // Get hotels data
    request({
      url: 'https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel',
      qs: params
    }, function (err, response, body) {
      if (err) {
        console.log(err);
        return;
      }
      var result = JSON.parse(response.body);
      var hotels = [];
      if (result && result.offers && result.offers.Hotel)
        hotels = result.offers.Hotel;
      // Render the view and pass hotels data and query search
      res.render('index', {
        params: params,
        hotels: hotels
      });
    });


  });

module.exports = router;
