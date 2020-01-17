/** sets */

function mySet() {
    // the var collection will hold the set
    // cannot add duplicate item ->  that is the set
    var collection = [];

    // this method will check for the presence of an element and return true or false
    this.has = function(element) {
        // indexOf returns -1 if there is no element
        return (collection.indexOf(element) !== -1);
    };

    //this method will return all the values in the set
    this.values = function() {
        return collection;
    };

    // this method will add an element to the set
    this.add = function(element) {
        if(!this.has(element)){
            collection.push(element);
            return true;
        }
        return false;
    };

    // this method will remosve an element from a set
    this.remove = function(element) {
        if(this.has(element)) {
            index = collection.indexOf(element);
            collection.splice(index, 1);
            return true;
        }
        return false;
    };


    this.size = function() {
        return collection.length;
    };


    this.union = function(otherSet) {
        var unionSet = new mySet();
        var firstSet = this.values();
        var secondSet = otherSet.values();
        firstSet.forEach(function(e) {
            unionSet.add(e);
        });
        secondSet.forEach(function(e) {
            unionSet.add(e);
        });

        return unionSet;
    };

    this.intersection = function (otherSet) {
        var intersectionSet = new mySet();
        var firstSet = this.values();
        firstSet.forEach(function(e) {
            if(otherSet.has(e)){
                intersectionSet.add(e);
            }
        });
        return intersectionSet;
    };

    // this method will return the difference of two sets as a new set
    this.difference = function(otherSet) {
        var differenceSet = new mySet();
        var firstSet = this.values();
        firstSet.forEach(function(e) {
            if(!otherSet.has(e)) {
                differenceSet.add(e);
            }
        });
    };

    this.subset = function(otherSet) {
        var firstSet = this.values();
        // every -> callback function의 모든 엘렘이 테스트를 통과하는지 확인하는 메서드
        return firstSet.every(function(value) {
            return otherSet.has(value);
        });
    };
}

var setA = new mySet()
var setB = new mySet()

setA.add('a');
setB.add('b');
setB.add('c');
setB.add('a');
setB.add('d');

console.log(setA.subset(setB));
console.log(setA.intersection(setB).values());

var setC= new Set();
var setD= new Set();
setC.add('a');
setD.add('b');
setD.add('c');
setD.add('a');
setD.add('d');
console.log(setD.values());
setD.delete('a')
console.log(setD.add('d'));