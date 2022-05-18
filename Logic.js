var current_number = ""
var num_lock = false
var sin_lock = true
var current_display = ""
var number_itens = [[]]
var sin_itens = [[]]
var current_place = 0
var order_sin = ["÷", "x","-", "+"]

function clear(get){
  current_number = ""
  num_lock = false
  sin_lock = true
  current_display = ""
  number_itens = [[]]
  sin_itens = [[]]
  current_place = 0
}
function return_value(get, a, b){
  dict_resul = {
    "+": a + b,
    "÷": a / b,
    "x": a * b,
    "-": a - b,
  }
  return dict_resul[get]
}


function add_number (e){

if (!num_lock){

  current_number += e
  current_display += e
  sin_lock = false
}
}


function add_sin (e) {

  if (!sin_lock){
    
    if (current_number != '')
    {
  number_itens[current_place].push(parseFloat(current_number))
  current_number = ""
}

  sin_itens[current_place].push(e)
  current_display +=  ` ${e} `
  sin_lock = true
  num_lock = false
}
}

function add_point(e) {

  if (current_number != ""){
    current_number += e
    current_number += e
    sin_lock = true
    current_display += "."
  }

}

function result(get){
  if (!sin_lock && current_number.slice(-1) != "."){
    number_itens[current_place].push(parseFloat(current_number))
    current_number = ""
    for (const y in order_sin){
      removes = 0
      cur_sin_list = [...sin_itens[current_place]]
    
    for (const x in cur_sin_list){
      if (order_sin[y] == cur_sin_list[x]){
        cur_num_list = number_itens[current_place]
        let i = parseInt(x) - removes
        let val = return_value(order_sin[y], cur_num_list[i], cur_num_list[i+1])
        cur_num_list[i] = val
        cur_num_list.splice(i + 1, 1)
        sin_itens[current_place].splice(x, 1)
        removes += 1
      }
    }}
  
 
  if (get == "finish" && current_place == 0){
    current_display = number_itens[0][0]
    sin_itens[0] = []
    sin_lock = false
    num_lock = true
    return current_display

  }}
}

function add_place(get){
  if (sin_lock && current_number.slice(-1) != "."){
    current_display += "("
    current_place += 1
    number_itens.push([])
    sin_itens.push([])
  }
}

function remove_place(get){
  if (current_place > 0 && !sin_lock){
      result()
      memory = number_itens.splice(current_place, 1)
      current_place -= 1
      console.log(memory[0][0])
      number_itens[current_place].push(memory[0][0])
      num_lock = true
      current_display += ")"
      console.log(number_itens)
    }

}

const CharComand = {

  "0": add_number,
  "1": add_number,
  "2": add_number,
  "3": add_number,
  "4": add_number,
  "5": add_number,
  "6": add_number,
  "7": add_number,
  "8": add_number,
  "9": add_number,
  "+": add_sin,
  "÷": add_sin,
  "x": add_sin,
  "-": add_sin,
  ".": add_point,
  "finish": result,
  "(": add_place,
  ")": remove_place,
  "clear": clear,
  
}

function calculadora(get){
  CharComand[get](get)
  document.getElementById("display").value = current_display
}

