export function getHeapSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return animations;

    heapSortHelper(array.length,array,animations);
    //return array;
   // console.log(array);
    return animations;
}

function heapSortHelper(n,array,animations){

    buildMaxHeap(array,n,animations);
    
    for(let i = n-1; i>0 ; i--){

        let t = array[i];
        array[i]=array[0];
        array[0]=t;
        animations.push([3,0,i]);
        animations.push([-3,0,i,t,array[i]]);
        animations.push([0,i]);

        let j=0,index;

        do{

            index = ((2*j) + 1);
            
            if (index < (i - 1) && (array[index] < array[index + 1]))
                index++;
          
            if ( (index < i) && (array[j] < array[index])){
                
                let t = array[j];
                array[j]=array[index];
                array[index]=t;
                animations.push([1,j,index]);
                animations.push([-1,j,index,array[j],array[index]]);
                animations.push([2,j,index]);
                animations.push([-2,j,index]);
            }
            else{
                if((2*j)+1 < (i-1)){
                animations.push([2,j,(2*j)+1]);
                animations.push([-2,j,(2*j)+1]);
                }
                if((2*j)+2 < i){
                animations.push([2,j,(2*j)+2]);
                animations.push([-2,j,(2*j)+2]);
                }
            break;
            }
          
            j = index;
        }while(index < i);
    }
}


function buildMaxHeap(array,n,animations) 
{ 
    for (let i = 1; i < n; i++) 
    {
        // if child is bigger than parent
        if (array[i] > array[Math.floor((i - 1) / 2)]) 
        {
            let j = i;
      
            // swap child and parent until
            // parent is smaller
            while (j>0 && (array[j] > array[Math.floor((j - 1) / 2)]))
            {
                let p = Math.floor((j - 1) / 2);
                let t = array[p];
                array[p]=array[j];
                array[j]=t;
                animations.push([1,j,p]);
                animations.push([-1,j,p,array[j],array[p]]);
                animations.push([2,j,p]);
                animations.push([-2,j,p]);
                j = p;
            }
            if(j > 0){
                animations.push([2,j,Math.floor((j - 1) / 2)]);
                animations.push([-2,j,Math.floor((j - 1) / 2)]);
            }
        }
        else{
            animations.push([2,i,Math.floor((i - 1) / 2)]);
            animations.push([-2,i,Math.floor((i - 1) / 2)]);
        }
    }
}
