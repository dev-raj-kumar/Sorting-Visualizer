import React from 'react';
import Slider from 'react-input-slider';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/bubbleSort.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/quickSort.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/heapSort.js';

// Change this value for the speed of the animations.
var animationSpeed = 5;

// Change this value for the number of bars (value) in the array.
var noOfBars = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#5bc0de';

const SORTED_COLOR = '#FF7E67';

const CORRECT_ORDER = '#54E346'; 

const WRONG_ORDER = '#DA0037';

const SWAP_COLOR = '#FFC107';

const PIVOT_COLOR = '#890596';


export default class SortingVisualizer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            array: [],
            x : 30,
            disabled : false
        };
    }

    componentDidMount(){
        this.resetArray(this.state.x);
       // console.log("componentDidMount");
        //console.log(this.state);
    }

     resetArray(x){
         noOfBars = Math.floor((parseInt(x) + 3) * 1.65);
        const arr = [];
        for(let i=0;i<noOfBars;i++){
            arr.push(randomIntFromInterval(3,583));
        }
        animationSpeed = 575 - Math.pow(arr.length, 2) > 0 ?575 - Math.pow(arr.length, 2) :
                    noOfBars < 50 ? 50:
                    noOfBars < 75 ? 41:
                    noOfBars < 100 ? 31:
                    noOfBars < 125 ? 20:
                    noOfBars < 150 ? 13:
                    4;
      //  console.log(arr.length);
         this.setState({array:arr,x:x,disabled:false});
        //console.log(this.state);
    }

    enableButtons(){
        this.setState({disabled : false});
        //console.log("enabled Buttons");
    }

    mergeSort() {
       // console.log("merge sort clicked");
        const animations = getMergeSortAnimations(this.state.array);
       // console.log(animations);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
          
            const id = animations[i][0];
            if(id === 4){
                const barOneStyle = arrayBars[animations[i][1]].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
                  }, i * animationSpeed);
            }
            else if(id === 1 || id === -1){
                const barOneStyle = arrayBars[animations[i][1]].style;
                setTimeout(() => {
                    if(id === 1)
                    barOneStyle.backgroundColor = `${SWAP_COLOR}`;
                    else
                    barOneStyle.height = `${animations[i][2]}px`; 
                  }, i * animationSpeed);
            }
            else if(id !== 0){
                const barOneStyle = arrayBars[animations[i][1]].style;
                const barTwoStyle = arrayBars[animations[i][2]].style;

                const color =  (id === 2) ? `${CORRECT_ORDER}` :(id === -2)? `${PRIMARY_COLOR}` :  `${WRONG_ORDER}`;
                if(id === 3 || id === -3){
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        if(id === -3)
                        barTwoStyle.height = `${animations[i][3]}px`; 
                      }, i * animationSpeed);
                }
                else{
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                      }, i * animationSpeed);
                }
            }
            else if(id === 0){
                const barOneStyle = arrayBars[animations[i][1]].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = `${SORTED_COLOR}`;
                  }, i * animationSpeed);
            }
        }
        setTimeout(() => {
            const arrayBars = document.getElementsByClassName('array-bar');
            for(let j=0;j<this.state.array.length;j++){
                const barOneStyle = arrayBars[j].style;
                barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
            }
            this.enableButtons();
          }, animations.length * animationSpeed);
    }

    heapSort(){
       // console.log("Heap Sort got clicked");
        const animations = getHeapSortAnimations(this.state.array);
       // console.log(animations);
       const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0;i<animations.length;i++){
            
            const id = animations[i][0];
            if(id !== 0){
                const barOneStyle = arrayBars[animations[i][1]].style;
                const barTwoStyle = arrayBars[animations[i][2]].style;

                const color = (id === 1 || id === -1) ? `${WRONG_ORDER}` : (id === 2) ? `${CORRECT_ORDER}` : `${PIVOT_COLOR}`;

                if(id !== -2){

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        if(id === -1 || id === -3){
                            
                            barOneStyle.height = `${animations[i][3]}px`;
                            barTwoStyle.height = `${animations[i][4]}px`;
                        }
                      }, i * animationSpeed);
                }
                else{
                    setTimeout(() => {
                        barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
                        barTwoStyle.backgroundColor = `${PRIMARY_COLOR}`;
                      }, i * animationSpeed);
                }
            }
            else if(id === 0){
                const barOneStyle = arrayBars[animations[i][1]].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = `${SORTED_COLOR}`;
                  }, i * animationSpeed);
            }
        }
        setTimeout(() => {
            const arrayBars = document.getElementsByClassName('array-bar');
            for(let j=0;j<this.state.array.length;j++){
               
                const barOneStyle = arrayBars[j].style;
                barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
            }
            this.enableButtons();
          }, animations.length * animationSpeed);
    }

    bubbleSort(){
       // console.log("Bubble sort got clicked");
        const animations = getBubbleSortAnimations(this.state.array);
      
        //console.log(this.state.array);
        for(let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const id = animations[i][0];
            if(id !== 0){
                
                const barOneStyle = arrayBars[animations[i][1]].style;
                const barTwoStyle = arrayBars[animations[i][2]].style;
                const color = (id === 1) ? `${CORRECT_ORDER}` : `${WRONG_ORDER}`;
                if(id !== -1){
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    if(id === -2){
                        
                        barOneStyle.height = `${animations[i][3]}px`;
                        barTwoStyle.height = `${animations[i][4]}px`;
                    }
                  }, i * animationSpeed);
                }
                else{
                    setTimeout(() => {
                        barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
                        barTwoStyle.backgroundColor = `${PRIMARY_COLOR}`;
                      }, i * animationSpeed);
                }
            }
            else if(id === 0){
               // console.log(animations[i][1]);
                const barOneStyle = arrayBars[animations[i][1]].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = `${SORTED_COLOR}`;
                  }, i * animationSpeed);
               
            }
        }
        setTimeout(() => {
            const arrayBars = document.getElementsByClassName('array-bar');
            for(let j=0;j<this.state.array.length;j++){
                const barOneStyle = arrayBars[j].style;
                barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
            }
            this.enableButtons();
          }, animations.length * animationSpeed);
    }

    quickSort(){
        //console.log("Quick sort got clicked");
        const animations = getQuickSortAnimations(this.state.array);
       // console.log(this.state.array);
       const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0;i<animations.length;i++){
            
            const id = animations[i][0];
            if(id === 5 || id === -5){
                const barOneStyle = arrayBars[animations[i][1]].style;
                const color = (id === 5) ?  `${PIVOT_COLOR}`: `${PRIMARY_COLOR}`;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                      }, i * animationSpeed);
                
            }
            else if(id !== 0){

                const barOneStyle = arrayBars[animations[i][1]].style;
                const barTwoStyle = arrayBars[animations[i][2]].style;
                const color = (id === 1) ? `${WRONG_ORDER}` : (id === 2 || id === -2) ? `${SWAP_COLOR}` : (id === 3) ? `${CORRECT_ORDER}` : `${PIVOT_COLOR}`;
                //console.log(id);
                if(id === 1 || id === 2 || id === 3 || id === 4){

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                      }, i * animationSpeed);
                }
                else if(id === -4 || id === -2){
                    setTimeout(() => {
                        barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
                        barTwoStyle.backgroundColor = `${PRIMARY_COLOR}`;
                        barOneStyle.height = `${animations[i][3]}px`;
                        barTwoStyle.height = `${animations[i][4]}px`;
                      }, i * animationSpeed);
                }
                else{
                    setTimeout(() => {
                        barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
                        barTwoStyle.backgroundColor = `${PIVOT_COLOR}`;
                      }, i * animationSpeed);
                }
            }
            else if(id === 0){
                const barOneStyle = arrayBars[animations[i][1]].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = `${SORTED_COLOR}`;
                  }, i * animationSpeed);
            }
            
        }

        setTimeout(() => {
            const arrayBars = document.getElementsByClassName('array-bar');
            for(let j=0;j<this.state.array.length;j++){
              
                const barOneStyle = arrayBars[j].style;
                barOneStyle.backgroundColor = `${PRIMARY_COLOR}`;
            }
            this.enableButtons();
          }, animations.length * animationSpeed);
        
    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomIntFromInterval(1, 1000);
        // const length = 10;
          for (let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          const mergeSortedArray = getHeapSortAnimations(array.slice());
         // console.log(javaScriptSortedArray);
          //console.log(mergeSortedArray);
          console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
        this.enableButtons();
      }

    render(){
        const arr =  this.state.array;
       // console.log(arr);

       // const { innerWidth: width, innerHeight: height } = window;
        const numWidth = Math.floor(window.innerWidth / (arr.length * 3));
        const width = numWidth;
        const numMargin = arr.length < 5 ?
            10 : arr.length < 8 ?
                8 : arr.length < 11 ?
                     6 : arr.length < 20 ?
                         4 : arr.length < 50 ?
                             3.5 : arr.length < 100 ?
                                3 : arr.length < 130 ?
                                    2.5 : 2;
        const margin = numMargin;
        const color = numWidth > 20 ? "white" : "transparent";
        const numFont = numWidth > 70 ?
             20 : numWidth > 60 ?
                18 : numWidth > 50 ?
                    16 : numWidth > 40 ?
                         14 : numWidth > 30 ?
                            12 : numWidth > 20 ?
                                10 : 8;
        const fontSize = numFont;
        
        return(
            <div className="bodyContainer">
                
            <nav className="navbar navbar-dark bg-dark navBoot">
                <button disabled={this.state.disabled} onClick={() => this.setState({disabled:true},() => this.resetArray(this.state.x))} className="btn btn-outline-info">Generate New Array</button>
                <label style={{color:'white'}} className="form-check-label">Change Array Size and Sorting Speed</label>
                <Slider
                    axis="x"
                    x={this.state.x}
                    onChange={({ x }) => this.resetArray(x)}
                    disabled={this.state.disabled}
                    styles={{
                             track: {
                             backgroundColor: '#5bc0de'
                            },
                            active: {
                                 backgroundColor: '#F73859'
                            }}}
                />
                <button disabled={this.state.disabled} onClick={() => this.setState({disabled:true},() => this.mergeSort())} className="btn btn-outline-info">Merge Sort</button>
                <button disabled={this.state.disabled} onClick={() => this.setState({disabled:true},() => this.bubbleSort())} className="btn btn-outline-info">Bubble Sort</button>
                <button disabled={this.state.disabled} onClick={() => this.setState({disabled:true},() => this.quickSort())} className="btn btn-outline-info">Quick Sort</button>
                <button disabled={this.state.disabled} onClick={() => this.setState({disabled:true},() => this.heapSort())} className="btn btn-outline-info">Heap Sort</button>
            </nav>
                
            <div className="visualizer">
            {
                arr.map((val,id) =>{
                    return(
                        <div className="array-bar" key={id}
                         style={{height: `${val}px`, width: `${width}px`, marginLeft: `${margin}px`, marginRight: `${margin}px`, backgroundColor: `${PRIMARY_COLOR}`, color: color, fontSize: `${fontSize}px`}}
                         >
                           
                        </div>
                    )
                })
            }
            </div>
            </div>
        );
        
    }

}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1) +min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }
