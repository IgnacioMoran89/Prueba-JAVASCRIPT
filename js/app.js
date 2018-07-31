var calculadora = {

  visor: document.getElementById("display"),
  valorVisor: "0",
  operacion: "",
  primerValor: 0,
  segundoValor: 0,
  ultimoValor: 0,
  resultado: 0,
  TeclaIgual: false,



  init: (function(){
    this.asignarEventosBotones(".tecla");
    this.asignarEventosFuncion();
  }),

  //Eventos para los tamaños de los botones

  asignarEventosBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoDisminuyeBoton;
			x[i].onmouseleave = this.eventoRetornaBoton;
		};
	},

	eventoDisminuyeBoton: function(event){
		calculadora.DisminuyeBoton(event.target);
	},

	eventoRetornaBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},

  //Tamaño de botones

  DisminuyeBoton: function(elemento){
    var x = elemento.id;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
      elemento.style.width = "28%";
      elemento.style.height = "58px";
    } else if(x=="mas") {
      elemento.style.width = "83%";
      elemento.style.height = "93%";
    } else {
    elemento.style.width = "23%";
    elemento.style.height = "58px";
    }
  },

  AumentaBoton: function(elemento){
    var x = elemento.id;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
      elemento.style.width = "30%";
      elemento.style.height = "60px";
    } else if(x=="mas") {
      elemento.style.width = "85%";
      elemento.style.height = "95%";
    } else {
    elemento.style.width = "25%";
    elemento.style.height = "60px";
    }
  },

  asignarEventosFuncion: function(){
    document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
    document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
    document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
    document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
    document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
    document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
    document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
    document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
    document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
    document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
    document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
    document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
    document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
    document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
    document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
    document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
    document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
    document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
  },

  ingresoNumero: function(valor){
    if (this.valorVisor.length < 8) { /* si al ingresar un número hay menos de 8 cifras, sigue adelante y se marca el numero */

      if (this.valorVisor=="0") { /*si variable valor visor (this.valorVisor) es igual a cero (devuelve "true"), entonces : */
        this.valorVisor = ""; /* borra el texto que tiene,  */
        this.valorVisor = this.valorVisor + valor; /* y agrega asi mismo el nuevo valor asignado, en este caso es cero*/
      } else {
        this.valorVisor = this.valorVisor + valor;
      }
    this.updateVisor();
    }
  },


  borrarVisor: function(){

    this.valorVisor = "0";
    this.operacion = "";
    this.primerValor = 0;
    this.segundoValor = 0;
    this.resultado = 0;
    this.TeclaIgual = false;
    this.ultimoValor = 0;
    this.updateVisor();
  },

/* lo que esta haciendo es decir a la variable ingresoDecimal asigna una función anónima que dentro contiene es una validación que dice en caso de encontrar un "punto" como valor en la variable valorVisor usando el método indexOf entonces pregunta nuevamente si el valor de la variable valorVisor es igual a vacio entonces a esa misma variable le vas asignar el contenido que tiene seguido de un valor 0 añadiendo un punto al final ,en caso contrario hace la misma asignación pero en esta remueve el dato de 0. y solo va asignar el valor que tiene la variable mas el "."  al final */
  ingresoDecimal: function(){
		if (this.valorVisor.indexOf(".")== -1) {
			if (this.valorVisor == ""){
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.updateVisor();
		}
	},

/* lo que indican esas lineas es a dentro de la funcion cambiarSigno se comprueba que en caso de que la variable valorVisor tenga un valor diferente de 0, entonces se declara una variable auxiliar que mas adelante se le asignara un valor luego se comprueba que si en la primera posición de datos que tiene la variable this.valorVisor es igual a un guión entonces a al variable auxiliar se le asigna como valor así mismo la variable this.valorVisor pero se remueve una posición que seria la del signo guion en caso contrario a la variable auxiliar se le asigna como valor el signo guion delante de los datos que tiene la variable this.valorVisor para que quede algo como -34 luego se vacia los datos de la variable valorVisor y se le asigna el valor que tiene la variable auxiliar por ultimo se llama la funcion de updateVisor*/
  cambiarSigno: function(){
    if (this.valorVisor !="0") { /*si variable valorVisor (this.valorVisor) es distinto de cero (devuelve "true"), entonces : */
      var aux;
      if (this.valorVisor.charAt(0)=="-") { /* */
        aux = this.valorVisor.slice(1);
      }	else {
        aux = "-" + this.valorVisor;
      }
    this.valorVisor = "";
    this.valorVisor = aux;
    this.updateVisor();
    }
  },

/* esta parte this.primerValor parseFloat(this.valorVisor);
el objeto primer valor es un string es decir una cadena es texto es asignado a parseFloat(this.valorVisor);parteFloat se utiliza para convertir un string en numerico entonces el objeto this.valorVisor es numerico pero en esta linea this.valorVisor = ""; se indica que esta vacio en esta linea this.operacion = oper; sigue siendo un string porque los simbolos de las operaciones matematicas son string*/
  ingresoOperacion: function(oper){
    this.primerValor = parseFloat(this.valorVisor);
    this.valorVisor = "";
    this.operacion = oper;
    this.TeclaIgual = false;
    this.updateVisor();
  },

  verResultado: function(){

    if(!this.TeclaIgual){
      this.segundoValor = parseFloat(this.valorVisor);
      this.ultimoValor = this.segundoValor;
      this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);

    } else {
      this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
    }

    this.primerValor = this.resultado;
    this.valorVisor = "";


    if (this.resultado.toString().length < 9){
      this.valorVisor = this.resultado.toString();
    } else {
      this.valorVisor = this.resultado.toString().slice(0,8) + "...";
    }

    this.TeclaIgual = true;
    this.updateVisor();

  },

  realizarOperacion: function(primerValor, segundoValor, operacion){
    switch(operacion){
      case "+":
        this.resultado = eval(primerValor + segundoValor);
      break;
      case "-":
        this.resultado = eval(primerValor - segundoValor);
      break;
      case "*":
        this.resultado = eval(primerValor * segundoValor);
      break;
      case "/":
        this.resultado = eval(primerValor / segundoValor);
      break;

    }
  },

/* a una variable llamada updateVisor se esta asignando una función anónima (una funcion anonima es aquella que se le asigna a una variable), que dentro contiene que cuando se llame a esa función a la variable this.visor con el método de innerHTML que sirve para asignar visualizar datos en pantalla de html le va asignar como valor lo que tenga la variable this.valorVisor, entonces para llamar a esa funcion usarias
this.updateVisor();*/
  updateVisor: function(){
    this.visor.innerHTML = this.valorVisor;
  }

};

calculadora.init();
