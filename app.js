let letras_con_acentos = "áéíóúÁÉÍÓÚ";
let letras_mayusculas = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
let letras_con_numeros = '0123456789';

function asignarTextoElemento(elemento, texto) {

    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function encrypt_data(string) {

    string = unescape(encodeURIComponent(string));
    var newString = '', char, nextChar, combinedCharCode;
    for (var i = 0; i < string.length; i += 2) {
        char = string.charCodeAt(i);
          if ((i + 1) < string.length) {
            nextChar = string.charCodeAt(i + 1) - 31;
            combinedCharCode = char + "" + nextChar.toLocaleString('en', {minimumIntegerDigits: 2 });
            newString += String.fromCharCode(parseInt(combinedCharCode, 10));
          }
          else {
            newString += string.charAt(i);
        }
    }
    return newString.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");
}

function decrypt_data(string) {

      var newString = '', char, codeStr, firstCharCode, lastCharCode;
      string = string.match(/.{1,4}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),"");
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char > 132) {
            codeStr = char.toString(10);
            firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);
            lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;
            newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
        }
        else {
            newString += string.charAt(i);
        }
    }
    return newString;
}

function encriptar(){

    let texto = document.getElementById("encriptar__texto").value;
    let mayusculas = tiene_mayusculas(texto);
    let acentos = tiene_acentos(texto);
    let numeros = tiene_numeros(texto);

    if(texto.length == 0){
        swal("Hey !", "Debes ingresar un texto", "warning");
    }
    else if((mayusculas == 1)&&(acentos == 1)){
        alert("El texto tiene mayúsculas y acentos");
        limpiarCaja();
    }
    else if(mayusculas == 1){
        alert("El texto tiene mayúsculas");
        limpiarCaja();
    }
    else if(acentos == 1){
        alert("El texto tiene acentos");
        limpiarCaja();
    }
    else if(numeros == 1){
        alert("El texto tiene números");
        limpiarCaja();
    }
    else{
        let textoencriptado = encrypt_data(texto);
        asignarTextoElemento('textarea',textoencriptado);
        limpiarCaja();
        swal("Bien  !", "Has Encriptado un texto", "success");
    }
    
}

function limpiarCaja() {
    document.querySelector('#encriptar__texto').value = '';
}

function copiartexto(){

    let texto = document.getElementById("desencriptar__texto").value;
    let cambio = document.getElementById("encriptar__texto");
    cambio.value = texto;
    
}

function desencriptar(){

    let texto = document.getElementById("encriptar__texto").value;

    if(texto.length == 0){
        swal("Hey !", "Primero hay que Encriptar", "warning");
        
    }
    else{
        let textoCifrado= decrypt_data(texto);
        asignarTextoElemento('textarea',textoCifrado);
        limpiarCaja();
        swal("Bien  !", "Has Desencriptado un texto", "success");
    }
    
}

function tiene_mayusculas(texto){
   for(let i=0; i<texto.length; i++){
      if (letras_mayusculas.indexOf(texto.charAt(i),0)!=-1){
         return 1;
      }
   }
   return 0;
}

function tiene_acentos(texto){
    for(let i=0; i<texto.length; i++){
       if (letras_con_acentos.indexOf(texto.charAt(i),0)!=-1){
          return 1;
       }
    }
    return 0;
 }

 function tiene_numeros(texto){
    for(let i=0; i<texto.length; i++){
       if (letras_con_numeros.indexOf(texto.charAt(i),0)!=-1){
          return 1;
       }
    }
    return 0;
 }