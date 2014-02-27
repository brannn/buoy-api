/*
 * Reusable things go here
 */

var methods = {
    //  Recursively merge properties of two objects
    merge: function(obj1, obj2) {
        for (var p in obj2) {
            if (obj2.hasOwnProperty(p)) {
                try {
                    // Property in destination object set; update its value.
                    if (obj2[p].constructor == Object) {
                        obj1[p] = methods.merge(obj1[p], obj2[p]);
                    } else {
                        obj1[p] = obj2[p];
                    }
                } catch (e) {
                    // Property in destination object not set; create it and set its value.
                    obj1[p] = obj2[p];
                }
            }
        }
        return obj1;
    },
    // Pretty print JSON
    pp: function(subject) {
        console.log(JSON.stringify(subject, false, 4));
    },
};

module.exports = methods;
