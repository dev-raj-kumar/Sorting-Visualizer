export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
   //return array;
  }
  
  function mergeSortHelper(mainArray,startIdx,endIdx,auxiliaryArray,animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,animations,) {
    if(startIdx === 0 && endIdx === (mainArray.length-1)){
      doMergeFinal(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
      return;
    }
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {

      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([1,k]); // yellow
        animations.push([-1,k,auxiliaryArray[i]]);

        animations.push([2,j,k]); // green
        animations.push([-2,j,k]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        
        animations.push([3,j,k]);  // red
        animations.push([-3,j,k,auxiliaryArray[j]]);

        animations.push([2,j,k,]); // green
        animations.push([-2,j,k]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
     
      animations.push([1,k]); // yellow
        animations.push([-1,k,auxiliaryArray[i]]);
        animations.push([4,k]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
    
      animations.push([3,j,k]);  // red
        animations.push([-3,j,k,auxiliaryArray[j]]);
        animations.push([4,k]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  function doMergeFinal(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,animations,) {
    
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      

      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        
        animations.push([1,k]); // yellow
        animations.push([-1,k,auxiliaryArray[i]]);

        animations.push([2,j,k]); // green
        animations.push([-2,j,k]);
        animations.push([0,k]); // orange
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        
        animations.push([3,j,k]);  // red
        animations.push([-3,j,k,auxiliaryArray[j]]);

        animations.push([2,j,k,]); // green
        animations.push([-2,j,k]);
        animations.push([0,k]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
     
      animations.push([1,k]); // yellow
      animations.push([-1,k,auxiliaryArray[i]]);
      animations.push([0,k]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      
      animations.push([3,j,k]);  // red
      animations.push([-3,j,k,auxiliaryArray[j]]);
      animations.push([0,k]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
