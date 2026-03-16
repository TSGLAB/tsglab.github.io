// TSG Lab — Seasonal Growing Tree
// Fractal tree with animated swaying leaves, auto-cycling seasons
// Fixed bottom-right on all pages

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js';
  script.onload = initTree;
  document.head.appendChild(script);

  function initTree() {
    // W widened from 320→500 so leftmost branches have 300px of canvas before clipping.
    // Trunk x stays at viewport-right minus 170px (the gradient boundary) by using W/2+50.
    var W = 500, H = window.innerHeight;
    // Extra canvas height above the viewport so the canopy never hits the canvas boundary.
    // The container extends EXTRA px above the viewport; those pixels are off-screen but
    // prevent the canvas from clipping branches that grow into the upper portion of the view.
    var EXTRA = 200;

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
      'opacity:0.18',
      'background:transparent',
      'overflow:visible',
    ].join(';');
    document.body.appendChild(container);

    new p5(function (p) {

      // ── Seasons ──────────────────────────────────────────────────────────────
      var SEASONS = ['spring', 'summer', 'fall', 'winter'];
      var seasonIdx = 0;
      var seasonTimer = 0;
      var SEASON_DURATION = 900; // frames per season

      // Leaf pools for animation
      var leaves = [];
      var prog = 0;
      var seed;
      var maxLevel = 10;
      var growing = true;

      // Seasonal palettes
      var PALETTES = {
        spring:  { branch: [60, 35, 20],  leaves: ['#F9A8D4','#FCA5A5','#FBCFE8','#F472B6','#FFFFFF'], flowers: true  },
        summer:  { branch: [40, 25, 10],  leaves: ['#22CB58','#16a34a','#4ade80','#86efac','#bbf7d0'], flowers: false },
        fall:    { branch: [80, 50, 20],  leaves: ['#FB923C','#FBBF24','#F97316','#EF4444','#FDE68A'], flowers: false },
        winter:  { branch: [30, 30, 35],  leaves: [],                                                 flowers: false },
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
        container.style.height = (H + EXTRA) + 'px';
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

        // Spawn leaves at tips when grown enough
        if (level >= maxLevel - 2 && prog > maxLevel - 1 && pal.leaves.length > 0) {
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
