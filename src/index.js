const R = require('ramda');

const depLens = R.lensProp('dep');
const excLens = R.lensProp('exc');

const makeRelationshipSet = () => ({ dep: {}, exc: [] });

const addVoidNodes = (a, b, s) => {
  const createNode = (n) => R.when(R.compose(R.isNil, R.prop(n)), R.assoc(n, n));
  const addVoidNodes = R.compose(createNode(b), createNode(a), R.view(depLens));
  return R.set(depLens, addVoidNodes(s), s);
}

const dependsOn = (a, b, s) => {
  const ss = addVoidNodes(a, b, s);
  const find = R.prop(R.__, R.view(depLens, ss));
  const unionByValue = (v) => v === find(a) ? find(b) : v;
  const union = R.map(unionByValue);
  return R.set(depLens, union(R.view(depLens,ss)), ss);
};

const areExclusive = (a, b, s) => {
  const ss = addVoidNodes(a, b, s);
  return R.set(excLens, R.append([a, b], R.view(excLens, ss)), ss);
}

const checkRelationships = (s) => {
  const isSameTag = R.compose(R.equals(1), R.length, R.uniq);
  const pairToTags = R.compose(R.values, R.pick(R.__, R.view(depLens, s)));
  const isSameComponent = R.compose(isSameTag, pairToTags);
  const areConflictsUnconnected = R.compose(
    R.all(R.equals(false)),
    R.map(isSameComponent),
    R.view(excLens));
  return areConflictsUnconnected(s);
};

module.exports =  {makeRelationshipSet, dependsOn, areExclusive, checkRelationships};
