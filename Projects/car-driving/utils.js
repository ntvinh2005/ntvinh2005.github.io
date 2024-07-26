function getIntersection(A, B, C, D){
    //console.log(C, D)
    let a = 0, b = 0, c = 0, d = 0;
    if (A.x != B.x){
        a = (B.y - A.y)/(B.x - A.x);
        b = A.y - A.x*(B.y - A.y)/(B.x - A.x);
    }
    if (C.x != D.x) {
        c = (D.y - C.y)/(D.x - C.x);
        d = C.y - C.x*(D.y - C.y)/(D.x - C.x);
    }
    
    //console.log(a, b, c, d)
    let x = 0, y = 0;
    if (A.x != B.x && C.x != D.x){
        x = (b - d)/(c - a);
        y = a*(b - d)/(c - a) + b;
    }
    else if (A.x == B.x && C.x != D.x){
        x = A.x
        y = c*x + d
    }
    else if (A.x != B.x && C.x == D.x){
        x = C.x
        y = a*x + b 
    }
    else {
        if (A.x == C.x 
        && (Math.abs(A.y - C.y) + Math.abs(C.y - B.y) == Math.abs(A.y - B.y) || Math.abs(A.y - D.y) + Math.abs(D.y - B.y) == Math.abs(A.y - B.y))) return {x: A.x, y: A.y, offset: 0}
        else return null
    }


    if(Math.abs(B.x - x) + Math.abs(A.x - x) == Math.abs(A.x - B.x)
    && Math.abs(B.y - y) + Math.abs(A.y - y) == Math.abs(A.y - B.y)
    && Math.abs(C.x - x) + Math.abs(D.x - x) == Math.abs(D.x - C.x)
    && Math.abs(C.y - y) + Math.abs(D.y - y) == Math.abs(D.y - C.y)){
        return {
            x: x,
            y: y,
            offset: Math.hypot((x - A.x),(y - A.y))/Math.hypot((A.x - B.x),(A.y - B.y))
        }
    }
    //console.log("No danger")
    return null
}

function polyIntersects(poly1, poly2) {
    for (let i=0; i<poly1.length; i++) {
        for (let j=0; j<poly2.length; j++){
            const touch = getIntersection(
                poly1[i], 
                poly1[(i+1)%poly1.length], 
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if (touch) {
                return true
            }
        }
    }
    return false
}