// ----------------------------------------
function getLineStripes2(vertices, angle, distStripes, interpolate, opts={'clip':true, 'backForth':true, 'distNearest':false})
{

    let linesAll    = [];
    let obb         = getOBB( vertices, createVector(cos(angle),sin(angle)) );
    let i           = obb.basis.i, j = obb.basis.j, v = obb.vertices;
    let step        = distStripes;
    let nbIntervals = int (obb.dim.h / distStripes); 
    let s           = 0,sA,sB,indexA,indexB;
    let A           = createVector(), B=createVector();
    for (let ii=0; ii<=nbIntervals; ii++)
    {
        s = ii*step;

        sd = interpolate ? interpolate.compute(0, obb.dim.h, s/obb.dim.h) : s;
        sA = sd;
        sB = sd;

        let dsA=0, dsB=0;
        if (isFunction(opts.perturbation))
        {
            [dsA,dsB] = opts.perturbation(s,obb.dim.h);
            sA += dsA; // useful if we want to be perturbate it a bit 
            sB += dsB;
        }

        indexA = 0, indexB = 1;

        // A & B slides along the y-axis of the obb
        // Give a little offset so we are sure to intersect polygons lines (edge case with square and obb = square)
        let offset  = 0.05*obb.dim.w;
        let obbA    = v[indexA], obbB = v[indexB]; 
        A.set( obbA.x + (-offset*i.x) + sA*j.x, obbA.y + (-offset*i.y) + sA*j.y);
        B.set( obbB.x + ( offset*i.x) + sB*j.x, obbB.y + ( offset*i.y) + sB*j.y);

        if (opts.backForth && ii%2==1)
        {
            let tmp = A;
            A=B;
            B=tmp;
        }

        if (opts.clip === true)
        {
            let linesClipped = getLinesPolygonIntersection(A,B,vertices,{'array':true});
            linesClipped.forEach( line => line.support = [A.copy(), B.copy()] ) // save the "baseline" as an array
            linesAll = linesAll.concat(linesClipped);
        }
        else
        {
            linesAll.push( [A.copy(), B.copy()] );
        }
    }    
    return linesAll;
}

// --------------------------------------------------
function getCentroid(vertices) 
{
    let res = createVector();
    for (let i = 0, num = vertices.length; i < num; i++) 
    {
        let a = vertices[i];
        let b = vertices[(i + 1) % num];
        let crossP = a.x * b.y - b.x * a.y;
        res.x += (a.x + b.x) * crossP;
        res.y += (a.y + b.y) * crossP;
    }
    let area = getArea(vertices);
    return res.mult(1.0 / (6.0 * area));
}

// --------------------------------------------------
function getArea(vertices) 
{
    let area = 0;
    for (let i = 0, num = vertices.length; i < num; i++) {
        let a = vertices[i];
        let b = vertices[(i + 1) % num];
        area += a.x * b.y;
        area -= a.y * b.x;
    }
    area *= 0.5;
    return area;
}    

// ------------------------------------------------------
function getBasisMatrix3(O,i,j)
{
    return (new Matrix3()).setOrthoBasis(O,i,j);
}

// ----------------------------------------
function getOBB(vertices, dir)
{
    let O       = getCentroid(vertices);
    let i       = dir.normalize();
    let j       = createVector(-dir.y,dir.x);
    let AABB    = getAABB(getVerticesInBasis(vertices,O, i, j));

    let M       = getBasisMatrix3(O,i,j);
    let OBB     = [];
    for (let k=0;k<4;k++)
        OBB[k] = M.multiplyVector( AABB[k] );

    let width   = AABB[1].x - AABB[0].x; 
    let height  = AABB[2].y - AABB[1].y; 
    let center = createVector( OBB[0].x + 0.5*i.x*width + 0.5*j.x*height, OBB[0].y + 0.5*i.y*width + 0.5*j.y*height  );

    return { center:center, basis : {O:O, i:i, j:j, matrix:M}, dim : {w:width, h:height}, vertices : OBB };        
}

// --------------------------------------------------
function getAABB(vertices)
{
    let AABB = [];
    let xMin = Infinity, yMin = Infinity;
    let xMax = -Infinity, yMax = -Infinity;

    vertices.forEach( v => {
        if (v.x < xMin) xMin = v.x;
        if (v.x > xMax) xMax = v.x;
        if (v.y < yMin) yMin = v.y;
        if (v.y > yMax) yMax = v.y;
    });
  
    AABB.push( createVector(xMin,yMin) );
    AABB.push( createVector(xMax,yMin) );
    AABB.push( createVector(xMax,yMax) );
    AABB.push( createVector(xMin,yMax) );

    AABB.x      = xMin;
    AABB.y      = yMin;
    AABB.width  = xMax-xMin;
    AABB.height = yMax-yMin;

    return AABB;
}

// --------------------------------------------------
function getVerticesInBasis(vertices, O,i,j)
{
    let vertices_   = [];
    vertices.forEach( v => 
    {
        let OV = createVector(v.x-O.x, v.y-O.y);
        vertices_.push( createVector(OV.dot(i), OV.dot(j)) );
    });
    return vertices_;
} 

// ----------------------------------------------------
function getLinesPolygonIntersection(A,B,vertices,opts={'log':false, 'array':true})
{
    let lines = [];
    let points = getPointsPolygonIntersection(A,B,vertices);
    if (opts.log)
    {
        console.log(`intersection points`);
        console.log(points);
    }
    
    points.sort( (P1,P2) =>
    {
        if (P1.dist(A) > P2.dist(A) ) return -1;
        return 0;
    });

    if (points.length%2==0)
    {
        for (let i=0; i<points.length; i=i+2)
        {
            lines.push( opts.array ? [points[i],points[i+1]] : {a:points[i], b:points[i+1]} );
        }
    }

    return lines;
}

// ----------------------------------------------------
function getPointsPolygonIntersection(A,B,vertices, opts={})
{
    let nb = vertices.length;
    let points = [];
    let AP,BP,I;
    for (let i=0; i<nb; i++)
    {
        AP  = vertices[i];
        BP  = vertices[(i+1)%nb];
        I   = getLineIntersection(A,B,AP,BP);
        if (I.is)
        {
            if (opts.infos)
            {
                I.p.indexA = i;
                I.p.indexB = (i+1)%nb;
            }

            points.push( I.p );
        }
    }
    
    return points;
}

// ----------------------------------------------------
function getLineIntersection(A,B,C,D)
{
    let  isec = {is:false},
    denom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y),
    na = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x),
    nb = (B.x - A.x) * (A.y - C.y) - (B.y - A.y) * (A.x - C.x);
    if (denom !== 0) 
    {
        let ua = na / denom,
            ub = nb / denom,
            vecI = p5.Vector.lerp(A,B,ua);

        if (ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0) {
            isec = {is:true,p:vecI};
        } 
        else {
            isec = {is:false/*,p:vecI*/};
        }
    } 
    else 
    {
        if (na === 0 && nb === 0) 
        {
            isec = {is:false};
        }
    }
    return isec;
}

