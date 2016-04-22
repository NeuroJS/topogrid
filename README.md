# topogrid
a node module for interpolation of topographic EEG plots

# to install
`npm install topogrid`

#example usage

```
var topogrid = require('topogrid')

// x coordinates of the data
var pos_x = [1,5,10];

// y coordinates of the data
var pos_y = [1,5,10];

// the data values
var data = [1,10,1];

// the parameters for the grid [x,y,z] where x is the min of the grid, y is the
// max of the grid and z is the number of points
var grid_params = [0,10,11];

zi = topogrid.create(pos_x,pos_y,data,grid_params);
```

