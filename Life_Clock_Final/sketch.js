let canvasWidth = 900;
let canvasHeight = 500;

let addSnow = false;
let addBlur = false;
let maxSnowTheta = (Math.PI * 4) / 5;

let nTrees = 2;
let trees = [];
let backgroundCol;
let branchWidthInit;
let totalBranchLengthInit;
let nBranchDivisionsInit;
let percentBranchlessInit;
let branchSizeFractionInit;
let dThetaGrowMaxInit;
let dThetaSplitMaxInit;
let oddsOfBranchingInit;

function setup() {
  // Create canvas and attach to a custom div to manage its position
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0); // Position canvas at the top-left corner
  canvas.style('z-index', '-1'); // Send canvas to the back of other elements
  canvas.style('position', 'fixed'); // Keep canvas in a fixed position for the entire page
  backgroundCol = color("#e5e4e0");
  background(backgroundCol);
  noFill();
  initializeTreeValues();
  newTrees();
}

function draw() {
  // Draw a semi-transparent rectangle for the fade effect
  fill(backgroundCol.levels[0], backgroundCol.levels[1], backgroundCol.levels[2], 3);
  noStroke();
  rect(0, 0, windowWidth, windowHeight);

  // Draw all trees in the array
  for (let i = 0; i < trees.length; i++) {
    trees[i].draw();
  }
}

function initializeTreeValues() {
  branchWidthInit = 10;
  totalBranchLengthInit = 300;
  nBranchDivisionsInit = 35;
  percentBranchlessInit = 0.3;
  branchSizeFractionInit = 0.5;
  dThetaGrowMaxInit = PI / 15;
  dThetaSplitMaxInit = PI / 6;
  oddsOfBranchingInit = 0.3;
}

function newTrees() {
  for (let i = 0; i < nTrees; i++) {
    trees.push(
      new Tree(
        random(windowWidth), windowHeight, -HALF_PI, branchWidthInit,
        totalBranchLengthInit, nBranchDivisionsInit,
        percentBranchlessInit, branchSizeFractionInit,
        dThetaGrowMaxInit, dThetaSplitMaxInit,
        oddsOfBranchingInit, color(random(50, 150))
      )
    );
  }
}

function mouseClicked() {
  newTrees();
}

class Tree {
  constructor(
    xI, yI, thetaI, branchWidth0I,
    totalBranchLengthI, nBranchDivisionsI,
    percentBranchlessI, branchSizeFractionI,
    dThetaGrowMaxI, dThetaSplitMaxI,
    oddsOfBranchingI, colorI
  ) {
    this.x1 = xI;
    this.y1 = yI;
    this.x2 = xI;
    this.y2 = yI;
    this.theta = thetaI;
    this.branchWidth0 = branchWidth0I;
    this.branchWidth = branchWidth0I;
    this.totalBranchLength = totalBranchLengthI;
    this.nBranchDivisions = nBranchDivisionsI;
    this.percentBranchless = percentBranchlessI;
    this.branchSizeFraction = branchSizeFractionI;
    this.dThetaGrowMax = dThetaGrowMaxI;
    this.dThetaSplitMax = dThetaSplitMaxI;
    this.oddsOfBranching = oddsOfBranchingI;
    this.myColor = colorI;
    this.lengthSoFar = 0;
    this.nextSectionLength = 0;
  }

  draw() {
    if (this.branchWidth < 0.5) this.lengthSoFar = this.totalBranchLength;
    while (this.lengthSoFar < this.totalBranchLength) {
      this.branchWidth = this.branchWidth0 * (1 - this.lengthSoFar / this.totalBranchLength);

      if (this.lengthSoFar / this.totalBranchLength > this.percentBranchless) {
        if (random(0, 1) < this.oddsOfBranching) {
          let newBranch = new Tree(
            this.x1, this.y1, this.theta + randomSign() * this.dThetaSplitMax, this.branchWidth,
            this.totalBranchLength * this.branchSizeFraction, this.nBranchDivisions,
            this.percentBranchless, this.branchSizeFraction,
            this.dThetaGrowMax, this.dThetaSplitMax,
            this.oddsOfBranching, this.myColor
          );
          newBranch.draw();
        }
      }

      this.nextSectionLength = this.totalBranchLength / this.nBranchDivisions;
      this.lengthSoFar += this.nextSectionLength;
      this.theta += randomSign() * random(0, this.dThetaGrowMax);

      this.x2 = this.x1 + this.nextSectionLength * cos(this.theta);
      this.y2 = this.y1 + this.nextSectionLength * sin(this.theta);

      strokeWeight(abs(this.branchWidth));
      stroke(this.myColor);
      line(this.x1, this.y1, this.x2, this.y2);

      this.x1 = this.x2;
      this.y1 = this.y2;
    }
  }
}

function randomSign() {
  let num = random(-1, 1);
  return num === 0 ? -1 : num / abs(num);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(backgroundCol); // Redraw the background on resize
}