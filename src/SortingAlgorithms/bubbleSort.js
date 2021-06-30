export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    let f = 1;let flag = true;
    for(let i=0;i<array.length;i++){
        let j; f = 0;
        if(flag)
        for(j=1;j+i<array.length;j++){

            animations.push([1,j-1, j]);
            animations.push([-1,j-1, j]);

            if(array[j-1] > array[j]){
                animations.push([2,j-1,j]);
                animations.push([-2,j-1,j,array[j],array[j-1]]);
                let val = array[j];
                array[j]=array[j-1];
                array[j-1]=val;
                animations.push([1,j-1, j]);
                animations.push([-1,j-1, j]);
                f=1;
            }
        }
        if(f === 0)
        flag = false;
       
        animations.push([0,array.length-i-1]);
    }
    return animations;
   //return array;
}