import * as fp from "fingerpose";


// Korean Love Gesture
const KoreanLoveGesture = new fp.GestureDescription("korean_love");

// Thumb: No curl, should be horizontal (pointing right for right hand)
KoreanLoveGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
KoreanLoveGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);
KoreanLoveGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.HorizontalRight,
  0.9
);

// Index Finger: Should also be straight but slightly tilted
KoreanLoveGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
KoreanLoveGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
KoreanLoveGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalLeft,
  0.9
);

// Other Fingers: Fully curled (hidden in palm)
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  KoreanLoveGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}


// Open Palm Gesture
const OpenPalmGesture = new fp.GestureDescription("open_palm");
// All fingers should be straight (No Curl)
for (let finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  OpenPalmGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}
// Fingers should be pointing upwards
OpenPalmGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
OpenPalmGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.VerticalUp,
  1.0
);
OpenPalmGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.VerticalUp,
  1.0
);
OpenPalmGesture.addDirection(
  fp.Finger.Ring,
  fp.FingerDirection.VerticalUp,
  1.0
);
OpenPalmGesture.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.VerticalUp,
  1.0
);


// L Symbol Gesture
const VerticalLsymbol = new fp.GestureDescription("vertical_L");
// Only Index and thumb should be outward and straight
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  VerticalLsymbol.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
// Index-verticalup and thumb-horizontalLeft/horizontalRight pointing outward
VerticalLsymbol.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
VerticalLsymbol.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
VerticalLsymbol.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

// Index Finger: No curl, pointing up
VerticalLsymbol.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
VerticalLsymbol.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);


// Fist Gesture
const FistGesture = new fp.GestureDescription('fist');

// All fingers should be fully curled into the palm
for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    FistGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

// Fingers can point in any direction since it's a closed fist
for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    FistGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 0.75);
    FistGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 0.75);
}

export { KoreanLoveGesture, OpenPalmGesture, VerticalLsymbol };
