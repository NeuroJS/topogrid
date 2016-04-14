var topogrid = require('../index')

// x coordinates of the data
var pos_x = [1,2,3];

// y coordinates of the data
var pos_y = [1,2,3];

// the data values
var data = [1,2,3];

// the parameters for the grid [x,y,z] where x is the min of the grid, y is the
// max of the grid and z is the number of points
var grid_params = [0,10,11];

zi = topogrid.create(pos_x,pos_y,data,grid_params);
console.log(zi)
//
//
// // x coordinates of the data
// var pos_x = [1,2,3,4,5,6,7,8];
//
// // y coordinates of the data
// var pos_y = [1,2,3,4,5,6,7,8];
//
// // the data values
// var data = getRandomInts(0, 10, 8)
//
// function getRandomInts(min, max, num) {
//   var data = []
//     for(i=0; i<num; i++){
//       data.push(Math.floor(Math.random() * (max - min)) + min)
//     }
//   return data
// };
//
// var grid_params = [0,10,11];
//
// zi = topogrid.create(pos_x,pos_y,data,grid_params);
// console.log(zi)
