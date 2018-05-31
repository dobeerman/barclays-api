import Branch from '../models/Branch';
import Meta from '../models/Meta';

export default async function branches (response, error) {
  if (error) {
    throw error;
  }

  const { data: { data }, data: { meta } } = response;

  try {
    Object.assign(meta, { etag: response.headers.etag });
  }
  catch (e) {
    throw new Error('Empty data');
  }

  await Meta
    .findOneAndUpdate({ path: 'branches' }, meta, { upsert: true })
    .then(metas => metas);

  await Branch.remove({}, () => {
    console.log('collection `branches` removed.');  // eslint-disable-line
  }).then(() => {
    Branch
      .insertMany(data[0].Brand[0].Branch)
      .then(result => result);
  });
}
