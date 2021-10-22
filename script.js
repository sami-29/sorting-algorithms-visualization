let mainElement = document.querySelector('main')
let controlStateButton = document.querySelector(".start-stop")
let generateButton = document.querySelector(".generate")
let errorBox = document.querySelector('#error-box')
    
let array = [];
let div_array = []
const fps = 0
function createGrid(linesize = 1,xoffset = 12, yoffset=12) //CREATE GRID
{   
    const VL = `width :  ${linesize}px; height : 100%; background-color : black;`
    const HL = `height : ${linesize}px; width: 100%;background-color: black;`
    let XOF = 0
    let YOF = 0
    for(let i=0;i<1400/xoffset;i++)
    {
        let div = document.createElement("div")
        mainElement.appendChild(div)
        div.style.cssText = VL + `left:${XOF}px`
        XOF = XOF + xoffset
    }
    for(let i=0;i<800/yoffset;i++)
    {
        let div = document.createElement("div")
        mainElement.appendChild(div)
        div.style.cssText = HL + `top:${YOF}px`
        YOF = YOF + yoffset 
    }
}

function createRect(height, width, pos) //CREATES RECT AT POS X WITH HEIGHT H AND WIDTH W
{
    let div = document.createElement("div")
    div_array.push(div)
    mainElement.appendChild(div)
    div.style.cssText = `height:${height}px; width: ${width}px;left: ${(width+3)*pos}px; background-color:#CBC3E3; border: 1px solid black`
}

function createSeq(array = generate(), grid = false) //CREATES RECTS WITH CORRECT WIDTH AND HEIGHT
{   
    let div_array = []
    clear(mainElement)
    const xoffset = window.innerWidth/array.length
    const yoffset = window.innerHeight/Math.max.apply(Math, array)
    if(grid){createGrid(1, xoffset, yoffset)}
    for(let i=0; i<array.length;i++)
    {
        createRect(yoffset*array[i],xoffset,i)
    }
}

function generate(sequenceLength = 100, range = [0,100]) //GENERATES RANDOM SEQUENCE
{   
    array = []
    for(let i = 0; i<sequenceLength;i++)
    {
        array.push(Math.floor(Math.random() * range[1])+ range[0])
    }
    return array
}

function clear(element) //CLEARS CHILDREN OF THE ELEMENT*
{
    length = element.childElementCount
    for(let i=0; i<length;i++)
    {
        element.children[i-i].remove()
    }
}

// Animation

function swap(array,i,j)
{
    
    const color = 'red'

    div_array[i].style.backgroundColor = color
    div_array[j].style.backgroundColor = color
    c = array[i]
    array[i] = array[j]
    array[j] = c



    createSeq(array, false)
}

function assign(array, i, j)
{
    const color = 'red'

    div_array[i].style.backgroundColor = color
    array[i] = j



    createSeq(array, false)
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Sorting Algorithms

let currentSort

document.getElementById('insertion').addEventListener('click', () => {
    currentSort = insertionSort
})
document.getElementById('selection').addEventListener('click', () => {
    currentSort = selectionSort
})
document.getElementById('bubble').addEventListener('click', () => {
    currentSort = bubbleSort
})
document.getElementById('merge').addEventListener('click', () => {
    currentSort = mergeSort
})

async function selectionSort(array) { 
    let n = array.length;
        
    for (let i = 0; i < n; i++) {
        if (controlStateButton.innerHTML === 'Start'){break}
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < n; j++){
            if(array[j] < array[min]) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = array[i];
             setTimeout(swap(array, i, min), fps)
             await sleep(fps)
             setTimeout(assign(array, min, tmp), fps)
             await sleep(fps)    
        }
    }
    controlStateButton.innerHTML = 'Start'
}

async function insertionSort(array) 
{ 
    let i, j; 
    const n = array.length;
    for (i = 1; i < n; i++)
    {
        if (controlStateButton.innerHTML === 'Start'){break}
        j = i - 1; 
        
        while (j >= 0 && array[j] > array[j + 1]) {
            setTimeout(swap(array,j,j+1),fps);
            await sleep(fps);

            j = j - 1; 
            console.log(array);
        } 
    }
    controlStateButton.innerHTML = 'Start'
}

async function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        if (controlStateButton.innerHTML === 'Start'){break}
		for (let j = 0; j < array.length; j++) {
			if (array[j] > array[j + 1]) {
                let temp = array[j];
                setTimeout(swap(array,j,j+1),fps);
                await sleep(fps);
                setTimeout(assign(array,j+1,temp),fps);
                await sleep(fps);
			}
		}
    }
    controlStateButton.innerHTML = 'Start'
}

async function merge(array, l, m, r)
{
    if (controlStateButton.innerHTML === 'Start'){return}
    var n1 = m - l + 1;
    var n2 = r - m;
  
    // Create temp arrayays
    var L = new array(n1); 
    var R = new array(n2);
  
    // Copy data to temp arrayays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = array[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = array[m + 1 + j];
  
    // Merge the temp arrayays back into array[l..r]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = l;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            setTimeout(assign(array,k,L[i]),fps);
            await sleep(fps);
            i++;
        }
        else {
            setTimeout(assign(array,k,R[j]),fps);
            await sleep(fps);
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        setTimeout(assign(array,K,L[i]),fps);
        await sleep(fps);
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        setTimeout(assign(array,k,R[j]),fps);
        await sleep(fps);
        j++;
        k++;
    }
}
  
// l is for left index and r is
// right index of the sub-array
// of array to be sorted */
async function mergeSort(array,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(array,l,m);
    mergeSort(array,m+1,r);
    merge(array, l, m, r);
}



function generateMAIN(){
    if (controlStateButton.innerHTML === "Stop") { return }
    array = generate(300,[1,30])
    createSeq(array, false)
}


function controlflow() {
    if (controlStateButton.innerHTML === 'Start') {
        if (currentSort === undefined) {
            NoSortingAlgorithmSelected()
            return
        }
        controlStateButton.innerHTML = 'Stop'
        currentSort(array)
    }
    else {
        controlStateButton.innerHTML = 'Start'
    }
}


let algorithm;

// Running the program
const main = () => {
    controlStateButton.addEventListener("click", controlflow)
    generateButton.addEventListener("click",generateMAIN)
}

main()


/*
array = generate(100,[0,100])
createSeq(array,false)
insertionSort(array,array.length)
*/


// TESTING : 


/*
console.log(array[0],array[22])
swap(array,0,22)
console.log(array[0],array[22])
*/


// Errors
let BaseError = "<button id ='ok-button'><h3>OK</h3></button>"
const NoSortingAlgorithmSelected = () => {
    errorBox.innerHTML = "<h2>You haven't selected a sorting algorithm</h2>" + BaseError
    errorBox.style.display = 'block'
    const OkButton = document.getElementById('ok-button')
    OkButton.addEventListener("click", () => {
        errorBox.style.display = 'none'
    })
    
}