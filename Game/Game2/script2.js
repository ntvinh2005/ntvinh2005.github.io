


function changeColor(element){
    const color=element.id
    document.querySelector('.current-color').style.backgroundColor=color
    console.log(document.querySelector('.current-color').style.backgroundColor)
}

function takeColor(current_color){
    current_color=document.querySelector('.current-color').style.backgroundColor
    return current_color
}


const width=80
const height=25
const group=[]
const groupElement=document.querySelector('.group')


for(let y=1; y<=height;y++){
    const row=[]
    for(let x=1;x<=width;x++){
        const element=document.createElement('button')
        var color=element.style.backgroundColor
        const tile={
            element,
            x,
            y,
            color
        }
        row.push(tile)
    }
    group.push(row)
}
console.log(group)

group.forEach(row =>{
    row.forEach(tile=>{
        groupElement.append(tile.element)

        tile.element.addEventListener("click", () =>{
            var current_color='transparent'
            
            current_color=takeColor(current_color)

            if (tile.element.style.backgroundColor==current_color){
                tile.element.style.backgroundColor='transparent'
            }
            else{
                tile.element.style.backgroundColor=current_color
                console.log(current_color)
            /*var newcontent
            if (turn%2==0){
                newcontent=document.createTextNode('X')
            }
            else{
                newcontent=document.createTextNode('O')
            }
            if ((tile.element.textContent!=='X'||tile.element.textContent!=='O')){
                tile.element.appendChild(newcontent)
                console.log(tile.element.style.backgroundColor)
            }*/
        }
        
        })
    })
})

console.log(current_color)


