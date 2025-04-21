// ————— פרמטרים קל לכיוונון —————
const eyeRadius   = 30;   // רדיוס העיגול
const pupilRadius = 10;   // רדיוס האישון
const strokeWidth = 6;    // עובי הקו
const eyeGap      = 50;   // מרחק בין מרכזי העיניים: פחות מ‑2*eyeRadius → חפיפה

let globalAngle;          // זווית גלובלית למיקום האישונים

function setup() {
  // גודל הקנבס בהתאם לפרמטרים
  const w = eyeGap + eyeRadius * 2 + strokeWidth * 2 + 20;
  const h = eyeRadius * 2 + strokeWidth * 2 + 20;
  createCanvas(w, h);
}

function draw() {
  background(255);
  const cx = width  / 2;
  const cy = height / 2;

  // מחשבים זווית אחת מנקודת האמצע לכיוון העכבר
  globalAngle = atan2(mouseY - cy, mouseX - cx);

  // קודם מציירים את העין הימנית, ואז את השמאלית שמעליה
  drawEye(cx + eyeGap / 2, cy, globalAngle);  // ימין
  drawEye(cx - eyeGap / 2, cy, globalAngle);  // שמאל (מעל)
}

function drawEye(x, y, angle) {
  // 1) מסגרת: עיגול שחור עם מילוי לבן
  strokeWeight(strokeWidth);
  stroke(0);
  fill(255);
  ellipse(x, y, eyeRadius * 2);

  // 2) חישוב מיקום האישון על המסלול הפנימי
  const maxDist = eyeRadius - strokeWidth / 2 - pupilRadius;
  const px = x + cos(angle) * maxDist;
  const py = y + sin(angle) * maxDist;

  // 3) אישון שחור ללא stroke
  noStroke();
  fill(0);
  ellipse(px, py, pupilRadius * 2);
}