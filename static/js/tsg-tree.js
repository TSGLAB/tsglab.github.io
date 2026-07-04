// TSG Lab—Seasonal Growing Tree
// Fractal tree with animated swaying leaves, auto-cycling seasons
// Fixed bottom-right on all pages

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js';
  script.onload = initTree;
  document.head.appendChild(script);

  function initTree() {
    var EXTRA = 200;
    var W = 500, H = window.innerHeight;

    // On mobile (≤768px) use a smaller canvas so the tree is visible
    // but doesn't overlap content. Width 220px, reduced opacity.
    function isMobile() { return window.innerWidth <= 768; }
    function treeWidth() { return isMobile() ? 220 : 500; }
    function treeOpacity() { return isMobile() ? 0.13 : 0.18; }

    W = treeWidth();

    var container = document.createElement('div');
    container.id = 'tsg-tree-canvas';
    container.style.cssText = [
      'position:fixed',
      'right:-30px',
      'bottom:0',
      'width:' + W + 'px',
      'height:' + (H + EXTRA) + 'px',
      'pointer-events:none',
      'z-index:10',
      'opacity:' + treeOpacity(),
      'background:transparent',
      'overflow:visible',
    ].join(';');
    document.body.appendChild(container);

    new p5(function (p) {

      // ── Seasons ──────────────────────────────────────────────────────────────
      var SEASONS = ['spring', 'summer', 'fall', 'winter'];
      var seasonIdx = Math.floor(Math.random() * SEASONS.length);
      var seasonTimer = 0;
      var SEASON_DURATION = 900; // frames per season

      // Leaf pools for animation
      var leaves = [];
      var prog = 0;
      var seed;
      var maxLevel = 10;
      var growing = true;

      // Seasonal palettes—richer colour sets for denser, more varied foliage
      var PALETTES = {
        spring:  { branch: [60, 35, 20],  leaves: ['#F9A8D4','#FCA5A5','#FBCFE8','#F472B6','#FFFFFF','#fdd5e8','#e879f9','#f0abfc','#fce7f3'], flowers: true  },
        summer:  { branch: [40, 25, 10],  leaves: ['#22CB58','#16a34a','#4ade80','#86efac','#bbf7d0','#a3e635','#65a30d','#d9f99d','#052e16'], flowers: false },
        fall:    { branch: [80, 50, 20],  leaves: ['#FB923C','#FBBF24','#F97316','#EF4444','#FDE68A','#dc2626','#b45309','#fef08a','#c2410c','#7c2d12'], flowers: false },
        winter:  { branch: [30, 30, 35],  leaves: [],                                                                                                    flowers: false },
      };

      p.setup = function () {
        H = window.innerHeight;
        var cnv = p.createCanvas(W, H + EXTRA);
        cnv.parent('tsg-tree-canvas');
        cnv.elt.style.background = 'transparent';
        p.frameRate(30);
        resetTree();
      };

      p.windowResized = function () {
        H = window.innerHeight;
        W = treeWidth();
        container.style.width   = W + 'px';
        container.style.height  = (H + EXTRA) + 'px';
        container.style.opacity = treeOpacity();
        p.resizeCanvas(W, H + EXTRA);
      };

      function resetTree() {
        seed = p.floor(p.random(10000));
        prog = 0;
        growing = true;
        leaves = [];
      }

      p.draw = function () {
        p.clear(0, 0, 0, 0);

        // Season cycling
        seasonTimer++;
        if (seasonTimer > SEASON_DURATION) {
          seasonTimer = 0;
          seasonIdx = (seasonIdx + 1) % SEASONS.length;
          resetTree();
        }

        var season = SEASONS[seasonIdx];
        var pal = PALETTES[season];

        // Grow
        if (growing) {
          prog += 0.055;
          if (prog >= maxLevel + 2) growing = false;
        }

        // Draw tree
        p.randomSeed(seed);
        p.push();
        branch(p, pal, W / 2 + 50, H + EXTRA + 10, -p.HALF_PI, 0, 105);
        p.pop();

        // Animate leaves
        var t = p.frameCount * 0.015;
        for (var i = leaves.length - 1; i >= 0; i--) {
          var lf = leaves[i];
          lf.age++;

          // Sway using sin
          var sway = p.sin(t * lf.freq + lf.phase) * lf.swayAmt;
          var x = lf.x + sway;
          var y = lf.y + p.sin(t * lf.freq * 0.7 + lf.phase) * (lf.swayAmt * 0.4);

          // Fade in / gentle fade out for winter (no leaves)
          var alpha = season === 'winter' ? 0 : p.map(lf.age, 0, 20, 0, lf.maxAlpha);

          p.push();
          p.translate(x, y);
          p.rotate(lf.angle + sway * 0.08);
          p.noStroke();
          p.fill(p.red(lf.col), p.green(lf.col), p.blue(lf.col), alpha);
          p.ellipse(0, 0, lf.w, lf.h);
          p.pop();

          if (lf.age > 600) leaves.splice(i, 1);
        }
      };

      function branch(p, pal, x, y, angle, level, len) {
        if (level > maxLevel || level > prog) return;

        var col = pal.branch;
        var weight = p.map(level, 0, maxLevel, 5.5, 0.6);
        p.stroke(col[0], col[1], col[2]);
        p.strokeWeight(weight);

        var nx = x + p.cos(angle) * len;
        var ny = y + p.sin(angle) * len;
        p.line(x, y, nx, ny);

        // Spawn leaves only on branches in the cream zone (left of gradient→white boundary).
        // Trunk is at x = W/2+50 = 300; pure white starts at canvas x ≈ 350.
        // Right-side branches (in the white zone) stay bare.
        if (level >= maxLevel - 2 && prog > maxLevel - 1 && pal.leaves.length > 0 && nx < W / 2 + 100) {
          if (p.random() < 0.35 && leaves.length < 300) {
            var hexCol = pal.leaves[p.floor(p.random(pal.leaves.length))];
            leaves.push({
              x: nx + p.random(-6, 6),
              y: ny + p.random(-6, 6),
              angle: p.random(p.TWO_PI),
              w: p.random(5, 11),
              h: p.random(7, 15),
              freq: p.random(0.6, 1.4),
              phase: p.random(p.TWO_PI),
              swayAmt: p.random(3, 8),
              col: p.color(hexCol),
              maxAlpha: p.random(160, 220),
              age: 0,
            });
          }
        }

        var lenFactor = p.random(0.60, 0.72);
        var rot       = p.random(0.30, 0.44);
        var rotRand   = p.random(-0.07, 0.07);

        if (p.random() < 0.93)
          branch(p, pal, nx, ny, angle - rot + rotRand, level + 1, len * lenFactor);
        if (p.random() < 0.93)
          branch(p, pal, nx, ny, angle + rot + rotRand, level + 1, len * lenFactor);
        if (level < 4 && p.random() < 0.35)
          branch(p, pal, nx, ny, angle + p.random(-0.12, 0.12), level + 1, len * lenFactor * 0.88);
      }

    }, container);
  }
})();
