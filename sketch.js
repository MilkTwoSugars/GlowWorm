var video;

var vScale = 24;

var renderIndex = 0;

var count = 0;

var avgX = 0;
var avgY = 0;

var threshold = 150;

var idealR = 255;
var idealG = 0;
var idealB = 0;

var trail = [];

function setup() {
    background(15);
    createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);
    video.hide();
    //noFill();
    //stroke(255);
    //strokeWeight(1)
    renderPoint = createVector(0, 0)
}

function draw() {
    background(15);
    translate(-width / 2, -height / 2, sin(frameCount * 0.01) * 100)
    video.loadPixels();
    loadPixels();
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width - 1; x++) {
            var index = (video.width - x + 1 + (y * video.width)) * 4;
            var r = video.pixels[index + 0];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];
            render(x, y, r, g, b)
        }
    }

    avgX = avgX / count;
    avgY = avgY / count;

    if (count > 5) {
        noStroke();
        fill(random(255), random(255), random(255), 50)
        
        for (var i = 0; i < trail.length; i++) {
            push()
            translate(trail[i].x, trail[i].y);
            let s = map(i, 0, trail.length, 10, 75)
            sphere(s)
            pop()
        }

        noFill();
        stroke(255, 100)
        strokeWeight(10)
        beginShape()
        for (var i = 0; i < trail.length; i++) {
            curveVertex(trail[i].x, trail[i].y);
        }
        endShape();
        

        trail.push(createVector(avgX * vScale, avgY * vScale));
        if (trail.length > 50) {
            trail.splice(0, 1)
        }

    } else {
        trail = [];
    }

    avgX = 0;
    avgY = 0;
    count = 0;
}

function render(x, y, r, g, b) {

    let d = dist(r, g, b, idealR, idealG, idealB)

    if (d < threshold) {
        avgX += x;
        avgY += y;
        count++;
    }

    // push();
    // noStroke();
    // fill(r, g, b);
    // let bright = (r + g + b) / 3;
    // let z = map(bright, 0, 255, -250, 0)
    // let s = map(bright, 0, 255, 1, 5)
    push();
    // translate(x * vScale, y * vScale)
    // fill(r, g, b)
    // box(vScale);
    pop();
}

function mouseClicked() {
    let t = map(mouseX, 0, width, 25, 200)
    threshold = t;
    console.log("Threshold is now " + thresold)
}

function keyPressed() {
    threshold = 150;
}

