import Meta from '../models/Meta';

export default function (path) {
  return Meta.findOne({ path }).then(response => response);
}
