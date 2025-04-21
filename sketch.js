// ————— פרמטרים לקנה מידה —————
const scaleFactor   = 1 / 3;  // גורם הקטנה

// ————— פרמטרים עיקריים (בשווי יחידה) —————
const baseEyeRadius    = 30;  // רדיוס העין המקורי
const basePupilRadius  = 10;  // רדיוס האישון המקורי
const baseStrokeWidth  = 6;   // עובי הקו המקורי
const baseEyeGap       = 50;  // מרווח בסיסי בין מרכזי העיניים
const textStr          = 'JEREMIAH';
const baseTextSizeVal  = baseEyeRadius * 2; // גודל פונט מקורי = קוטר העין
const baseLetterSp     = 20;  // ריווח בין אותיות
const baseMargin       = 20;  // שוליים בסיסיים
const baseGapBetween   = 40;  // מרווח בסיסי בין עיניים לטקסט

// ————— פרמטרים לאחר קנה מידה —————
const eyeRadius    = baseEyeRadius   * scaleFactor;
const pupilRadius  = basePupilRadius * scaleFactor;
const strokeWidth  = baseStrokeWidth * scaleFactor;
const eyeGap       = baseEyeGap      * scaleFactor;
const textSizeVal  = baseTextSizeVal * scaleFactor;
const letterSpacing = baseLetterSp   * scaleFactor;
const margin       = baseMargin      * scaleFactor;
const gapBetween   = baseGapBetween  * scaleFactor;

let canvasW, canvasH;
let eyesX, eyesY;
let textX, textY;
let chars, charWidths, textTotalW;

function setup() {
  // פיצול הטקסט ואיסוף רוחבי אותיות
  chars = textStr.split('');
  createCanvas(100, 100);
  textSize(textSizeVal);
  textAlign(LEFT, CENTER);
  charWidths = chars.map(c => textWidth(c));
  textTotalW = charWidths.reduce((a, b) => a + b, 0) + letterSpacing * (chars.length - 1);

  // רוחב קבוצת העיניים
  const eyesWidth = eyeGap + eyeRadius * 2;

  // חישוב גודל הקנבס
  canvasW = margin + eyesWidth + gapBetween + textTotalW + margin;
  canvasH = margin + eyeRadius * 2 + margin;
  resizeCanvas(canvasW, canvasH);

  // חישוב מרכזי ציור
  eyesX = margin + eyeRadius + eyeGap / 2;
  eyesY = margin + eyeRadius;
  textX = margin + eyesWidth + gapBetween;
  textY = eyesY;
}

function draw() {
  background(255);
  // זווית גלובלית לכיוון העכבר מתוך מרכז העין הימנית
  const angle = atan2(mouseY - eyesY, mouseX - (eyesX + eyeGap/2));

  // ציור העיניים
  drawEye(eyesX + eyeGap/2, eyesY, angle);
  drawEye(eyesX - eyeGap/2, eyesY, angle);

  // ציור הטקסט עם ריווח בין אותיות
  noStroke();
  fill(0);
  textSize(textSizeVal);
  let x = textX;
  for (let i = 0; i < chars.length; i++) {
    text(chars[i], x, textY);
    x += charWidths[i] + letterSpacing;
  }
}

function drawEye(x, y, angle) {
  // מסגרת העין
  strokeWeight(strokeWidth);
  stroke(0);
  fill(255);
  ellipse(x, y, eyeRadius * 2);

  // חישוב ואיור האישון
  const maxDist = eyeRadius - strokeWidth / 2 - pupilRadius;
  const px = x + cos(angle) * maxDist;
  const py = y + sin(angle) * maxDist;
  noStroke();
  fill(0);
  ellipse(px, py, pupilRadius * 2);
}
