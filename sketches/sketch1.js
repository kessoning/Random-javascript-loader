/* wall of fallen stars */

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
 ** release date on openProcessing: August 2017
 ** original post: https://www.openprocessing.org/sketch/442379
 */

var sky;

var stars = [];

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    sky = new StarSky();
}

function draw() {
    fill(8, 15, 23, 20);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height / 2, width, height);

    sky.run();
    console.log(frameCount);
}

var StarSky = function () {

    this.starsnumber = 750;
    this.stars = [];

    for (var i = 0; i < this.starsnumber; i++) {
        var s = new Star();
        this.stars.push(s);
    }

    this.run = function () {
        for (var i = 0; i < this.stars.length; i++) {
            this.stars[i].anim();
            this.stars[i].display();

            if (!this.stars[i].alive) this.stars.splice(i, 1);
        }

        if (stars.length < this.starsnumber) {
            for (var i = 0; i < 40; i++) {
                var s = new Star();
                this.stars.push(s);
            }
        }
    }
}

var Star = function () {

    this.position = createVector(random(width), random(-height, height));
    this.acceleration = createVector(0, 0, 0);;
    this.velocity = createVector(0, 0, 0);;
    this.brightness;
    this.weight = random(0.1, 0.3);
    this.size = cos(this.anim) * 2;
    this.anim = random(TWO_PI);
    this.alive = true;

    this.anim = function () {
        this.acceleration.mult(0);
        this.acceleration.y += this.weight;
        this.acceleration.limit(1);
        this.velocity.add(this.acceleration);
        this.velocity.limit(1);
        this.position.add(this.velocity);
        if (this.position.y > height) this.alive = false;
    }

    this.display = function () {
        stroke(255);
        strokeWeight(this.size + 0.2);
        point(this.position.x, this.position.y);
    }
}