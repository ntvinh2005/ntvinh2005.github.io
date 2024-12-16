import VFibDataArray from './data.js';

const dataArray = VFibDataArray;
const canvas = document.getElementById('ecgCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// These are scaling factors
const amplitudeScale = 0.1; 
const timeScale = 2; 

// Animation variables
let offset = 0; // This variable is use to track the horizontal scrolling

function drawECG() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // This is to create grid line
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvasWidth; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }
    for (let y = 0; y < canvasHeight; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let startY = canvasHeight / 2;

    for (let x = 0; x <= canvasWidth; x++) {
        let dataIndex = Math.floor((x + offset) / timeScale) % dataArray.length;
        let yValue = startY - dataArray[dataIndex] * amplitudeScale;
        if (yValue >= startY - 482.897384305839 * amplitudeScale) {
            if (x === 0) {
                ctx.moveTo(x, yValue);
            } else {
                ctx.lineTo(x, yValue);
            }
        }
    }

    ctx.stroke();

    offset = (offset + 1) % (dataArray.length * timeScale);

    requestAnimationFrame(drawECG);
}

drawECG();
