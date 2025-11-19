class Matrix3
{
    constructor(opts={})
    {
        this.name = opts.name??"Matrix3x3";
        this.a = Array(9);
        this.setIdentity();
        if (opts.i && opts.j)
            this.setOrthoBasis(opts.i,opts.j);
    }    

    setIdentity()
    {
        for (let i=0;i<this.a.length;i++) 
            this.a[i] = 0;
        this.a[0] = this.a[4] = this.a[8] = 1.0;
        return this;
    }

    isIdentity()
    {
        let is = true;
        for (let i=0;i<this.a.length;i++) 
        {
            if (i==0 || i==4 || i==8)
            {
                if (this.a[i] != 1.0){
                    is = false;
                    break;
                }
            }
            else
            {
                if (this.a[i] != 0.0)
                {
                    is = false;
                    break;
                }
            }
        }
        return is;
    }    

    copy()
    {
        let copy = new Matrix3();
        for (let i=0;i<this.a.length;i++)
            copy.a[i] = this.a[i];
        return copy;
    }

/*
              M

            0 3 6
    tmp     1 4 7
            2 5 8
    0 3 6
    1 4 7
    2 5 8

*/
    multiplyBy(M)
    {
        let tmp = this.copy();

		this.a[0] = tmp.a[0]*M.a[0] + tmp.a[3]*M.a[1] + tmp.a[6]*M.a[2];
		this.a[1] = tmp.a[1]*M.a[0] + tmp.a[4]*M.a[1] + tmp.a[7]*M.a[2];
		this.a[2] = tmp.a[2]*M.a[0] + tmp.a[5]*M.a[1] + tmp.a[8]*M.a[2];

		this.a[3] = tmp.a[0]*M.a[3] + tmp.a[3]*M.a[4] + tmp.a[6]*M.a[5];
		this.a[4] = tmp.a[1]*M.a[3] + tmp.a[4]*M.a[4] + tmp.a[7]*M.a[5];
		this.a[5] = tmp.a[2]*M.a[3] + tmp.a[5]*M.a[4] + tmp.a[8]*M.a[5];

		this.a[6] = tmp.a[0]*M.a[6] + tmp.a[3]*M.a[7] + tmp.a[6]*M.a[8];
		this.a[7] = tmp.a[1]*M.a[6] + tmp.a[4]*M.a[7] + tmp.a[7]*M.a[8];
		this.a[8] = tmp.a[2]*M.a[6] + tmp.a[5]*M.a[7] + tmp.a[8]*M.a[8];

        return this;
    }

    multiplyVector(V)
    {
        return createVector
        (
            this.a[0] * V.x + this.a[3] * V.y + this.a[6],
            this.a[1] * V.x + this.a[4] * V.y + this.a[7]
        )
    }

    translateV(t)
    {
        return this.multiplyBy( (new Matrix3()).setTranslation(t) );
    }

    translate(x,y)
    {
        return this.multiplyBy( (new Matrix3()).setTranslation(x,y) );
    }

    rotate(angle)
    {
        return this.multiplyBy( (new Matrix3()).setRotation(angle) );
    }

    scale(s,t)
    {
        return this.multiplyBy( (new Matrix3()).setScale(s,t) );
    }
     
    
    setScale(s,t=undefined)
    {
        this.a[0] = s;
        this.a[4] = t??s;
        return this;
    }
    
    setTranslation()
    {
        if (arguments.length == 1)
        {
            this.a[6] = arguments[0].x; // assume a p5.Vector
            this.a[7] = arguments[0].y;;
            this.a[8] = 1.0;
        }
        else
        if (arguments.length == 2)
        {
            this.a[6] = arguments[0];
            this.a[7] = arguments[1];
            this.a[8] = 1.0;
        }
        
        return this;
    }

    getTranslation()
    {
        return createVector(this.a[6],this.a[7]);
    }
    

    setRotation(angle)
    {
        let c = Math.cos(angle);
        let s = Math.sin(angle);

        this.a[0] = c;
        this.a[1] = s;
        this.a[3] = -s;
        this.a[4] = c;

        return this;
    }


    setOrthoBasis()
    {
        let O,i,j;

        if (arguments.length === 3)
        {
            O = arguments[0] || createVector();
            i = arguments[1];
            j = arguments[2];
        }
        else
        if (arguments.length === 2)
        {
            i = arguments[0];
            j = arguments[1];
        }

        this.setIdentity();

        this.a[0] = i.x;
        this.a[1] = i.y;
        this.a[3] = j.x;
        this.a[4] = j.y;

        if (O)
        {
            this.a[6] = O.x;
            this.a[7] = O.y;
        }

        return this;
    }

/*
    0 1 2
    3 4 5 
    6 7 8 
    
    0 3 6
    1 4 7
    2 5 8
*/
    getDeterminant()
    {
        return this.a[0] * ( this.a[4]*this.a[8] - this.a[7]*this.a[5] )
		- this.a[1] * ( this.a[3]*this.a[8] - this.a[6]*this.a[5] )
		+ this.a[2] * ( this.a[3]*this.a[7] - this.a[6]*this.a[4] );

    }

    // TODO : verify for column based matrix
    getInverse()
    {
        let d = this.getDeterminant();        
        d = 1.0/d;

        let Minv = new Matrix3();

        Minv.a[0] =    this.a[4]*this.a[8] - this.a[7]*this.a[5]   / d;
        Minv.a[1] = -( this.a[1]*this.a[8] - this.a[7]*this.a[2] ) / d;
        Minv.a[2] =    this.a[1]*this.a[5] - this.a[2]*this.a[4]   / d;
    
        Minv.a[3] = -( this.a[3]*this.a[8] - this.a[5]*this.a[6] ) / d;
        Minv.a[4] =    this.a[0]*this.a[8] - this.a[2]*this.a[6]   / d;
        Minv.a[5] = -( this.a[0]*this.a[5] - this.a[2]*this.a[3] ) / d;
    
        Minv.a[6] =    this.a[3]*this.a[7] - this.a[4]*this.a[6]   / d;
        Minv.a[7] = -( this.a[0]*this.a[7] - this.a[1]*this.a[6] ) / d;
        Minv.a[8] =    this.a[0]*this.a[4] - this.a[3]*this.a[1]   / d;
    
        return Minv;
    }

    getTransformSvg(p=4)
    {
        return `matrix(${this.a[0].toFixed(p)} ${this.a[1].toFixed(p)} ${this.a[3].toFixed(p)} ${this.a[4].toFixed(p)} ${this.a[6].toFixed(p)} ${this.a[7].toFixed(p)})`;
    }

    toString()
    {
        let s = `${this.name}\n`;
        for (let r=0;r<3;r++)
        {
            let sep="";
            for (let c=0;c<3;c++)
            {
                let offset = r + c*3; // invert r & c for logging
                let value = this.a[offset];
                if (sep !="" & (value<0)) sep = " ";
                s += sep+value.toFixed(3) + ( c == 2 ? "\n" : "" );                        
                sep = "  ";
            }
        }
        return s;
    }        
    
}