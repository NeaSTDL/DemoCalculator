(function(){
	var CalcApp = {
		State: "",
		Total: 0
	}

	$(document).ready(function(){
		$("#btn0").on("click", onNumberClick);
		$("#btn1").on("click", onNumberClick);
		$("#btn2").on("click", onNumberClick);
		$("#btn3").on("click", onNumberClick);
		$("#btn4").on("click", onNumberClick);
		$("#btn5").on("click", onNumberClick);
		$("#btn6").on("click", onNumberClick);
		$("#btn7").on("click", onNumberClick);
		$("#btn8").on("click", onNumberClick);
		$("#btn9").on("click", onNumberClick);

		$("#btnClear").on("click", onClearClick);
		$("#btnAnswer").on("click", onAnswerClick);

		$("#btnAddition").on("click", onOperatorClick);
		$("#btnSubstract").on("click", onOperatorClick);
		$("#btnProduct").on("click", onOperatorClick);
		$("#btnDivision").on("click", onOperatorClick);

		CalcApp.State = "INIT";
	});

	function onNumberClick(){
		switch(CalcApp.State){
			case "INIT":
				var value = $(".input").html();
				$(".input").html($(this).html());
				CalcApp.State = "FIRST_NUMBER";
				break;
			case "FIRST_NUMBER":
				var value = $(".input").html();
				$(".input").html(value + $(this).html());
				break;
			case "OPERATOR":
				var value = $(".input").html();
				$(".input").html(value + $(this).html());
				CalcApp.State = "SECOND_NUMBER";
				break;
			case "SECOND_NUMBER":
				var value = $(".input").html();
				$(".input").html(value + $(this).html());
				break;
		}
	}

	function onClearClick(){
		$(".input").html("0");
		$(".answer").html("______");
		CalcApp.State = "INIT";
	}

	function onAnswerClick(){
		switch(CalcApp.State){
			case "INIT":
				break;
			case "FIRST_NUMBER":
				$(".answer").html( "=" + $(".input").html() );
				break;
			case "SECOND_NUMBER":
				CalcApp.Total = calculateAnswer();
				$(".answer").html( "=" + CalcApp.Total );
				CalcApp.State = "RESULT";
				break;
		}
	}

	function onOperatorClick(){
		switch(CalcApp.State){
			case "INIT":
				break;
			case "FIRST_NUMBER":
				var value = $(".input").html();
				$(".input").html( value + $(this).html());
				CalcApp.State = "OPERATOR";
				break;
			case "RESULT":
				$(".input").html( CalcApp.Total + $(this).html());
				CalcApp.State = "OPERATOR";
				break;
		}
	}

	function calculateAnswer(){
		var Regex = /([0-9\.]+)([x\/\+\-])([0-9\.]+)/;
		var Values = Regex.exec($(".input").html());
		console.log(Values);
		switch(Values[2]){
			case "+":
				return (parseFloat(Values[1]) + parseFloat(Values[3])).toFixed(1);
			case "-":
				return (parseFloat(Values[1]) - parseFloat(Values[3])).toFixed(1);
			case "/":
				return (parseFloat(Values[1]) / parseFloat(Values[3])).toFixed(1);
			case "x":
				return (parseFloat(Values[1]) * parseFloat(Values[3])).toFixed(1);
		}
	}
})();