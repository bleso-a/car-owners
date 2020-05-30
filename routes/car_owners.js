const router = require('express').Router();
const axios = require('axios');
var omitBy = require('lodash.omitby');
const CarOwner = require('../models/car_owners.model');

router.get('/', (req, res) => {
    const query = req.query
    const countries = query.countries ? query.countries.split(',') : undefined
    const colors = query.colors ? query.colors.split(',') : undefined

    const omitFind = omitBy({
      gender:query.gender, 
      country:{$in:countries},
      car_color:{$in:colors}
    }, (item) => {
      if(item === undefined) return true
      if(item['$in'] === undefined) return true
      return false
    })
    
    CarOwner.find(omitFind).where("car_model_year").gte(query.start_year).lte(query.end_year)
    .then(car_owners => res.json(car_owners))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/filters', (req, res) => {
  axios.get('https://ven10.co/assessment/filter.json')
    .then((resp) => {
      res.json(resp.data)
    })
    .catch(err =>  console.log(err))
})

module.exports = router;