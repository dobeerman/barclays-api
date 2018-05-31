import Atm from '../models/Atm';
import Meta from '../models/Meta';

export default async function atms (response, error) {
  if (error) throw error;

  const { data: { data }, data: { meta } } = response;

  try {
    Object.assign(meta, { etag: response.headers.etag });
  }
  catch (e) {
    throw new Error('Empty data');
  }

  await Meta
    .findOneAndUpdate({ path: 'atms' }, meta, { upsert: true })
    .then(metas => metas);

  await Atm.remove({}, () => {
    console.log('collection `atms` removed.'); // eslint-disable-line
  });

  const atmsList = await data[0].Brand[0].ATM // I'll fix this hell later
    .map((atm) => {
      const {
        Identification,
        Location: { PostalAddress },
        Location: { PostalAddress: { GeoLocation: { GeographicCoordinates: coords } } }
      } = atm;

      const Location = {
        coordinates: [parseFloat(coords.Longitude), parseFloat(coords.Latitude)],
        type: 'Point'
      };

      return { Identification, PostalAddress, Location };
    });

  await Atm.insertMany(atmsList).then(result => result).catch(e => console.log(e)); // eslint-disable-line
}

