const { makeRelationshipSet, dependsOn, areExclusive, checkRelationships } = require('./index');
const {expect, assert} = require('chai');

describe('depcon', function() {
  let s;
 
  beforeEach(function() {
    s = makeRelationshipSet();
  });
  
  describe('test provided', function () {
    it('test1', function() {
      s = dependsOn('a', 'a', s);
      expect(checkRelationships(s)).to.be.ok;
    });
    
    it('test2', function() {
      s = dependsOn('a', 'b', s);
      s = dependsOn('b', 'a', s);
      expect(checkRelationships(s)).to.be.ok;
    });

    it('test3', function() {
      s = dependsOn('a', 'b', s);
      s = areExclusive('a', 'b', s);
      expect(checkRelationships(s)).not.to.be.ok;
    });
    
    it('test4', function() {
      s = dependsOn('a', 'b', s);
      s = dependsOn('b', 'c', s);
      s = areExclusive('a', 'c', s);
      expect(checkRelationships(s)).not.to.be.ok;
    });

    it('test5', function() {
      s = dependsOn('a', 'b', s);
      s = dependsOn('b', 'c', s);
      s = dependsOn('c', 'a', s);
      s = dependsOn('d', 'e', s);
      s = areExclusive('c', 'e', s);
      expect(checkRelationships(s)).to.be.ok;
    });

    it('deep dependencies', function() {
      s = dependsOn('a', 'b', s);
      s = dependsOn('b', 'c', s);
      s = dependsOn('c', 'd', s);
      s = dependsOn('d', 'e', s);
      s = dependsOn('a', 'f', s);
      s = areExclusive('e', 'f', s);
      expect(checkRelationships(s)).to.not.be.ok;
    });

    it('multiple dependencies and exclusions', function() {
      s = makeRelationshipSet();
      s = dependsOn('a', 'b', s);
      s = dependsOn('a', 'c', s);
      s = areExclusive('b', 'd', s);
      s = areExclusive('b', 'e', s);
      expect(checkRelationships(s)).to.be.ok;
    });
  });
});
