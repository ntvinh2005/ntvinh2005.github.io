# ECG Waveform Synthetic Data Generator
A tool for generating synthetic ECG waveforms, with features such as noise injection and random amplitude variations, designed to simulate ventricular fibrillation and other conditions for analysis and experimentation.

## Overview
This project generates synthetic ECG waveforms with:
* Realistic waveform shapes based on sample data. There will be 2 waveforms displayed: Original waveform and the new augmented waveform. Each datapoint in the sample data array represent 0.01 seconds.
* Noise injection for testing anomaly detection algorithms.
* Customizable parameters such as amplitude, noise, and randomness.
* Initial focus: Ventricular Fibrillation (VF).

## Feature
* Customizable Amplitude and Noise: Generate ECG data with variable scaling and noise intensity for testing purposes. There will be 1 to 3 noises per loop.
* Random offset: Add random offset for each data point and common random offset for a whole section. There will be five sections in a waveform loop. Can add randomness to the width of each sections as well as the number of it later  
* Dynamic Noise Injection: Simulate irregularities with 1–2 noise bursts per waveform loop. A noise will last 20 second. Can add randomness to how long a noise last later.
* Grid and Indicators: A grid net for distinguising the different between the original waveform and the new augmented waveform.
* Real-Time Animation: Smooth scrolling waveforms visualized in a canvas element.

## Demo
Demo live version is here: https://ntvinh2005.github.io/Projects/ECG-waveform-synthetic-data-generator/VFib_sim.html

## Update in future (soon)
* Add slide to adjust customizable variables like amplitude scales, time scales, number of noises per loop, etc.
* Experiment with other types of waveform like AFib.
