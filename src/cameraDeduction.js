import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-backend-webgl';
import * as blazeface from '@tensorflow-models/blazeface';

function CameraDeduction() {
  const webcamRef = useRef(null);
  const returnTensors = false;
  const [deductionCount, setDeductionCount] = useState(0);
  const [hasAlerted, setHasAlerted] = useState(false);

  useEffect(() => {
    const detect = async (model) => {

      if (webcamRef.current) {
        const video = webcamRef.current.video;
        console.log(video, "video");
        video.oncontextmenu = (e) => {
          e.preventDefault();
        };

        video.controls = false;

        const videoWidth = 1200;
        const videoHeight = 1000;

        const prediction = await model.estimateFaces(video, returnTensors);
        console.log(prediction, 'kkk');

        setHasAlerted(false);

        if (prediction.length === 0) {
          alert("Face is not Detected");
          incrementDeductionCount();
        } else if (prediction.length > 1) {
          alert("Malpractice Activity will be Detected");
          incrementDeductionCount();
        } else {
          const [face] = prediction;
          if (face.landmarks[0][1] < videoHeight / 2 && face.landmarks[1][0] > videoWidth / 4 && face.landmarks[1][0] < videoHeight / 2 && face.landmarks[0][1] > videoWidth / 4) {
            alert("Face is not in the Desired position");
            incrementDeductionCount();
          }
        }
      }
    };


    const incrementDeductionCount = () => {
      console.log("hasAlerted--->", hasAlerted)
      if (!hasAlerted) {
        setDeductionCount((prevCount) => prevCount + 1);
        setHasAlerted(true);
      }
    };

    const runFacedetection = async () => {
      const model = await blazeface.load();
      console.log("Face Detection Model is Loaded..");

      const intervalId = setInterval(() => {
        detect(model);
      }, 1000);

      return () => clearInterval(intervalId);
    };
    runFacedetection();
  }, []);


  useEffect(()=>{
    if (deductionCount >= 5) {

      window.location.href = 'https://www.w3schools.com/';
      return;
    }
    setDeductionCount(deductionCount)
  },[deductionCount])

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} className="video-controls" />
        <div>Total Deductions: {deductionCount}</div>
      </header>
    </div>
  );
}

export default CameraDeduction;
