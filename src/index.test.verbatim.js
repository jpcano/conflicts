const { makeRelationshipSet, dependsOn, areExclusive, checkRelationships } = require('./index');

//
// Verbatim copy of the tests provided
//
//
var s, selected;

s = makeRelationshipSet();
s = dependsOn('a', 'a', s);
console.assert(checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'a', s);
console.assert(checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = areExclusive('a', 'b', s);
console.assert(!checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = areExclusive('a', 'c', s);
console.assert(!checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = dependsOn('c', 'a', s);
s = dependsOn('d', 'e', s);
s = areExclusive('c', 'e', s);
console.assert(checkRelationships(s));

// Deep dependencies
s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = dependsOn('c', 'd', s);
s = dependsOn('d', 'e', s);
s = dependsOn('a', 'f', s);
s = areExclusive('e', 'f', s);
console.assert(!checkRelationships(s));  

// Multiple dependencies and exclusions.
s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('a', 'c', s);
s = areExclusive('b', 'd', s);
s = areExclusive('b', 'e', s);
console.assert(checkRelationships(s)); 
