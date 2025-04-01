import { useRef, useState } from "react";
import "./App.css";
import Webcam from "react-webcam";
import * as HandPose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import { DrawingMesh } from "./DrawingMesh.jsx";

import * as fingerpose from "fingerpose";
import thumbs_up from "./emojis/thumbs_up.png";
import victory from "./emojis/victory.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: thumbs_up, victory: victory };

  const runHandpose = async () => {
    const pose = await HandPose.load();
    console.log("Handpose loaded successfully...", pose);

    // Looping and detecting
    setInterval(() => {
      detectHand(pose);
    }, 100);
  };

  const detectHand = async (pose) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video property
      const video = webcamRef.current.video;
      const videoHeight = video.videoHeight;
      const videoWidth = video.videoWidth;

      // Set video height and width
      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;

      // Set canvas height and width
      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      // Make Detection
      const hand = await pose.estimateHands(video);
      //      console.log(hand);

      if (hand.length > 0) {
        const GestureEst = new fingerpose.GestureEstimator([
          fingerpose.Gestures.VictoryGesture,
          fingerpose.Gestures.ThumbsUpGesture,
        ]);

        const gesture = await GestureEst.estimate(hand[0].landmarks, 8);
        //        console.log("gestures...", gesture);

        if (gesture.gestures !== "undefined" && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log("maxConfidence-->", maxConfidence + 1);
          // console.log("name-->", gesture.gestures[maxConfidence].name);
          setEmoji(gesture.gestures[maxConfidence + 1]?.name);
          console.log("Detected emoji: ", emoji);
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      DrawingMesh(hand, ctx);
    }
  };

  runHandpose();

  return (
    <div className="App">
      <div className="row">
        <div className="col-8">
          <Webcam
            ref={webcamRef}
            style={{
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              zIndex: 9,
              width: 700,
              height: 800,
              textAlign: "center",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              zIndex: 9,
              width: 700,
              height: 800,
              textAlign: "center",
            }}
          />
        </div>

        <div className="col-4">
          {emoji !== null ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              src={images[emoji]}
              style={{
                position: "relative",
                marginLeft: "auto",
                marginRight: "auto",
                left: 400,
                bottom: 500,
                right: 0,
                textAlign: "center",
                height: 100,
              }}
            />
          ) : (
            "Image not set"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
