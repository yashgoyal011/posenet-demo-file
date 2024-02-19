let capture;
let posenet;
let noseX, noseY;
let reyeX, reyeY;
let leyeX, leyeY;
let singlepose,skeleton;
let actor_img;
let specs,smoke;

function setup() {
    createCanvas(600, 600);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', recivedload);

   
    actor_img = loadImage('images/shahrukh.png');
    specs = loadImage('images/spects.png');
    smoke = loadImage('images/cigar.png');
}
function recivedload(poses) {
    console.log(poses);

    if (poses.length > 0) {
        skeleton = poses[0].skeleton;
        singlepose = poses[0].pose;
 
}
}
function modelLoaded() {
    console.log('Model as Loaded');
}

function draw() {
    image(capture, 0, 0);
    fill(255);
    if (singlepose) {
        for (let i = 0; i < singlepose.keypoints.length; i++) {
            ellipse(singlepose.keypoints[i].position.x, singlepose.keypoints[i].position.y, 20);
        }
        stroke(255, 255, 0);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }
        
    }
}
//     }
//     // ellipse(noseX, noseY, 30);
//     // ellipse(ryeX, ryeY, 30);
//     // ellipse(lyeX, lyeY, 30);
//     // background(200);
//     // image(shahrukh_img,100,100,100,100);
//     // image(shahrukh_img,mouseX,mouseY,100,100);















