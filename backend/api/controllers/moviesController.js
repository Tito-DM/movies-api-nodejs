const Movie = require("../models/Movie");

//index
const index = async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

//create
const create = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
    imgTitle: req.body.imgTitle,
    imgSm: req.body.imgSm,
    trailer: req.body.trailer,
    video: req.body.video,
    realease_year: req.body.realease_year,
    duration: req.body.duration,
    genre: req.body.genre,
  });
  try {
    movie ? await movie.save() : res.status(403).json("");
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};
//show
const show = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {}
};
