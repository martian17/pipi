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

var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 200;
var ctx = canvas.getContext("2d");


var entropyPi = function(data){
    var sum = 0;
    var n = 0;
    for(var i = 0; i < data.length; i++){
        n += data[i];
        sum += i*data[i];
    }
    var avg = sum/n;
    
    var sdsum = 0;
    for(var i = 0; i < data.length; i++){
        sdsum += data[i]*((i-avg)**2);
    }
    var sd = Math.sqrt(sdsum/n);
    
    var entropy = 0;
    for(var i = 0; i < data.length; i++){
        var p = (data[i]/n);
        if(p !== 0)entropy -= p*Math.log(p);
    }
    
    //document.getElementById("sd").innerHTML = "standard deviation: "+sd;
    //document.getElementById("et").innerHTML = "entropy: "+entropy;
    
    
    return (Math.E**(2*entropy))/(2*Math.E*sd*sd);
};

var main = async function(n){
    document.getElementById("digits").value = n;
    await calculator.startCalculation(n);
    var tally = [];
    for(var i = 0; i < 100; i++){
        tally[i] = 0;
    }
    var pi = document.getElementById("display").innerHTML.split(".").join("").split("").map(a=>parseInt(a));
    console.log(pi);
    for(var ii = 1; ii < pi.length/10; ii++){
        for(var i = 0; i < pi.length-ii*10; i++){
            var sum = 0;
            for(var j = 0; j < 10; j++){
                sum += pi[i+j*ii];
            }
            tally[sum]++;
        }
    }
    console.log(tally);
    var maxval = 0;
    for(var i = 0; i < 100; i++){
        if(tally[i] > maxval)maxval = tally[i];
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(maxval < canvas.height){
        for(var i = 0; i < 100; i++){
            ctx.fillRect(i*5,canvas.height-tally[i],5,tally[i]);
        }
    }else{
        for(var i = 0; i < 100; i++){
            var th = tally[i]/maxval*canvas.height;
            ctx.fillRect(i*5,canvas.height-th,5,th);
        }
    }
    var pi = entropyPi(tally);
    document.getElementById("display2").innerHTML = "π = "+pi;
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

