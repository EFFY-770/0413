let lines = [
  "我是教科一B的李蕙芯",
  "學號 413730770",
];
let alphas = [0, 0, 0];
let fadeInSpeed = 2;
let stars = []; // 儲存星星的陣列

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  textSize(30); // 字體大小調大
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  noStroke();

  // 初始化一些星星
  for (let i = 0; i < 100; i++) {
    stars.push(new Star(random(width), random(height), random(4, 10))); // 星星大小範圍變大
  }
}

function draw() {
  background('#fef6e4'); // 淡米黃色背景

  // 半透明白色圓角框
  fill(255, 255, 255, 200);
  rectMode(CENTER);
  rect(width / 2, height / 2, 600, 200, 20); // 調整框的大小以適應更大的字體

  // 顯示文字 + 淡入動畫
  for (let i = 0; i < lines.length; i++) {
    if (i === 0 || alphas[i - 1] >= 255) {
      alphas[i] = min(alphas[i] + fadeInSpeed, 255);
    }

    fill(47, 47, 47, alphas[i]);
    text(lines[i], width / 2, height / 2 - 40 + i * 40); // 調整文字間距
  }

  // 繪製星星
  for (let star of stars) {
    star.twinkle();
    star.move(); // 新增移動效果
    star.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}

// 星星類別
class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.brightness = random(150, 255); // 初始亮度
    this.twinkleSpeed = random(0.5, 1.5); // 閃爍速度
    this.xSpeed = random(-0.5, 0.5); // 水平漂浮速度
    this.ySpeed = random(-0.5, 0.5); // 垂直漂浮速度
  }

  twinkle() {
    // 讓星星亮度在範圍內緩慢變化
    this.brightness += this.twinkleSpeed;
    if (this.brightness > 255 || this.brightness < 150) {
      this.twinkleSpeed *= -1; // 反轉閃爍方向
    }
  }

  move() {
    // 星星緩慢移動
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // 如果星星超出畫布邊界，讓它從另一側出現
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  display() {
    fill(255, 223, 186, this.brightness); // 淡橙黃色
    noStroke();
    ellipse(this.x, this.y, this.size); // 繪製星星
  }
}
