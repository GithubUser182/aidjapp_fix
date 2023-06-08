song1=""
song2=""
song1_status=""
song2_status=""
scoreLeftWrist=0
scoreRightWrist=0

function preload(){
    song1=loadSound("Dog.mp3")
    song2=loadSound("Haggstrom.mp3")
}

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function modelLoaded(){
    console.log("PoseNet Initialized!")
}

function draw(){
    image(video, 0, 0, 600, 500)

    fill('#eb4034')
    stroke('#eb4034')

    song1_status=song1.isPlaying()
    song2_status=song2.isPlaying()

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20)
        song2.stop()

        if(song1_status==false){
            song1.play()
            document.getElementById("songplaying").innerHTML="Song playing: Dog by C418"
        }
        }

        if(scoreRightWrist > 0.2){
            circle(rightWristX,rightWristY,20)
            song1.stop()
    
            if(song2_status==false){
                song2.play()
                document.getElementById("songplaying").innerHTML="Song playing: Haggstrom by C418"
            }
            }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scoreLeftWrist=results[0].pose.keypoints[9].score
        scoreRightWrist=results[0].pose.keypoints[10].score
        console.log("scoreLeftWrist = "+scoreLeftWrist+" | scoreRightWrist = "+scoreRightWrist+".")

        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("leftWristX = "+leftWristX+" | leftWristY = "+leftWristY)

        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY)
    }
}