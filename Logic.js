var num_lock = false
var sin_lock = true
var point_lock = true
var current_display = ""
var current_place = 0
var cache = ""
var current_equa = ""
const dictSin = {
  "+": "+",
  "÷": "/",
  "x": "*",
  "-": "-",
} 

function clear(get){
  num_lock = false
  sin_lock = true
  point_lock = true
  current_display = ""
  current_place = 0
}

function add_number (e){

if (!num_lock){
  current_display += e
  current_equa += e
  sin_lock = false
  point_lock = true
}
}


function add_sin (e) {

  if (!sin_lock){
    current_display +=  ` ${e} `
    current_equa += dictSin[e]
    sin_lock = true
    point_lock = true
    num_lock = false}
}


function add_point(e) {

  if (!point_lock){
    current_number += e
    sin_lock = true
    current_display += "."
    point_lock = true
  }

}

function result(get){
  if (current_place==0 && !sin_lock && cache != "."){
    current_equa = eval(current_equa)
    current_display = current_equa
  }
}


function add_place(get){
  if (sin_lock){
    current_display += "("
    current_place += 1
    current_equa += "("
  }
}

function remove_place(get){
  if (current_place > 0 && !sin_lock && cache != "."){
      current_place -= 1
      num_lock = true
      current_display += ")"
      current_equa += ")"
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
  cache = get
}

