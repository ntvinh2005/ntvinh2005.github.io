

function plus(element, second_num){
    let element_num=Number(element.textContent)+second_num
    element.textContent=String(element_num)
    return Number(element_num)
}

function changeColor_on_turn(turn){
    const X_label=document.querySelector('#label-team-X')
    const O_label=document.querySelector('#label-team-O')

    if (turn%2==1){
        X_label.style.color='blue'
        O_label.style.color='black'
    }
    else{
        O_label.style.color='blue'
        X_label.style.color='black'
    }

}

function bet_refresh(){
    const bet_place1=document.querySelector('#bet-element-O')
    const bet_place2=document.querySelector('#bet-element-X')
    const bet_place1_AI=document.querySelector('#bet-element-O-AI')
    const bet_place2_AI=document.querySelector('#bet-element-X-AI')
    bet_place1.textContent='0'
    bet_place2.textContent='0'
    bet_place1_AI.textContent='0'
    bet_place2_AI.textContent='0'
    bet_place1.style.backgroundColor='white'
    bet_place2.style.backgroundColor='white'
    bet_place1_AI.style.backgroundColor='white'
    bet_place2_AI.style.backgroundColor='white'
}

function plus_bet(element){
    bet_place1= document.querySelector('#bet-element-O')
    bet_place2= document.querySelector('#bet-element-X') 
    if (element.style.backgroundColor=='yellow'||(bet_place1.style.backgroundColor==='white' && bet_place2.style.backgroundColor==='white') ){
        element.style.backgroundColor='yellow'
        plus(element, 1)
        plus(document.querySelector('#Hu-money'),-1)
    }
}

function plus_bet_AI(element, bet_amount){
    element.style.backgroundColor='red'
    plus(element, bet_amount)
    plus(document.querySelector('#AI-money'),-bet_amount)
}

function AI_bet(){
    const AI_bet_place1=document.querySelector('#bet-element-O-AI')
    const AI_bet_place2=document.querySelector('#bet-element-X-AI')
    const AI_bet_places=[AI_bet_place1, AI_bet_place2]
    const chosen_place=AI_bet_places[Math.floor(Math.random()*2)]
    let AI_money=document.querySelector('#AI-money')
    let AI_bet_amount=Math.floor(Math.random()*Math.floor(Number(AI_money.textContent)/2)+1)
    plus_bet_AI(chosen_place, AI_bet_amount)
}

function AI_win(turn){
    const AI_bet_place1=document.querySelector('#bet-element-X-AI')
    const AI_bet_place2=document.querySelector('#bet-element-O-AI')
    const AI_money=document.querySelector('#AI-money')
    const AI_bet_amount=Number(AI_bet_place1.textContent)+Number(AI_bet_place2.textContent)
    if ((AI_bet_place1.style.backgroundColor=='red' && turn%2==0)||(AI_bet_place2.style.backgroundColor=='red' && turn%2==1)){
        plus(AI_money,AI_bet_amount*2)
    }
    plus(AI_money, 1)
    console.log((AI_bet_place1.style.backgroundColor=='red' && turn%2==0) || (AI_bet_place2.style.backgroundColor='red' && turn%2==1))
    console.log(AI_bet_place1.style.backgroundColor+'1', turn%2)
    console.log(AI_bet_place2.style.backgroundColor+'2', turn%2)
}


bet_place1= document.querySelector('#bet-element-O')
bet_place2= document.querySelector('#bet-element-X') 
bet_place1.style.backgroundColor='white'
bet_place2.style.backgroundColor='white'

const size=20
const group=[]
const groupElement=document.querySelector('.group')


for(let y=1; y<=size;y++){
    const row=[]
    for(let x=1;x<=size;x++){
        const element=document.createElement('button')
        const treasure=Math.floor(Math.random()*10)
        const tile={
            element,
            x,
            y,
            treasure
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
            if (tile.element.style.backgroundColor!='red'){
                const turn_element=document.querySelector('.turn')
                var turn=plus(turn_element, 1)
                
                changeColor_on_turn(turn)

                if (tile.element.style.backgroundColor=='yellow'){
                    tile.element.style.backgroundColor='transparent'
                    tile.element.firstChild.remove()
                    turn=plus(turn_element, -2)
                }
                else{
                tile.element.style.backgroundColor="yellow"
                var newcontent
                if (turn%2==0){
                    newcontent=document.createTextNode('X')
                }
                else{
                    newcontent=document.createTextNode('O')
                }
                if ((tile.element.textContent!=='X'||tile.element.textContent!=='O')){
                    tile.element.appendChild(newcontent)
                    console.log(tile.element.style.backgroundColor)
                }
                if (tile.treasure===1){
                    tile.element.style.backgroundColor='red'
                    AI_win(turn)
                    if (turn%2==0){
                        plus(document.querySelector('#score-X'),1)
                        plus(document.querySelector('#Hu-money'), 1 + Number(document.querySelector('#bet-element-X').textContent)*2)
                    }
                    else{
                        plus(document.querySelector('#score-O'),1)
                        plus(document.querySelector('#Hu-money'), 1 + Number(document.querySelector('#bet-element-O').textContent)*2)
                    }
                    bet_refresh()
                    AI_bet()
                }
            }
        }
        })
    })
})

AI_bet()

