const parser = require('csv-parse/lib/sync');
const stringifier = require('csv-stringify');
const fs = require('fs');

init();

//Intialization
function init() {    
    first();  
}


//first problem

function first() {
    const data = fs.readFileSync('input/question-1/main.csv');
    const records = parser(data, { columns: true });
    const results = [];
    const final = [];
    const headers = ["Year","Population","Violent","Property","Murder","Forcible_Rape","Robbery","Aggravated_assault","Burglary","Larceny_Theft","Vehicle_Theft"];
    // console.log(records);
    
            records.forEach(record => {
            var decade = Math.floor(record.Year/10)*10;
            if (decade) { 
                var Population = record.Population;
                var Violent = record.Violent;
                var Property = record.Property;
                var Murder = record.Murder;
                var Forcible_Rape = record.Forcible_Rape;
                var Robbery = record.Robbery;
                var Aggravated_assault = record.Aggravated_assault;
                var Burglary = record.Burglary;
                var Larceny_Theft = record.Larceny_Theft;
                var Vehicle_Theft = record.Vehicle_Theft;
                if (decade in results) {
                    results[decade][1] += parseInt(Population);
                    results[decade][2] += parseInt(Violent); 
                    results[decade][3] += parseInt(Property);
                    results[decade][4] += parseInt(Murder);
                    results[decade][5] += parseInt(Forcible_Rape);
                    results[decade][6] += parseInt(Robbery);
                    results[decade][7] += parseInt(Aggravated_assault);
                    results[decade][8] += parseInt(Burglary);
                    results[decade][9] += parseInt(Larceny_Theft);
                    results[decade][10] += parseInt(Vehicle_Theft);
                    // results[decade].push(parseInt(Population));
                    // results[decade].push(Total);
                    // results[decade].push(Violent);
                    // results[decade].push(Property);
                    // results[decade].push(Murder);
                    // results[decade].push(Forcible_Rape);
                    // results[decade].push(Robbery);
                    // results[decade].push(Aggravated_assault);
                    // results[decade].push(Burglary);
                    // results[decade].push(Larceny_Theft);
                    // results[decade].push(Vehicle_Theft);
                } else {          
                    results[decade] = []; 
                    results[decade].push(decade);               
                    // Population += parseInt(Population);
                    // Violent += parseInt(Violent); 
                    // Property += parseInt(Property);
                    // Murder += parseInt(Murder);
                    // Forcible_Rape+= parseInt(Forcible_Rape);
                    // Robbery += parseInt(Robbery);
                    // Aggravated_assault += parseInt(Aggravated_assault);
                    // Burglary += parseInt(Burglary);
                    // Larceny_Theft += parseInt(Larceny_Theft);
                    // Vehicle_Theft += parseInt(Vehicle_Theft);
                    results[decade].push(parseInt(Population));
                    results[decade].push(parseInt(Violent));
                    results[decade].push(parseInt(Property));
                    results[decade].push(parseInt(Murder));
                    results[decade].push(parseInt(Forcible_Rape));
                    results[decade].push(parseInt(Robbery));
                    results[decade].push(parseInt(Aggravated_assault));
                    results[decade].push(parseInt(Burglary));
                    results[decade].push(parseInt(Larceny_Theft));
                    results[decade].push(parseInt(Vehicle_Theft));
                }
            }
        });

        for (var x in results) {
            if (results[x].length > 1) {
                results[x].sort((a, b) => { a - b });            
            }    
            final.push({
                "Year": results[x][0]
                ,"Population": results[x][1],"Violent": results[x][2],"Property": results[x][3],"Murder": results[x][4],"Forcible_Rape": results[x][5],"Robbery": results[x][6],"Aggravated_assault": results[x][7],"Burglary": results[x][8],"Larceny_Theft": results[x][9],"Vehicle_Theft": results[x][10]
            });
        }
      
        console.log(final)
            //Convert Js Objects to string and write to a csv file
       stringifier(final, { header: true, columns: headers }, (err, data) => {
        fs.writeFile('output/answer-1/main.csv', data, () => {
            console.log('Written'); 
            second();
            third();           
        });
    });
}

//second problem 

function second() {
    const data = fs.readFileSync('input/question-2/main.csv');
    const records = parser(data, { columns: true });
    const results = {};
    const final = []
    const headers = ["occupation","min","max"];

    records.forEach(record => {
        if (record.occupation) { 
            var age = record.age;
            if (record.occupation in results) {
                results[`${record.occupation}`].push(age);
            } else {                
                results[`${record.occupation}`] = [];                
                results[`${record.occupation}`].push(age);
            }
        }
    });
    for (var x in results) {
        if (results[x].length > 1) {
            results[x].sort((a, b) => { a - b });            
        }    
      var max = results[x].reduce(function(a, b) {
        return Math.max(a, b);
    });

    var min = results[x].reduce(function(a, b) {
        return Math.min(a, b);
    });


        final.push({
            occupation: x,
            min: min,
            max: max
        });
    }
    console.log(final.sort((a,b)=>a.occupation.localeCompare(b.occupation)));

    stringifier(final, { header: true, columns: headers }, (err, data) => {
        fs.writeFile('output/answer-2/main.csv', data, () => {
            console.log('Written');           
        });
    });

}

//third problem

function third() {
    const data = fs.readFileSync('input/question-3/main.csv');
    const records = parser(data, { columns: true });
    const results = {};
    const final = []
    const headers = ["Teams","Yellow Cards","Red Cards"];
    records.forEach(record => {
        if (record.Team) { 
            var yellowcards = 'Yellow Cards';
            var redcards = 'Red Cards';
            var yellow = record[`${yellowcards}`]
            var red = record[`${redcards}`]
            if (record.team in results) {
                results[record.Team].push(record[`${yellowcards}`]);
                results[record.Team].push(record[`${redcards}`]);
            } else {             
                results[record.Team] = [];                
                results[record.Team].push(record[`${yellowcards}`]);
                results[record.Team].push(record[`${redcards}`]);
            }
        }
    });
    
    for (var x in results) {
        if (results[x].length > 1) {
            results[x].sort((a, b) => { a - b });            
        }    
      
        final.push({
            Teams: x,
            "Yellow Cards": results[x][0],
            "Red Cards": results[x][1]
        });
    }
  
final.sort((a,b) => {
    if( a["Red Cards"]  ||  b["Red Cards"] ) {
      if( a["Red Cards"]  &&  b["Red Cards"] ) {
        if( a["Red Cards"]  ===  b["Red Cards"] ) {
          return  b["Yellow Cards"]  -  a["Yellow Cards"] ;
        }
        return b["Red Cards"] - a["Red Cards"];
      }
      return b["Red Cards"] ? -1 : 1;
    }
    return b["Yellow Cards"] - a["Yellow Cards"]
  });
    console.log(final);
    stringifier(final, { header: true, columns: headers }, (err, data) => {
        fs.writeFile('output/answer-3/main.csv', data, () => {
            console.log('Written');           
        });
    });


}



// first();
// second();
// third();