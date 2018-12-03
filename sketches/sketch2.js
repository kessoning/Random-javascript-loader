/* sketch_180314 */

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
 ** release date on openProcessing: March 2018
 ** original post: https://www.openprocessing.org/sketch/522093
 */

var points = [];

var n;

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);

    n = noise(random(10));

    for (var i = 0; i < 64; i++) {
        points[i] = [];
    }

    for (var i = 0; i < 64; i++) {
        var phi = map(i, 0, 64, 0, PI / 2);
        for (var j = 0; j < 4; j++) {
            var a = map(j, 0, 4, 0, PI) + phi;
            var x = map(j, 0, 4, 0, width);
            points[i][j] = createVector(x, height / 2, a);
        }
    }
}

function draw() {
    blendMode(NORMAL);

    background(0);

    blendMode(ADD);

    var speed = 0.09;
    for (var i = 0; i < 64; i++) {
        for (var j = 0; j < 4; j++) {
            points[i][j].z += speed;
            points[i][j].x = width / 2 + cos(points[i][j].z) * map(i, 0, 64, 50, 350);
            points[i][j].y = height / 2 + sin(points[i][j].z) * map(i, 0, 64, 50, 350);

            strokeWeight(abs(sin(points[i][j].z) * 4));
            stroke(255);
            point(points[i][j].x, points[i][j].y);
        }
        speed -= 0.0005;
    }

    for (var i = 0; i < 64; i++) {
        stroke(222, 0, 0);
        noStroke();
        fill(255, 10);
        beginShape();

        for (var j = 0; j < 4; j++) {
            vertex(points[i][j].x, points[i][j].y);
        }

        endShape(CLOSE);
    }

}