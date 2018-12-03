/* sketch_20171220 */

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
 ** release date on openProcessing: December 2017
 ** Original post: https://www.openprocessing.org/sketch/491282
 */

// A modified version of the FlowField example by Daniel Shiffman
// Found in Nature of Code
// http://natureofcode.com

// Flow Field Following
// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// Flowfield object
var flowfield;

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);

    // random"resolution" for the field
    var rand = floor(random(20, 40));
    // Make a new flow field
    flowfield = new FlowField(rand);
    flowfield.init();
}

function draw() {
    //background(0);

    fill(0, 15);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2, width, height);

    // Display the flowfield in "debug" mode
    flowfield.run();
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following

var FlowField = function (r) {

    // A flow field is a two dimensional array of PVectors
    this.field = [];
    this.resolution = r; // How large is each "cell" of the flow field
    this.cols = width / this.resolution;
    this.rows = height / this.resolution; // Columns and Rows

    for (var i = 0; i < this.cols; i++) {
        this.field[i] = [];
    }

    this.n = 0;

    this.init = function () {
        // Reseed noise so we get a new flow field every time
        noiseSeed(floor(random(10000)));
        var xoff = 0;
        for (var i = 0; i < this.cols; i++) {
            var yoff = 0;
            for (var j = 0; j < this.rows; j++) {
                var theta = map(noise(xoff, yoff, this.n), 0, 1, 0, TWO_PI);
                // Polar to cartesian coordinate transformation to get x and y components of the vector
                this.field[i][j] = createVector(cos(theta), sin(theta));
                yoff += 0.1;
            }
            xoff += 0.1;
        }
    }

    // Draw every vector
    this.run = function () {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
            }
        }

        var xoff = 0;
        for (var i = 0; i < this.cols; i++) {
            var yoff = 0;
            for (var j = 0; j < this.rows; j++) {
                var theta = map(noise(xoff, yoff, this.n), 0, 1, 0, TWO_PI);
                // Polar to cartesian coordinate transformation to get x and y components of the vector
                this.field[i][j].x = cos(theta);
                this.field[i][j].y = sin(theta);
                yoff += 0.1;
            }
            xoff += 0.1;
        }

        this.n += 0.01;

    }

    // Renders a vector object 'v' as an arrow and a position 'x,y'
    this.drawVector = function (v, x, y, scayl) {
        push();
        var arrowsize = 4;
        // Translate to position to render vector
        translate(x + this.resolution, y);
        stroke(255);
        // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
        rotate(v.heading());
        // Calculate length of vector & scale it to be bigger or smaller if necessary
        var len = v.mag() * scayl;
        // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
        line(0, 0, len, 0);
        //line(len,0,len-arrowsize,+arrowsize/2);
        //line(len,0,len-arrowsize,-arrowsize/2);
        pop();
    }

    this.lookup = function (lookup) {
        var column = floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
        var row = floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
        return this.field[column][row].get();
    }


}