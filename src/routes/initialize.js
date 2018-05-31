import axios from 'axios';

import branches from '../utils/branches';
import atms from '../utils/atms';
import getMeta from '../utils/getMeta';

export default async function (req, res) {
  const instance = axios.create({
    baseURL: 'https://atlas.api.barclays/open-banking/v2.1',
    'Cache-Control' : 'no-cache'
  });

  try {
    /**
     * TODO: Check ETag. It's not working properly.
     */
    let meta;

    meta = await getMeta('branches').etag;
    if (meta) instance.defaults.headers.common['If-None-Match'] = meta;

    await instance.get('/branches').then(branches);

    meta = await getMeta('atms').etag;
    if (meta) instance.defaults.headers.common['If-None-Match'] = meta;

    await instance.get('/atms').then(atms);

    res.status(200).json({ok: true, updated: true});
  } catch (error) {
    if (error.response && error.response.status === 304) {
      console.log(error.response.statusText); // eslint-disable-line

      res.status(200).json({ok: true, updated: false});
    } else {
      console.log('CATCH', error);  // eslint-disable-line

      res.status(400).json({ok: false});
    }
  }
}
