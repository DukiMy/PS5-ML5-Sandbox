let mobilenet;
let video;
let label = ""; // Declare label globally
let confidence; // Declare probability globally

function setup() {
    let canvas = createCanvas(640, 545);
    video = createCapture(VIDEO);
    video.hide();
    canvas.parent(document.querySelector('.canvas-container'));
    mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function modelReady() {
    classifyVideo();
}

function classifyVideo() {
    mobilenet.predict(gotResults); // Initiate continuous prediction
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        label = results[0].label; // Make sure it's results[0].label, not className
        confidence = results[0].confidence; // Make sure it's results[0].confidence, not probability
        classifyVideo(); // Continue predicting
    }
}

function draw() {
    fill(255); // Ensure text color is visible against the background
    background(51);
    image(video, 0, 0); // Display video
    textSize(24); // Adjust text size for visibility
    text(label, 10, height - 40); // Display label
    text(confidence, 10, height - 10); // Display probability
}