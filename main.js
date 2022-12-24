const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
ctx.fillStyle = "#000000";
ctx.fillRect(0,0, width, height); 

// audio 
var context = new AudioContext();
var src = context.createMediaElementSource(audio);
var analyser= context.createAnalyser();
src.connect(analyser);
analyser.connect(context.destination);
analyser.fftSize = 1024; 
var bufferLenght = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLenght); 


// meter
var gradient;
gradient = ctx.createLinearGradient(0,0,0, height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5,'yellow');
gradient.addColorStop(1,'green');
ctx.fillStyle = gradient;

function updateVuMeter(volume){
   // clear Canvas 
   ctx.clearRect(0,0, width, height);
   ctx.fillRect(0, height- volume * height, width, volume * height);
   ctx.strokeRect(0,0, width, height); 
}

// test 
setInterval(()=>{
    analyser.getByteFrequencyData(dataArray);
    const volume = dataArray.reduce((a , b)=> a + b ) / dataArray.length / 128; // get the value of vol 
    updateVuMeter(volume);
},50)

