
status ="";
objects= [];
song= "";


function preload(){
  
    song = loadSound('Alarm-Fast-High-Pitch-A1-www.fesliyanstudios.com.mp3');
}


function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}

function modelLoaded(){
    console.log('Modal Loaded!');
    status = true;
  

}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
else {
    console.log(results);
    objects = results;
}
}


function draw(){
    image(video,0,0,380,380);
 
    
   
     if(status != "")
     {
        r = random(255);

        g = random(255);
    
        b= random(255);
        objectDetector.detect(video,gotResult);
         for(i = 0; i < objects.length; i++)
         {
       
fill(r,g,b);
            document.getElementById("status").innerHTML = "Status: object detected";
         

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
         stroke(r,g,b);
            text(objects[i].label + "   " + percent + "%" , objects[i].x +15 , objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x , objects[i].y, objects[i].width,  objects[i].height);
                    
     if(objects[i].label == "person"){
        document.getElementById("number_of_objects").innerHTML =" Baby found" ;
        song.stop();
        
    }
    else{
        song.play();
        document.getElementById("number_of_objects").innerHTML = "baby not found";
    }
    
    

         }
         if(objects.length == 0){
            song.play();
            document.getElementById("number_of_objects").innerHTML = "baby not found";
        }
    

       
     }





}


``    