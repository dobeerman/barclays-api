import Atm from '../models/Atm';

export default async function (req, res) {
  const { lon, lat } = req.query;

  if (!lon || !lat) {
    res.status(404).json({error: 'No coordinates.'});
  }

  const points = await Atm.aggregate([{
    $geoNear: {
      near: { type: 'Point', coordinates: [ parseFloat(lat), parseFloat(lon) ] },
      distanceField: 'dist.distance',
      num: 10,
      spherical: true
    }
  }, {
    $lookup:
     {
       from: 'branches',
       localField: 'Identification',
       foreignField: 'Identification',
       as: 'Branch'
     }
  }])
    .then(results => results);

  res.status(200).json({points});
};
