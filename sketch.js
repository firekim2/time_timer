var remained_time = 0;
let status = 0;
let button, remained_time_p;
let button_x = 60;
let button_y = 60;
let time_x = 200;
let time_y = 60;
var timer;
let radius = 150;
let h_center, v_center;

function setup() {
  //var container = document.querySelector( '.container' );
  createCanvas(window.innerWidth, window.innerHeight);
  h_center = width / 2;
  v_center = height / 2;
  button = createButton('Start');
  button.position(button_x, button_y);
  button.mousePressed(button_active);
  textAlign(CENTER);
  textSize(50);
}

function draw() {
  background(255);
  time_setting();
  time_over();
  draw_rect();
  stroke(0);
  draw_lines();
  noStroke();
  let elapsed_time = 3600 - remained_time;
  draw_circle(elapsed_time);
}

function draw_rect() {
  rectMode(CENTER);
  noStroke();
  fill(82, 93, 99);
  rect(h_center, v_center, 450, 450, 20);
  fill(255);
  rect(h_center, v_center, 400, 400, 20);
}


function reset() {
  clearInterval(timer);
  remained_time = 0;
}

function button_active() {
  if (status == 0) {
    //start button
    if (remained_time == 0){
    	return;
    }
    status = 1;
    button.style('background-color', color(230, 34, 45));
    timer = setInterval(timeIt, 1000);
  } else if (status == 1) {
    //stop button
    status = 0;
    button.style('background-color', color(26, 171, 138));
    clearInterval(timer);
  }
}

function draw_lines() {
  let length;
  for (let i = 0; i < 60; i++) {
    if (i % 5 == 0) {
      length = 4;
      strokeWeight(3);
    } else {
      length = 3;
      strokeWeight(1);
    }
    line(h_center + (radius - length) * cos(radians(i * 6)),
      v_center + (radius - length) * sin(radians(i * 6)),
      h_center + (radius + length) * cos(radians(i * 6)),
      v_center + (radius + length) * sin(radians(i * 6)));
  }
}

function draw_circle(elapsed_time) {
  fill(230, 34, 45);
  arc(
    h_center,
    v_center,
    radius * 2,
    radius * 2,
    radians(elapsed_time / 10 - 90),
    radians(270)
  );
  if(elapsed_time == 0){
    ellipse(h_center, v_center, radius * 2, radius * 2);
  }
  fill(230);
  stroke(230);
  ellipse(h_center, v_center, 50, 50);
  strokeWeight(8);
  line(h_center,
    v_center,
    h_center + 50 * cos(radians(elapsed_time / 10 - 90)),
    v_center + 50 * sin(radians(elapsed_time / 10 - 90)));
}

function time_setting() {
  if (status == 0 && mouseIsPressed) {
    if (dist(h_center, v_center, mouseX, mouseY) < radius) {
      var degree = floor(degrees(-atan2(mouseX - h_center, mouseY - v_center)) + 180) % 360;
      var minutes = 60 - floor(degree / 6);
      button.elt.innerHTML = minutes + ":00";
      remained_time = minutes * 60;
    }
  }
}

function seconds_format(n){
    return n > 9 ? "" + n: "0" + n;
}

function timeIt() {
  if (remained_time > 0 && status != 0) {
    remained_time--;
    var seconds = remained_time % 60;
    var minutes = floor(remained_time / 60);
    button.elt.innerHTML = minutes + ":" + seconds_format(seconds);
  }
}

function time_over(){
  if(remained_time == 0 && status != 0){
    button_active();
    alert("Time up");
    button.elt.innerHTML = "START";
  }
}
