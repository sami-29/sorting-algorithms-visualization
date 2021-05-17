let main = document.querySelector('main')
let controlStateButton = document.querySelector(".start-stop")
let generateButton = document.querySelector(".generate")
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
        main.appendChild(div)
        div.style.cssText = VL + `left:${XOF}px`
        XOF = XOF + xoffset
    }
    for(let i=0;i<800/yoffset;i++)
    {
        let div = document.createElement("div")
        main.appendChild(div)
        div.style.cssText = HL + `top:${YOF}px`
        YOF = YOF + yoffset 
    }
}

function createRect(height, width, pos) //CREATES RECT AT POS X WITH HEIGHT H AND WIDTH W
{
    let div = document.createElement("div")
    div_array.push(div)
    main.appendChild(div)
    div.style.cssText = `height:${height}px; width: ${width}px;left: ${width*pos}px; top:0.3px; background-color:#CBC3E3; border: 0.3px solid black`
}

function createSeq(array = generate(), grid = false) //CREATES RECTS WITH CORRECT WIDTH AND HEIGHT
{   
    let div_array = []
    clear(main)
    const xoffset = 1366/array.length
    const yoffset = 593.433/Math.max.apply(Math, array)
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
    const xoffset = 1366/array.length
    const yoffset = 593.433/Math.max.apply(Math, array)
    const color = 'red'

    div_array[i].style.backgroundColor = color
    div_array[j].style.backgroundColor = color
    c = array[i]
    array[i] = array[j]
    array[j] = c



    createSeq(array, false)
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Sorting Algorithms

async function insertionSort(array) 
{ 
    let i, j; 
    const n = array.length;
    for (i = 1; i < n; i++)
    {  
        j = i - 1; 
        
        while (j >= 0 && array[j] > array[j+1])
        { 
            setTimeout(swap(array,j,j+1),fps);
            await sleep(fps);

            j = j - 1; 
            console.log(array);
        } 
    } 
}

function testfunc(message="working") { console.log(message) }


function generateMAIN(){
    array = generate(100,[1,70])
    createSeq(array, false)
}

function insertionSortMain(){
    controlStateButton.innerHTML = 'Stop'
    insertionSort(array)
}

function Stop(){
    controlStateButton.innerHTML = 'Start'
}

let algorithm;

// Running the program
if(controlStateButton.innerHTML === "Start"){
    controlStateButton.addEventListener("click",insertionSortMain)
}
else{
    controlStateButton.addEventListener("click",Stop)
}

generateButton.addEventListener("click",generateMAIN)


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
