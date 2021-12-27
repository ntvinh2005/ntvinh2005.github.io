const deleteAtIndex = (string, i, num) => {
    let arr = string.split('');
    arr.splice(i, num);
    return arr.join('');
};


function checkForHeading(input){
    header=input[0]
    output=input
    if (input[1]==input[0]) {
        header+=input[1]
        if (input[2]==input[1]) {
        header+=input[2]
        }
        if (input[2]==='#'){
            if (input[3]===input[2]) {
                header+=input[3]
                if (input[4]===input[3]){
                    header+=input[4]
                    if (input[5]==input[4]){
                        header+=input[5]
                    }
                }
            }
        }
    }
    
    switch (header) {
        case '#':
            output=deleteAtIndex(output, 0, 1)
            return ('<h1>'+output+'</h1>')
        case '##':
            output=deleteAtIndex(output, 0, 2)
            return ('<h2>'+output+'</h2>')
        case '###':
            output=deleteAtIndex(output, 0, 3)
            return ('<h3>'+output+'</h3>')
        case '####':
            output=deleteAtIndex(output, 0, 4)
            return ('<h4>'+output+'</h4>')
        case '#####':
            output=deleteAtIndex(output, 0, 5)
            return ('<h5>'+output+'</h5>')
        case '######':
            output=deleteAtIndex(output, 0, 6)
            return ('<h6>'+output+'</h6>')
        case '>':
            output=deleteAtIndex(output, 0, 1)
            return ('<blockquote>'+output+'</blockquote>')
        case '*':
            output=deleteAtIndex(output, 0, 1)
            return ('<li>'+output+'</li>')
        default:
            return('<p>'+output+'</p>')
    }
}

function replaceByIndex(string, index, alternative, delete_length) {
    string = deleteAtIndex(string, index, delete_length)
    string = string.slice(0, index) + alternative + string.slice(index)
    return string
}

// search for link and image
function searchForLinkAndImg(input){
    letters=input
    let link_start=0
    let link_name=''
    let link_url=''
    let old_link_length = 0
    var i=0

    while (i<letters.length){
        if (letters[i]==='!' && letters[i+1]==='[') {
            link_start = i
            i+=2
            while (letters[i]!==']'&&i<letters.length){
                link_name+=letters[i]
                if (letters[i]==='[') {
                    link_start = i
                    link_name = ''
                }
                i+=1
            }
            if (letters[i+1]==='(') {
                i+=2
                
                while (letters[i]!==')' && i<letters.length) {
                    link_url+=letters[i]
                    i+=1
                }
            }
            old_link_length = link_name.length+link_url.length+5
            new_link = '<img src=\''+ link_url+ '\'>'+ link_name +'</img>'
        }
        else if (letters[i]==='[') {
            link_start = i
            i+=1
            while (letters[i]!==']' && i<letters.length){
                link_name+=letters[i]
                if (letters[i]==='[') {
                    link_start = i
                    link_name = ''
                }
                i+=1
            }
            
            if (letters[i+1]==='(') {
                i+=2
                
                while (letters[i]!==')' && i<letters.length) {
                    link_url+=letters[i]
                    i+=1
                }
            }
            old_link_length = link_name.length+link_url.length+4
            new_link = '<a href=\''+ link_url+ '\'>'+ link_name +'</a>'
        }
        else if (letters[i]==='<' ) {
            link_start = i
            syntax_length = 2
            i+=1

            while (letters[i]!=='>' && i<letters.length) {
                link_name+=letters[i]
                link_url+=letters[i]
                i+=1
            }
            old_link_length = link_name.length+2
            new_link = '<a href=\''+ link_url+ '\'>'+ link_name +'</a>'
        }
        else i+=1
        if (link_url!=='' && link_name!=='') {
            delete_length = old_link_length
            i=i+new_link.length-delete_length
            letters = replaceByIndex(letters, link_start, new_link, delete_length)
            console.log(link_name, link_url, link_start, new_link.length, delete_length)
            link_name=''
            link_url=''
        }
    }
    return letters
}

//this function is used for searchForStar function
function replace_Start_And_End(string, start_position, end_position, key) {
    switch (key) {
        case '*':
            string=replaceByIndex(string, start_position, '<b>', 1)
            string=replaceByIndex(string, end_position+2, '</b>', 1)
            break;
        case '**':
            string=replaceByIndex(string, start_position, '<i>', 2)
            string=replaceByIndex(string, end_position+1, '</i>', 2)
            break;
        case '***':
            string=replaceByIndex(string, start_position, '<b><i>', 3)
            string=replaceByIndex(string, end_position+3, '</i></b>', 3)
            break;
        case '_':
            string=replaceByIndex(string, start_position, '<b>', 1)
            string=replaceByIndex(string, end_position+2, '</b>', 1)
            break;
        case '__':
            string=replaceByIndex(string, start_position, '<i>', 2)
            string=replaceByIndex(string, end_position+1, '</i>', 2)
            break;
        case '___':
            string=replaceByIndex(string, start_position, '<b><i>', 3)
            string=replaceByIndex(string, end_position+3, '</i></b>', 3)
            break;
        case '~~':
            string=replaceByIndex(string, start_position, '<strike>', 2)
            string=replaceByIndex(string, end_position+6, '</strike>',2)
        default:
            break;
    }
    
    return string
}

function searchForRuler(input){
    if (input==='***'||input==='---'||input==='___'){
        return ('<hr/>')
    }
    else return input
}

function searchForStar(input){
    letters=input
    star_start=0
    start_position=0
    star_end=0
    var i=0
    while(i<letters.length) {

        //bold and italic using ***  ***
        if (letters[i]==='*') {
            if (star_start==0)  {
                star_start+=1;
                start_position=i
            } else star_end+=1

            if (star_start==1 && star_end==1) {
                letters=replace_Start_And_End(letters, start_position, i, '*') 
                console.log(letters)
                star_start=0
                start_position=0
                star_end=0
                i+=1
                continue
            }
            i+=1
            if (letters[i]==='*') {
                if (star_start==1 && star_end==0) { 
                    star_start+=1 
                } else star_end+=1

                if (star_start==2 && star_end==2) {
                    letters=replace_Start_And_End(letters, start_position, i-1, '**') 
                    console.log(letters)
                    star_start=0
                    start_position=0
                    star_end=0
                    i+=1
                    continue
                }
                i+=1
                if (letters[i]==='*'){
                    if (star_start==2 && star_end==0) { 
                        star_start+=1 
                    } else star_end+=1
    
                    if (star_start==3 && star_end==3) {
                        letters=replace_Start_And_End(letters, start_position, i-2, '***') 
                        console.log(letters)
                        star_start=0
                        start_position=0
                        star_end=0
                        i+=1
                        continue
                    }
                    i+=1
                }
            }
        }

        // bold and italic using ___ ___
        if (letters[i]==='_') {
            if (star_start==0)  {
                star_start+=1;
                start_position=i
            } else star_end+=1

            if (star_start==1 && star_end==1) {
                letters=replace_Start_And_End(letters, start_position, i, '_') 
                console.log(letters)
                star_start=0
                start_position=0
                star_end=0
                i+=1
                continue
            }
            i+=1
            if (letters[i]==='_') {
                if (star_start==1 && star_end==0) { 
                    star_start+=1 
                } else star_end+=1

                if (star_start==2 && star_end==2) {
                    letters=replace_Start_And_End(letters, start_position, i-1, '__') 
                    console.log(letters)
                    star_start=0
                    start_position=0
                    star_end=0
                    i+=1
                    continue
                }
                i+=1
                if (letters[i]==='_'){
                    if (star_start==2 && star_end==0) { 
                        star_start+=1 
                    } else star_end+=1
    
                    if (star_start==3 && star_end==3) {
                        letters=replace_Start_And_End(letters, start_position, i-2, '___') 
                        console.log(letters)
                        star_start=0
                        start_position=0
                        star_end=0
                        i+=1
                        continue
                    }
                    i+=1
                }
            }
        }
        else i+=1
    };
    return letters
}

function searchForStrikeThrough(letters){
    let i=0
    let start_position = 0
    let isStrikeThrough = false
    while (i<letters.length) {
        if (letters[i]==='~' && letters[i+1]==='~' && !isStrikeThrough) {
            start_position = i
            i+=2
            isStrikeThrough = true
        } else if (letters[i]==='~' && letters[i+1]==='~' && isStrikeThrough) {
            letters = replace_Start_And_End(letters, start_position, i, '~~')
            i+=15
            console.log('yeah')
            isStrikeThrough = false
        } else {
            i+=1
            console.log('normal')
            console.log(i+ letters[i]==='~' && letters[i+1]==='~' && isStrikeThrough)}
    }
    return letters
}


function searchForCodeSetence(letters){
    letters = deleteAtIndex(letters, 0, 1)
    letters = deleteAtIndex(letters, 0, 1)
    letters = deleteAtIndex(letters, 0, 1)
    var code_node = document.createElement('div')
    var code_node_text = document.createTextNode('<code>'+letters+'</code> <br>')
    code_node.appendChild(code_node_text)
    document.querySelector('#output').appendChild(code_node)
}

function searchInParagraph(input){
    input = searchForLinkAndImg(input)
    input = searchForRuler(input)
    input = searchForStar(input)
    input = searchForStrikeThrough(input)
    input = checkForHeading(input)
    
    return input
}


function count_for_cells(row){
    let i=0
    var cells_number=-1
    while (i<row.length){
        if (row[i]==='|') {
            cells_number+=1
        }
        i+=1
    }
    return (cells_number)
}

function searchForRows(lines, index) {
    var rows = []
    let i = index
    console.log(index)
    while (i<lines.length && count_for_cells(lines[i])>=1) {
        
        rows.push(lines[i])
        i+=1
    };
    return  rows
}

function searchForCells(lines, index){
    rows = searchForRows(lines, index)
    var all_cells = []
    rows.forEach(row => {
        let i =0
        cells_in_row = []
        current_cell = ''
        cells_number = count_for_cells(row)
        while (i<row.length) {
            
            if (row[i]==='|' && current_cell!=='' ) {
                if (!checkIsSettingTable(current_cell)) cells_in_row.push(current_cell)
                current_cell=''
            } 
            else if(row[i]!=='|') current_cell+=row[i]
            i+=1
        }
        all_cells.push(cells_in_row)
    });
    console.log(all_cells)
    arrange_cells(all_cells)
    return (all_cells)
}

function checkIsSettingTable(cell){
    let i=0
    
    while (i<cell.length) {
        if (cell[i]!=='-' && cell[i]!==':') return false
        i+=1
    }
    return true
}

function arrange_cells(all_cells){
    var table_node = document.createElement('div')
    var table_node_text = document.createTextNode('<table>')
    table_node.appendChild(table_node_text)
    document.querySelector('#output').appendChild(table_node)
    console.log(all_cells)

    all_cells.forEach(cells_in_row => {
        console.log(cells_in_row)
        if (cells_in_row.length!==0) {
            var row_node = document.createElement('div')
            var row_node_text = document.createTextNode('<tr>')
            isTitle = lookForIndex(all_cells, cells_in_row)===0
            row_node.appendChild(row_node_text)
            document.querySelector('#output').appendChild(row_node)

            cells_in_row.forEach(cell => {
                var cell_node = document.createElement('div')
                var cell_node_text = document.createTextNode('<td>'+cell+'</td>')
                if (isTitle) cell_node_text = document.createTextNode('<th>'+cell+'</th>')
                cell_node.appendChild(cell_node_text)
                document.querySelector('#output').appendChild(cell_node)
            });

            var end_row_node = document.createElement('div')
            var end_row_node_text = document.createTextNode('</tr>')
            end_row_node.appendChild(end_row_node_text)
            document.querySelector('#output').appendChild(end_row_node) 
        }

    });

    var end_table_node = document.createElement('div')
    var end_table_node_text = document.createTextNode('</table>')
    end_table_node.appendChild(end_table_node_text)
    document.querySelector('#output').appendChild(end_table_node)
}

function test(){
    input = document.querySelector('#input').value
    document.querySelector('#output').innerHTML = ''
    console.log(input)
    var lines = input.split(/\n/);
    rows=[]
    
    new_para = []
    lines.forEach(line => {
        if ((line[0]==='\'' && line[1] ==='\'' && line[2] ==='\'')||(line[0]==='~' && line[1] ==='~' && line[2] ==='~')) {
            searchForCodeSetence(line)
        } else {
            line=searchInParagraph(line)
            new_para.push(line)
        }
    });

    let i=0
    new_para.forEach(line => {
        var isNewTable = true
        let previousLine = ''
        if (lookForIndex(new_para, line)-1>=0) previousLine = new_para[lookForIndex(new_para, line)-1]
        if (previousLine[0]==='|') {
            isNewTable = false
            previousLine = ''
        } 

        if (count_for_cells(line)<1){
            console.log(line[line.length-1])
            
            var node = document.createTextNode(line)
            var down = document.createElement('br')
            document.querySelector('#output').appendChild(node)
            document.querySelector('#output').appendChild(down)
        }
        else if (isNewTable === true && count_for_cells(line)>0) {
            searchForCells(new_para, current_index = lookForIndex(new_para, line))
        }
        i+=1
    });
    
    
}

console.log('Connected!')

function lookForIndex(array, item) {
    let i = 0
    while (i<array.length) {
        if (array[i]===item) return i
        i+=1
    }
    return i
}

