var math = require('mathjs')

exports.create = function(x, y, v, gp){

  var grid_params = _linspace(gp[0],gp[1],gp[2])
  var grid = _make2dGrid(grid_params,grid_params);
  var xi = grid[0];
  var yi = grid[1];
  var xy = []

  x.forEach((xval,index)=>{
    xy.push(math.add(xval,math.multiply(y[index],math.complex(0,-1))))
  })

  // compute d
  var d = []
  x.forEach((xval)=>{
    d.push(xy)
  })
  var d = math.matrix(d)
  d = math.abs(math.subtract(d,math.transpose(d)))
  d = math.add(d,math.eye(x.length))

  // compute g
  var g1 = math.dotMultiply(d,d)
  var g2 = math.subtract(math.log(d),1)
  var g = math.dotMultiply(g1,g2)
  g = math.add(g,math.eye(g['_data'].length))

  // compute weights
  var weights = math.lusolve(g,v)
  weights = weights['_data']
  weights = [].concat.apply([], weights);

  var m = xi.length;
  var n = m;

  var zi = math.zeros(m,n)['_data'];
  xy = math.transpose(xy);

  // g = np.empty(xy.shape)

  for(i in math.range(0,m)['_data']){
    for(j in math.range(0,n)['_data']){

      var a1 = math.multiply(yi[i][j], math.complex('-1i'))
      var a2 = math.subtract(a1,xy)

      var a3 = math.add(xi[i][j],a2)
      d = math.abs(a3)

      mask=[]
      d.forEach((di,index)=>{
        if(di===0){
          d[index]=1;
          mask.push(1)
        } else {
          mask.push(0)
        }
      });

      g = math.subtract(math.log(d),1)
      g = math.dotMultiply(g,math.dotMultiply(d,d))

      g.forEach((gi,index)=>{
        if(mask[index]===1){
          g[index] = 0
        }
      });

      zi[i][j] = math.dot(g,weights);
    }
  }

  // helper function like meshgrid, but only for 2d arrays
  function _make2dGrid(xi,yi){
    var Xi = []
    xi.forEach(()=>{
      Xi.push(xi)
    });
    var Yi = math.transpose(Xi)
    return [Xi,Yi]
  };

  // borrowed function from numeric.js
  function _linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
  };

  return zi
};
