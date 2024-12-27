import { amplitudeScale, timeScale } from './scale_slide.js';

//Each data point will represent 0.04 second.
let expectedDataLength = 800;
let dataArray = new Array(expectedDataLength).fill(0);
let avgPeriod = 15; 

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomSinus() {
    let currentDataLength = 0;
    let index = 0;
    let endIndex = 0;
    let evenOrOdd = false;
    while (index < expectedDataLength) {
        let currentHalfPeriod = Math.floor(getRandomValue(avgPeriod - avgPeriod * 0.6, avgPeriod + avgPeriod * 0.3));
        let offsetArr = new Array(currentHalfPeriod).fill(0);
        let peakIndex = getRandomValue(Math.floor(currentHalfPeriod / 2) - 5, Math.floor(currentHalfPeriod / 2) + 5);
        let currentAmplitude;
        if (evenOrOdd) currentAmplitude = getRandomValue(50, 400);
        else currentAmplitude = getRandomValue(-400, -50);

        // Setting value for the offset value array. The data point for offset will create linear graph (look like a roof).
        let peakVal = getRandomValue(0.3*currentAmplitude, 0.7*currentAmplitude);
        let slope1 = peakVal / peakIndex;
        let slope2 = peakVal / (currentHalfPeriod - peakIndex - 1);
        for (let i = 0; i < currentHalfPeriod; i++) {
            if (i <= peakIndex) offsetArr[i] = i * slope1;
            else offsetArr[i] = (currentHalfPeriod - i - 1) * slope2;
        }
        console.log(offsetArr);

        evenOrOdd = !evenOrOdd;
        let parabolaConst = currentAmplitude / (currentHalfPeriod * currentHalfPeriod / 4);
        endIndex += currentHalfPeriod;
        while (index < endIndex) {
            dataArray[index] = currentAmplitude - parabolaConst * (currentHalfPeriod / 2 - (currentHalfPeriod - (endIndex - index))) * (currentHalfPeriod / 2 - (currentHalfPeriod - (endIndex - index)));
            dataArray[index] += offsetArr[index - (endIndex - currentHalfPeriod)];

            //This to add little peak randomly somewhere in the sinus graph (kinda a small noise)
            if (Math.floor(getRandomValue(1, 25)) == 10 && (index < Math.floor(endIndex - currentHalfPeriod /2) - 4 || index > Math.floor(endIndex - currentHalfPeriod/2) + 5)) {
                dataArray[index] += getRandomValue(0.15 * currentAmplitude, 0.7 * currentAmplitude);
                console.log("Congratulation");
            }
            index += 1;
        }
    }
}

const canvas = document.getElementById('ecgCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Animation variables
let offset = 0; // This variable is use to track the horizontal scrolling

function drawECG() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // This is to create grid lines
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
                ctx.lineTo(x, yValue)
            }
        }
    }

    ctx.stroke();

    offset = (offset + 1) % (dataArray.length * timeScale);
    if (offset === 1) {
        generateRandomSinus();
        console.log(dataArray);
    }

    requestAnimationFrame(drawECG);
}

drawECG();
