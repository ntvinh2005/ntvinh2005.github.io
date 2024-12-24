export let amplitudeScale = 0.1; 
export let timeScale = 2; 

const amplitudeScaleSlider = document.getElementById("amplitudeScaleSlider");
const timeScaleSlider = document.getElementById("timeScaleSlider");

amplitudeScaleSlider.addEventListener("input", (event) => {
  amplitudeScale = parseFloat(event.target.value);
});

timeScaleSlider.addEventListener("input", (event) => {
  timeScale = parseFloat(event.target.value);
});