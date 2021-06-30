export function getQuickSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;

    quickSortHelper(0,array.length-1,array,animations);
    //console.log(animations);
    return animations;
    //return array;
}

function quickSortHelper(s,e,array,animations){
    if(s < e){
        let p = randomIntFromInterval(s,e);
        let t = array[p];
        array[p]=array[e]; 
        array[e]=t;
        animations.push([4,p,e])        // pink color
        animations.push([-4,p,e,array[p],array[e]]);

        animations.push([5,e]);    // pivot color
        let part = partition(s,e,array,animations);
        quickSortHelper(s,part-1,array,animations);
        quickSortHelper(part+1,e,array,animations);
    }
    else if(s === e){
        animations.push([0,s]);
    }
}

function partition(s,e,array,animations){
    let pivot = array[e];
    let i = s-1;

    for(let j=s;j<e;j++){
        
        if(array[j] <= pivot){
            animations.push([1,j,e]); // red color
           // animations.push([-1,j,e]);
            let t = array[j];
            array[j]=array[++i];
            array[i]=t;
            animations.push([2,i,j]); // yellow color
            
            animations.push([-2,i,j,t,array[j]]); 
        }
        
            animations.push([3,j,e]); // green color
            animations.push([-3,j,e]); // change e to pivot color
        
    }

    
    //animations.push([-1,e,i]);

    let t = array[e];
    array[e]=array[++i];
    array[i]=t;

    animations.push([1,e,i]);
    animations.push([2,e,i]);
    animations.push([-2,e,i,array[e],t]); 

    animations.push([-5,e]);

    animations.push([0,i]);  // orange color
    return i;
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1) +min);
}