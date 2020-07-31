
/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
    constructor(name, builtYear) {
        this.name = name;
        this.builtYear = builtYear;
    }
}

class Park extends Element {
    constructor(name, builtYear, area, numberOfTrees) {
        super(name, builtYear);
        this.numberOfTrees = numberOfTrees;
        this.area = area;
    }
    
    treeDensity() {
        const density = this.numberOfTrees / this.area;
        console.log(`${this.name} has tree density of ${density}.`);
    }
    
    
}

class Street extends Element {
    
    constructor(name, builtYear, streetLength, size = 3) {
        super(name, builtYear);
        this.streetLength = streetLength;
        this.size = size;
    }
    
    streetClassification() {
        let sizeClassification = new Map();
        sizeClassification.set(1, 'tiny');
        sizeClassification.set(2, 'smal');
        sizeClassification.set(3, 'normal');
        sizeClassification.set(4, 'big');
        sizeClassification.set(5, 'huge');
        
        console.log(`${this.name}, built in ${this.builtYear} is a ${sizeClassification.get(this.size)} street.`);
    }
    
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];
                    

function calc(arr) {
    const sum = arr.reduce((prev, curr, index) => prev + curr, 0);
    return [sum, sum / arr.length];
}

function reportParks(p) {
    console.log('---------- PARK REPORTS --------');
    
    // density
    p.forEach(el => el.treeDensity());
    
    // Average age of each town's park
    const ages = p.map(el => new Date().getFullYear() - el.builtYear);
    const [total, avg] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avg} years.`);
    
    // which park has more than 1000 trees.
    const index = p.map(el => el.numberOfTrees).findIndex(el => el >= 1000);
    console.log(`${p[index].name} park has more than 1000 trees.`);
}

function reportStreets(s) {
    console.log('---------- STREET REPORTS --------');
    
    //Total and average length of the town's streets
    const [total, avg] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${total} km, with an average of ${avg} km.`);
        
    // classify size
    s.forEach(el => el.streetClassification());
    
}


reportParks(allParks);

reportStreets(allStreets);
