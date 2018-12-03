/* gravitational drawer */

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
 ** release date on openProcessing: May 2016
 ** Original post: https://www.openprocessing.org/sketch/426064
 */

var points1 = [];
var acceleration1 = [];
var velocity1 = [];

var points2 = [];
var points3 = [];
var points4 = [];

var topspeed;
var pointsdimension;
var numpoints;
var center_gravity;

var hmirror = false;
var vmirror = false;
var whitebg = false;

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360);

    reset();
}

function draw() {
    center_gravity.x = mouseX;
    center_gravity.y = mouseY;
    move();
    view();
}

function move() {
    for (var i = 0; i < numpoints; i++) {
        acceleration1[i] = p5.Vector.sub(center_gravity, points1[i]);
        acceleration1[i].normalize();
        acceleration1[i].mult(0.5);
        velocity1[i].add(acceleration1[i]);
        velocity1[i].limit(topspeed);
        points1[i].add(velocity1[i]);
        points2[i].set(width - points1[i].x, points1[i].y);
        points3[i].set(points1[i].x, height - points1[i].y);
        points4[i].set(width - points1[i].x, height - points1[i].y);
    }
}

function view() {
    for (var i = 0; i < points1.length; i++) {
        var c;
        if (!whitebg) {
            c = color(noise(frameCount / 100) * 360, 200, 360, 10);
            blendMode(ADD);
        } else {
            c = color(noise(frameCount / 100) * 360, 200, 180, 10);
            blendMode(MULTIPLY);
        }
        stroke(c);
        point(points1[i].x, points1[i].y);
        for (var j = 0; j < points1.length; j++) {
            if (dist(points1[i].x, points1[i].y, points1[j].x, points1[j].y) < width / 12) {
                line(points1[i].x, points1[i].y, points1[j].x, points1[j].y);
            }

            if (dist(points2[i].x, points2[i].y, points2[j].x, points2[j].y) < width / 12 && hmirror) {
                line(points2[i].x, points2[i].y, points2[j].x, points2[j].y);
            }

            if (dist(points3[i].x, points3[i].y, points3[j].x, points3[j].y) < width / 12 && vmirror) {
                line(points3[i].x, points3[i].y, points3[j].x, points3[j].y);
            }

            if (dist(points4[i].x, points4[i].y, points4[j].x, points4[j].y) < width / 12 && hmirror && vmirror) {
                line(points4[i].x, points4[i].y, points4[j].x, points4[j].y);
            }
        }
    }
}

function reset() {
    topspeed = 10 + Math.random() * 20;
    numpoints = 32;
    pointsdimension = 0.5 + Math.random();
    center_gravity = createVector(random(width * 0.3, width * 0.7), random(height * 0.3, height * 0.7));

    for (var i = 0; i < numpoints; i++) {
        points1[i] = createVector(Math.random() * width, Math.random() * height);
        acceleration1[i] = createVector(0, 0);
        velocity1[i] = createVector(0, 0);
        points2[i] = createVector(width - points1[i].x, points1[i].y);
        points3[i] = createVector(points1[i].x, height - points1[i].y);
        points4[i] = createVector(width - points1[i].x, height - points1[i].y);
    }

    blendMode(NORMAL);
    if (whitebg) {
        background(360);
    } else {
        background(0);
    }
}

function mousePressed() {
    reset();
}

function keyPressed() {
    if (key == 'H') {
        hmirror = !hmirror;
    } else if (key == 'V') {
        vmirror = !vmirror;
    } else if (key == 'S') {
        saveFrame("gravitational_drawer####.png");
    } else if (key == 'B') {
        whitebg = !whitebg;
        reset();
    }
}