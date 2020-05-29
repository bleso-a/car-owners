const router = require('express').Router();
const CarOwner = require('../models/car_owners.model');

router.get('/', (req, res) => {
    const query = req.query
    const countries = query.countries ? query.countries.split(',') : []
    const colors = query.colors ? query.colors.split(',') : []
    console.log(countries)
    console.log(query)
    CarOwner.find({
        gender:query.gender, 
        country:{$in:countries},
        car_color:{$in:colors}
    }).where("car_model_year").gte(query.start_year).lte(query.end_year)
    .then(car_owners => res.json(car_owners))
    .catch(err => res.status(400).json('Error: ' + err));
});


/*
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router;