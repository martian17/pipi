//var calculator = new PiCalculatorAtanKikuo();
//var calculator = new PiCalculatorNilakantha2();
//var calculator = new PiCalculatorNilakantha3();
//var calculator = new PiCalculatorNilakantha();
//var calculator = new PiCalculatorLeibniz();
var calculator = new PiCalculatorAtanHwang();

var algorithms = {
    Leibniz:PiCalculatorLeibniz,
    Nilakantha:PiCalculatorNilakantha,
    Nilakantha2:PiCalculatorNilakantha2,
    Nilakantha3:PiCalculatorNilakantha3,
    AtanKikuo:PiCalculatorAtanKikuo,
    AtanStormer:PiCalculatorAtanStormer,
    AtanHwang:PiCalculatorAtanHwang
};

var main = function(n){
    document.getElementById("digits").value = n;
    calculator.startCalculation(n);
};

main(1000);


document.getElementById("go").addEventListener("click",function(){
    reloadAlgorithms();
});
document.getElementById("algorithms").addEventListener("input",function(){
    reloadAlgorithms();
});

var reloadAlgorithms = function(){
    calculator.terminate();
    calculator = new algorithms[document.getElementById("algorithms").value];
    main(parseInt(document.getElementById("digits").value));
};

