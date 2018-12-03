/* .rorschachGenerator */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** web: https://kesson.io
 ** mail: kessoning@gmail.com
 ** YouTube: http://www.youtube.com/user/complexPolimorphic
 ** Vimeo: http://vimeo.com/kessondalef
 ** Behance: http://www.behance.com/kessondalef
 ** Github: https://github.com/KessonDalef
 **
 ** release date on openProcessing: April 2016
 ** Original post: https://www.openprocessing.org/sketch/418494
 */

var points = [];

var pos;
var npos;

var pg;

var maxPoints;
var maxDist;
var maxSize;

var font;
var showFont = true;

var selector;

function setup() {
    createCanvas(windowWidth, windowHeight);

    pg = createGraphics(width, height);

    reset();

    if (Math.random() < 0.5) {
        selector = 0;
    } else {
        selector = 1;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pg = createGraphics(windowWidth, windowHeight);
    reset();
}

function draw() {
    background(255);

    if (selector === 0) {
        randomGenerator();
    } else {
        noiseGenerator();
    }

    image(pg, 0, 0, width, height);

    push();
    scale(-1, 1);
    translate(-width, 0);
    image(pg, 0, 0, width, height);
    pop();

    push();
    scale(-1, -1);
    translate(-width, -height);
    image(pg, 0, 0, width, height);
    pop();

    push();
    scale(1, -1);
    translate(0, -height);
    image(pg, 0, 0, width, height);
    pop();
}

function reset() {
    background(255);

    pg.clear();

    points = [];

    pos = createVector(width / 2, height / 2);
    npos = createVector(random(10), random(10));

    maxPoints = floor(random(128, 1024));
    maxDist = floor(random(50, 250));
    maxSize = floor(random(width / 40, width / 80));
}

function randomGenerator() {
    if (points.length < maxPoints) {
        for (var i = 0; i < points.length; i++) {
            if (dist(pos.x, pos.y, points[i].x, points[i].y) < maxDist) {
                pg.stroke(0, 25);
                pg.line(pos.x, pos.y, points[i].x, points[i].y);
            }
        }

        points.push(createVector(pos.x, pos.y));

        pos.x += random(-maxSize, maxSize);
        pos.y += random(-maxSize, maxSize);

        if (pos.x < width * 0.1 || pos.x > width * 0.9) {
            pos.x = width / 2;
        }

        if (pos.y < height * 0.1 || pos.y > height * 0.9) {
            pos.y = height / 2;
        }
    }
}

function noiseGenerator() {
    if (points.length < maxPoints) {

        for (var i = 0; i < points.length; i++) {
            if (dist(pos.x, pos.y, points[i].x, points[i].y) < maxDist) {
                pg.stroke(0, 25);
                pg.line(pos.x, pos.y, points[i].x, points[i].y);
            }
        }

        append(points, createVector(pos.x, pos.y));

        pos.x += map(noise(npos.x), 0, 1, -maxSize, maxSize);
        pos.y += map(noise(npos.y), 0, 1, -maxSize, maxSize);

        if (pos.x < width * 0.1 || pos.x > width * 0.9) {
            pos.x = width / 2;
        }

        if (pos.y < height * 0.1 || pos.y > height * 0.9) {
            pos.y = height / 2;
        }

        npos.x += 0.1;
        npos.y += 0.1;
    }
}

function mousePressed() {
    reset();
}