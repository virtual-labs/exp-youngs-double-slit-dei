
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
const c = canvas.width/2;
canvas.height = 250;
ctx.imageSmoothingEnabled = false;
let x = 0;
const peaks = 3;
let isPlaying = false;
ctx.fillRect(0, 0, 500, 250);
//function to generate source dots 
function source(n)
{
  const dotInterval = 10; // interval between dots in pixels
  const dotSize = 3; // size of each dot in pixels
  const speed = 0.5; // speed of each dot in pixels per frame
  const dotColor = "white"; // color of each dot
  const startX = 60;
  const endX = 203;

  let x = startX;
  let y = canvas.height * 0.5;
  let dots = [];

  while (x <= endX) {
    dots.push({ x, y });
    x += dotInterval;
  }

  function moveDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dots.length; i++) {
      let dot = dots[i];
      dot.x += speed;
      if (dot.x > endX) {
        dot.x = startX;
      }
      let dotLength = dotSize * (1 - (dot.x - startX) / (endX - startX + 1));
      ctx.fillStyle = dotColor;
      ctx.fillRect(dot.x, dot.y, dotLength, dotSize);
    }

    requestAnimationFrame(moveDots);
  }

  moveDots();

}
//end of function 

//function to add a guassian distribution 
function randomGaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Draw the slits
function drawSlits() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(20, 15, 20, 130);
  ctx.fillStyle = "black";
  ctx.fillRect(206, 180, 18, 3);
  ctx.fillRect(206, 240, 18, 3);
  const img = document.getElementById("image7");
}

//connection....
// Code 1
let mode = "first";
function animate() {
  let pattern;
  if (mode === "first") 
  {
    
    pattern = diffractionLeft();
    const text = document.getElementById("image2");
    
    text.innerHTML = `Single slit diffraction pattern observed when slit1 is (𝝍<sub>1</sub>) open and slit 2 is closed (𝝍<sub>2</sub>).<br> The function is |𝝍<sub>1</sub>|<sup>2</sup> `;
    text.style.textAlign = "center";
    const img = new Image();
    img.src = 'image1/Screenshot (346).png';
    img.onload = function() {
      ctx.drawImage(img, 412, 60, 90,150);
    };
    ctx.fillStyle = "lightgray"; // Set the fill color to a light gray
  }

   else if (mode === "second")
    {
      
      pattern = diffractionRight();
      const text = document.getElementById("image3");
      text.innerHTML = `Single slit diffraction pattern observed when slit1 is (𝝍<sub>1</sub>) closed and slit 2 is open (𝝍<sub>2</sub>).<br> The function is |𝝍<sub>2</sub>|<sup>2</sup> `
      text.style.textAlign = "center";
      text.style.textAlign = "center";
      const img = new Image();
      img.src = 'image1/Screenshot (346).png';
      img.onload = function() {
        ctx.drawImage(img, 412, 90, 90,150);
      };
      
      
      
    } 
    else if (mode === "third") 
    {
    
      pattern = animation();
      const text = document.getElementById("image");
    
      text.innerHTML = `<b>Copenhagen Interpreation using quantum particles:</b> This is the pattern observed with quantum partciles for both slits.<br> 𝝍 describes the probability density of finding a particle at a particular point in  space and time.  <br> Observed pattern : |𝝍<sub>𝟏</sub>+𝝍<sub>𝟐</sub>||𝝍<sub>𝟏</sub>+𝝍<sub>𝟐</sub>|<sup>*</sup>  = 𝝍<sub>1</sub><sup>2</sup> +𝝍<sub>1</sub><sup>*</sup> 𝝍<sub>2</sub> +𝝍<sub>2</sub> <sup>∗</sup> 𝝍<sub>1</sub> + 𝝍<sub>𝟐</sub><sup>2</sup>
      .This is the pattern observed when the partciles pass through both slit1 and slit2 . <br> where : 𝝍 is the function of space and time .`
      text.style.textAlign = "center";  
      const img = new Image();
      img.src = 'image1/Screenshot (347).png';
      img.onload = function() {
        ctx.drawImage(img, 412, 60, 90,150);
      };
    
    }
    if (isPlaying)
    {
      animationId = requestAnimationFrame(animate);
    }

}

function onModeChange() {
  const selectElement = document.getElementById("mode");
  mode = selectElement.value;
  
  
  
}

document.getElementById("mode").addEventListener("change", onModeChange);


//animation fucntion--> that generates the animation
function animation() {

  const linePosition = canvas.width * 0.8;
  let x1;
  x1 = canvas.height*0.90+(randomGaussian()/3)*canvas.height*0.10;
  for (let i = 0; i < 1; i++) {
      const y = Math.random() * 0.7*(canvas.height+0.31*canvas.height)/1.75+0.65*canvas.height;
      if (y < linePosition) {
     ctx.fillStyle = `rgb(50,50,50)`;
      ctx.fillRect( y, x1 + i, 1, 1);
      }
    
  }
  x1 = canvas.height*0.70+(randomGaussian()/3)*canvas.height*0.10;
  for (let i = 0; i < 1; i++) {
    const y = Math.random() * 0.7*(canvas.height+0.31*canvas.height)/1.75+0.65*canvas.height;
      if (y < linePosition) {
      ctx.fillStyle = `rgb(100,100,100)`;
      ctx.fillRect( y,x1 + i, 1, 1);
      }
    
  }
  x1 = canvas.height*0.48+(randomGaussian()/3)*canvas.height*0.15;
  for (let i = 0; i <1; i++) {
    const y = Math.random() * 0.7*(canvas.height+0.31*canvas.height)/1.75+0.65*canvas.height;
      if (y < linePosition) {
      ctx.fillStyle = `rgb(220,220,220)`;
      ctx.fillRect( y,x1 + i, 1, 1);
      }
  }
  x1 = canvas.height*0.23+(randomGaussian()/3)*canvas.height*0.10;
  for (let i = 0; i < 1; i++) {
    const y = Math.random() * 0.7*(canvas.height+0.31*canvas.height)/1.75+0.65*canvas.height;
      if (y < linePosition) {
      ctx.fillStyle = `rgb(100,100,100)`;
      ctx.fillRect( y,x1 + i, 1, 1);
      }
  }
  x1 = canvas.height*0.05+(randomGaussian()/3)*canvas.height*0.10;
  for (let i = 0; i < 1; i++) {
    const y = Math.random() * 0.7*(canvas.height+0.31*canvas.height)/1.75+0.65*canvas.height;
      if (y < linePosition) {
      ctx.fillStyle = `rgb(50,50,50)`;
      ctx.fillRect( y,x1 + i, 1, 1);
      }
  }
  
const slitWidth = 0.07; // Slit width in millimeters
const wavelength = 0.001; // Wavelength of light in millimeters
const distance = 5; // Distance from slit to screen in millimeters
const screenHeight = 0.5; // Height of screen in millimeters
const screenDistance = 8000; // Distance from slit to screen in millimeters
const curveLength = 500; // Length of curve to draw in pixels
const sigma = 100;
const xOffset = canvas.width / 1.65;


// Calculate intensity for each x-coordinate
const intensity = [];
for (let x = -curveLength; x <= canvas.width + curveLength; x += 0.33) {
  const r = Math.sqrt((xOffset - x) ** 2 + distance ** 2);
  let inten = Math.sin((Math.PI * slitWidth * r) / wavelength) ** 2;
  
  // Decrease intensity of higher peaks
  if (inten > 0.2) {
    inten *= 0.05;
  }
  
  // Slightly increase intensity of lower peaks
  if (inten < 0.05) {
    inten *= 0.029;
  }
  
  intensity.push(inten);
}


ctx.beginPath();

// Draw diffraction pattern with consistent spacing between troughs
for (let y = -screenHeight / 2; y <= screenHeight / 2; y += 0.001) {
  let x = 0;
  for (let i = 0; i < intensity.length; i++) {
    let beta = (Math.PI * slitWidth * y) / (wavelength * distance);
    let diffraction = (Math.sin(beta) / beta) ** 2;
    x += intensity[i] * diffraction;
  }
  let troughSpacing = wavelength * distance / slitWidth;
  ctx.lineTo(xOffset + x * canvas.width / (screenDistance * troughSpacing), y * canvas.height / screenHeight + canvas.height / 2);
}

ctx.strokeStyle = 'yellow';
ctx.lineWidth = 0.09;
ctx.stroke();


  
}
//close of animation function!!!!!!!!!!!!!!!!!!!
//single slit diffrcation pattern1 function
function diffractionLeft(){
  const linePosition = canvas.width * 0.8;
  let x1;
  x1 = canvas.height*0.36+(randomGaussian()/3)*canvas.height*0.02 ;
  
  // Hide the element with id "slit2"
  
  for (let i = 0; i < 1; i++) {
      t  = canvas.height+(0.36)*canvas.height
      const y = Math.random() * t/2.5 +0.65*canvas.height;
      if (y < linePosition) {
      ctx.fillStyle = `rgb(255,255,255)`;
      ctx.fillRect(y,x1 + i,1,1);
      }
      
  }
  ctx.fillStyle = "yellow";
  ctx.fillRect(90, 60, 10, 90);
  ctx.fillStyle = "black";
  ctx.fillRect(90, 90, 10, 2);



 
  const slitWidth = 0.07; // Slit width in millimeters
  const wavelength = 0.001; // Wavelength of light in millimeters
  const distance = 6; // Distance from slit to screen in millimeters
  const screenHeight = 0.5; // Height of screen in millimeters
  const screenDistance = 10000; // Distance from slit to screen in millimeters
  const curveLength = 500; // Length of curve to draw in pixels
  const sigma = 900;
  const xOffset = canvas.width / 1.66;
  const x = document.getElementsByClassName("textq");
  x.innerHTML = "";
  const p = document.getElementsByClassName("texton");
  x.innerHTML = "" ;


// Calculate intensity for each x-coordinate
const intensity = [];
for (let x = -curveLength; x <= canvas.width + curveLength; x += 0.35) {
  const r = Math.sqrt((xOffset - x) ** 2 + distance ** 2);
  let inten = Math.sin((Math.PI * slitWidth * r) / wavelength) ** 2;
  
  // Decrease intensity of higher peaks
  if (inten > 0.2) {
    inten *= 0.008;
  }
  
  // Slightly increase intensity of lower peaks
  if (inten < 0.05) {
    inten *= 0.029;
  }
  
  intensity.push(inten);
}


ctx.beginPath();

// Draw diffraction pattern with consistent spacing between troughs
for (let y = -screenHeight / 4; y <= screenHeight / 4; y += 0.001) {
  let x = 0;
  for (let i = 0; i < intensity.length; i++) {
    let beta = (Math.PI * slitWidth * y) / (wavelength * distance);
    let diffraction = (Math.sin(beta) / beta) ** 2;
    x += intensity[i] * diffraction;
  }
  let troughSpacing = wavelength * distance / slitWidth;
  ctx.lineTo(xOffset + x * canvas.width / (screenDistance * troughSpacing), y * canvas.height / screenHeight + canvas.height / 2.5);
}

ctx.strokeStyle = 'yellow';
ctx.lineWidth = 0.08;
ctx.stroke();

}//close of the diffraction pattern1 due to single slit



//single slit diffraction pattern2  fucntion
function diffractionRight(){
  const linePosition = canvas.width * 0.8;
  let x1;
  x1 = canvas.height*0.48+(randomGaussian()/3)*canvas.height*0.02;
  for (let i = 0; i < 1; i++) {
      t2 =canvas.height+0.34*canvas.height;
      const y = Math.random() * t2/2.5 + 0.65*canvas.height;
      if (y < linePosition) {
      ctx.fillStyle = `rgb(255,255,255)`;
      ctx.fillRect( y, x1 + i,1, 1);
      }
    
  }
  ctx.fillStyle = "yellow";
  ctx.fillRect(90, 60, 10, 90);
  ctx.fillStyle = "black";
  //ctx.fillRect(90, 90, 10, 2);
  ctx.fillRect(90, 120, 10, 2);
  
  const slitWidth = 0.07; // Slit width in millimeters
  const wavelength = 0.001; // Wavelength of light in millimeters
  const distance = 6; // Distance from slit to screen in millimeters
  const screenHeight = 0.5; // Height of screen in millimeters
  const screenDistance = 10000; // Distance from slit to screen in millimeters
  const curveLength = 500; // Length of curve to draw in pixels
  const sigma = 900;
  const xOffset = canvas.width / 1.66;


// Calculate intensity for each x-coordinate
const intensity = [];
for (let x = -curveLength; x <= canvas.width + curveLength; x += 0.35) {
  const r = Math.sqrt((xOffset - x) ** 2 + distance ** 2);
  let inten = Math.sin((Math.PI * slitWidth * r) / wavelength) ** 2;
  
  // Decrease intensity of higher peaks
  if (inten > 0.2) {
    inten *= 0.008;
  }
  
  // Slightly increase intensity of lower peaks
  if (inten < 0.05) {
    inten *= 0.029;
  }
  
  intensity.push(inten);
}


ctx.beginPath();

// Draw diffraction pattern with consistent spacing between troughs
for (let y = -screenHeight / 4; y <= screenHeight / 4; y += 0.001) {
  let x = 0;
  for (let i = 0; i < intensity.length; i++) {
    let beta = (Math.PI * slitWidth * y) / (wavelength * distance);
    let diffraction = (Math.sin(beta) / beta) ** 2;
    x += intensity[i] * diffraction;
  }
  let troughSpacing = wavelength * distance / slitWidth;
  ctx.lineTo(xOffset + x * canvas.width / (screenDistance * troughSpacing), y * canvas.height / screenHeight + canvas.height / 1.9);
}

ctx.strokeStyle = 'yellow';
ctx.lineWidth = 0.08;
ctx.stroke();

}//close of the diffraction pattern2 due to single slit
//here canvas.height*0.5 generates an off-set for y so that the pattern shift to lower part of the canvas
//fucntion animation for the expected pattern
function animation1(){
  
  const linePosition = canvas.width * 0.8;
  let x1;
  x1 = canvas.height*0.37+(randomGaussian()/3)*canvas.height*0.02 ;
  for (let i = 0; i < 1; i++) {
      const y = Math.random() * canvas.width+0.30*canvas.width;
      if (y < linePosition) {
      ctx.fillStyle = `rgb(255,255,255)`;
      ctx.fillRect(y,x1 + i,1,1);
      }
    
  }
  x1 = canvas.height*0.55+(randomGaussian()/3)*canvas.height*0.02;
  for (let i = 0; i < 1; i++) {
      const y = Math.random() * canvas.width+0.30*canvas.width;
      
      if (y < linePosition) {
      ctx.fillStyle = `rgb(255,255,255)`;
      ctx.fillRect( y, x1 + i,1, 1);
      }
  }

  
  
const slitWidth = 0.09; // Slit width in millimeters
const wavelength = 0.0009; // Wavelength of light in millimeters
const distance = 7; // Distance from slit to screen in millimeters
const screenHeight = 0.5; // Height of screen in millimeters
const screenDistance = 10000; // Distance from slit to screen in millimeters
const curveLength = 600; // Length of curve to draw in pixels
const sigma = 900;
const xOffset = canvas.width / 1.25;

// Calculate intensity for each x-coordinate
const intensity = [];
for (let x = -curveLength; x <= canvas.width + curveLength; x += 4) {
  const r = Math.sqrt((xOffset - x) ** 2 + distance ** 2);
  let inten = Math.sin((Math.PI * slitWidth * r) / wavelength) ** 2;

  // Decrease intensity of higher peaks
  if (inten > 0.2) {
    inten *= 0.008;
  }

  // Slightly increase intensity of lower peaks
  if (inten < 0.05) {
    inten *= 0.029;
  }
   
  intensity.push(inten);
}

// Modify intensity to show only two peaks close to each other
for (let i = 0; i < intensity.length; i++) {
  if (i > intensity.length / 2 - 3 && i < intensity.length / 2 + 3) {
    intensity[i] = 0.005;
  } else {
    intensity[i] = 0.1;
  }
}

ctx.beginPath();

// Draw diffraction pattern with consistent spacing between troughs
for (let y = -screenHeight / 7; y <= screenHeight / 7; y += 0.0009) {
  let x = 0;
  for (let i = 0; i < intensity.length; i++) {
    let beta = (Math.PI * slitWidth * y) / (wavelength * distance);
    let diffraction = (Math.sin(beta) / beta) ** 2;
    x += intensity[i] * diffraction;
  }
  let troughSpacing = wavelength * distance / slitWidth;
  ctx.lineTo(xOffset + x * canvas.width / (screenDistance * troughSpacing), y * canvas.height / screenHeight + canvas.height / 2.9);
}

ctx.strokeStyle = "yellow";
ctx.lineWidth = 0.08;
ctx.stroke();
//2ND PART OF THE CODE
const intersity2 = [];
for (let x = curveLength*2; x <= canvas.width + curveLength; x += 0.55) {
  const r = Math.sqrt((xOffset - x) ** 2 + distance ** 2);
  let inten = Math.sin((Math.PI * slitWidth * r) / wavelength) ** 2;
  
  // Decrease intensity of higher peaks
  if (inten > 0.2) {
    inten *= 0.0008;
  }
  
  // Slightly increase intensity of lower peaks
  if (inten < 0.05) {
    inten *= 0.006;
  }
  // Decrease the amplitude of the sine function to decrease peak height
  inten *= 0.01;
  
  
  intensity2.push(inten);
}


ctx.beginPath();

// Draw diffraction pattern with consistent spacing between troughs
for (let y = -screenHeight / 7; y <= screenHeight / 7; y += 0.001) {
  let x = 0;
  for (let i = 0; i < intensity.length; i++) {
    let beta = (Math.PI * slitWidth * y) / (wavelength * distance);
    let diffraction = (Math.sin(beta) / beta) ** 2;
    x += intensity[i] * diffraction;
  }
  let troughSpacing = wavelength * distance / slitWidth;
  ctx.lineTo(xOffset + x * canvas.width / (screenDistance * troughSpacing), y * canvas.height / screenHeight + canvas.height / 1.7);
}

ctx.strokeStyle = 'yellow';
ctx.lineWidth = 0.08;
ctx.stroke();
//end of code
}
//code for the slit and white vertical line
ctx.fillStyle = "yellow";
ctx.fillRect(90, 60, 10, 90);
ctx.fillStyle = "black";
ctx.fillRect(90, 90, 10, 2);
ctx.fillRect(90, 120, 10, 2);



const playButton = document.getElementById("play-btn");
playButton.addEventListener("click", function() {
    if (!isPlaying) {
      isPlaying = true;
      animate();
     

    }
});

const pauseButton = document.getElementById("pause-btn");
let animationId = null;
pauseButton.addEventListener("click" , function(){
  if(isPlaying){
    isPlaying = false;
    cancelAnimationFrame(animationId);
  }
});

const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click" , function(){
    isPlaying = false;
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.fillRect(90, 60, 10, 90);
    ctx.fillStyle = "black";
    ctx.fillRect(90, 90, 10, 2);
    ctx.fillRect(90, 120, 10, 2);   

    ctx.font = "20px captain";
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width * 0.32, 0, 1, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width * 0.599, 0, 1, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width * 0.82, 0, 1, canvas.height);
    ctx.fillStyle="grey";
    ctx.fillRect(10, 100 , 35 , 25);
    const text = document.getElementById("image");
    const text2 = document.getElementById("image2");
    const text3 = document.getElementById("image3");
    text.innerHTML = "";
    text2.innerHTML = "";
    text3.innerHTML = "";
});

const downloadButton = document.getElementById("download-btn");
// Function to download the image
downloadButton.addEventListener("click", function() {
  const link = document.createElement("a");
  link.download = "simulation.jpeg";
  link.href = canvas.toDataURL("image/jpeg");
  link.click();
});
document.getElementById("mode").addEventListener("change", function() {
  mode = this.value;
});

ctx.fillStyle = "white";
ctx.fillRect(canvas.width * 0.32, 0, 1, canvas.height);
ctx.fillStyle = "white";
ctx.fillRect(canvas.width * 0.599, 0, 1, canvas.height);
ctx.fillStyle = "white";
ctx.fillRect(canvas.width * 0.82, 0, 1, canvas.height);
ctx.fillStyle="grey";
ctx.fillRect(10, 100 , 35 , 25);


 


