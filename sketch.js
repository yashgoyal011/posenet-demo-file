let capture;
let posenet;
let singlepose, skeleton;
let actor_img, specs, smoke;

function setup() {
    createCanvas(600, 600);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPose);

    actor_img = loadImage('images/shahrukh.png');
    specs = loadImage('images/spects.png');
    smoke = loadImage('images/cigar.png');
}

function receivedPose(poses) {
    console.log(poses);
    if (poses.length > 0) {
        skeleton = poses[0].skeleton;
        singlepose = poses[0].pose;
    }
}

function modelLoaded() {
    console.log('PoseNet Model Loaded');
}

function draw() {
    image(capture, 0, 0);

    if (singlepose) {
        for (let i = 0; i < singlepose.keypoints.length; i++) {
            let x = singlepose.keypoints[i].position.x;
            let y = singlepose.keypoints[i].position.y;
            fill(255, 0, 0);
            ellipse(x, y, 20);
        }

        // Draw skeleton
        stroke(255, 255, 0);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        // Draw specs on eyes
        let reye = singlepose.rightEye;
        let leye = singlepose.leftEye;
        image(specs, leye.x - 50, leye.y - 50, 100, 50); // Adjust specs size

        // Draw smoke on nose
        let nose = singlepose.nose;
        image(smoke, nose.x - 30, nose.y, 50, 50); // Adjust smoke size
    }
}
