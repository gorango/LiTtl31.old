var duration = 400;
var epsilon = (1000 / 60 / duration) / 4;

var bezier = function(x1, y1, x2, y2) {
  var curveX = function(t) {
    var v = 1 - t;
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
  };
  var curveY = function(t) {
    var v = 1 - t;
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
  };
  var derivativeCurveX = function(t) {
    var v = 1 - t;
    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
  };
  return function(t) {
    var x = t,
      t0, t1, t2, x2, d2, i;
    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = curveX(t2) - x;
      if (Math.abs(x2) < epsilon) return curveY(t2);
      d2 = derivativeCurveX(t2);
      if (Math.abs(d2) < 1e-6) break;
      t2 = t2 - x2 / d2;
    }
    t0 = 0, t1 = 1, t2 = x;
    if (t2 < t0) return curveY(t0);
    if (t2 > t1) return curveY(t1);
    // Fallback to the bisection method for reliability.
    while (t0 < t1) {
      x2 = curveX(t2);
      if (Math.abs(x2 - x) < epsilon) return curveY(t2);
      if (x > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 - t0) * 0.5 + t0;
    }
    // Failure
    return curveY(t2);
  };
};

var c = {
  tx: 150,
  ty: 150,
  white: 'white',
  timingFunc: bezier(0.75, 0, 0.15, 1, epsilon),
  timingFunc2: bezier(0.5, 0, 0, 1, epsilon),
  timingFunc3: bezier(0, 0, 0.25, 1, epsilon),
  timingFunc4: bezier(0, 0.5, 0.5, 1, epsilon),
  radiusOf: function(perim) {
    return perim / (2 * Math.PI);
  },
  perimOf: function(radius) {
    return 2 * Math.PI * radius;
  },
  l1Or: '#5C4D30',
  l2Or: '#FFA500',
  d1Or: '#312D25'
};

var logo = new Snap('.logo');
var ls = {};

//  CIRCLE MASK
//========================================================
var l_mask = logo.circle(c.tx, c.ty, c.radiusOf(360)).attr({
  fill: 'white',
});

//  TRANSPARENT BACKGROUND CIRCLE
//========================================================
ls.lc2 = logo.circle(c.tx, c.ty, 0).attr({
  fill: c.l2Or,
  fillOpacity: 0,
  // fillOpacity: 0.2,
});

// //  BACKGROUND SHADOW CIRCLE
// //========================================================
// ls.lcs = logo.circle(c.tx, c.ty, c.radiusOf(360)).attr({
// 	fill: 'black',
// 	fillOpacity: 0.5,
// 	filter: logo.filter(Snap.filter.blur(20, 20))
// });

//  CENTER SMALL CIRCLE
//========================================================
ls.lc1 = logo.circle(c.tx, c.ty, 0).attr({
  fill: c.l2Or,
  fillOpacity: 0,
});

//  1 o'clock DASH
//========================================================
var ld1_perim = 0 /*360*/ ,
  ld1_radius = c.radiusOf(ld1_perim),
  ld1_start = 275,
  ld1_width = ld1_perim / 12,
  ld1_end = ld1_start + ld1_width;
ls.ld1 = logo.circle(c.tx, c.ty, ld1_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: 0 /*ld1_radius * 1.5*/ ,
  strokeDasharray: [ld1_width, ld1_perim - ld1_width],
  transform: ['r' + -85, c.tx, c.ty],
});

//  3 o'clock DASH
//========================================================
var ld2_perim = 205,
  ld2_radius = c.radiusOf(ld2_perim),
  ld2_start = -10,
  ld2_width = ld2_perim / 16,
  ld2_end = ld2_start + ld2_width;
ls.ld2 = logo.circle(c.tx, c.ty, ld2_radius).attr({
  fill: 'transparent',
  stroke: 'transparent'
});

//  1 - 3 -- CENTER DASH CONNECTION
//========================================================
var ld3_perim = 360,
  ld3_scale = 1 / 4,
  ld3_radius = c.radiusOf(ld3_perim * ld3_scale),
  ld3_start = -85,
  ld3_end = ld2_width + ld2_start - 1,
  ld3_width = Math.abs(ld3_start - ld3_end) * ld3_scale;
ls.ld3 = logo.circle(c.tx, c.ty, ld3_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: 12,
  strokeDasharray: [0, ld3_perim] /*[ld3_width, ld3_perim - ld3_width]*/ ,
  transform: ['r' + ld3_start, c.tx, c.ty],
});

//  Noon DASH
//========================================================
var ld4_perim = 360,
  ld4_radius = c.radiusOf(ld4_perim),
  ld4_start = 250,
  ld4_end = 270,
  ld4_width = ld4_end - ld4_start;
ls.ld4 = logo.circle(c.tx, c.ty, ld4_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: ld4_radius,
  strokeDasharray: [0, ld4_perim] /*[ld4_width, ld4_perim - ld4_width]*/ ,
  transform: ['r' + ld1_start, c.tx, c.ty]
});

//  Noon to 1 o'clock CONNECTION
//========================================================
var ld5_perim = 360,
  ld5_scale = 1 / 2,
  ld5_stroke = 10,
  ld5_radius = c.radiusOf(ld5_perim * ld5_scale) + (ld5_stroke / 2),
  ld5_start = ld1_start + 1,
  ld5_width = 10;
ls.ld5 = logo.circle(c.tx, c.ty, ld5_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: ld5_stroke,
  strokeDasharray: [0, ld5_perim - 0],
  transform: ['r' + ld5_start, c.tx, c.ty],
});

//  1 to 3 o'clock CONNECTION
//========================================================
var ld6_perim = 360,
  ld6_scale = 1 / 2,
  ld6_stroke = 2,
  ld6_radius = c.radiusOf(ld6_perim * ld6_scale) - (ld6_stroke / 2) * 4,
  ld6_start = ld1_start,
  ld6_end = 365,
  ld6_width = (ld6_end - ld6_start) * ld6_scale - 5;
ls.ld6 = logo.circle(c.tx, c.ty, ld3_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
  strokeWidth: ld6_stroke,
  strokeDasharray: [0, ld6_perim],
  transform: ['r' + ld6_start, c.tx, c.ty],
});

//  BOTTOM DASH -- 3 to 7 o'clock
//========================================================
var ld7_perim = 360,
  ld7_stroke = 40,
  ld7_radius = c.radiusOf(ld7_perim),
  ld7_start = ld2_start, // 0
  ld7_end = 135,
  ld7_width = ld7_end - ld7_start;

ls.ld7 = logo.circle(c.tx, c.ty, ld7_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: ld7_stroke,
  strokeDasharray: [0, ld7_perim] /*[ld7_width, ld7_perim - ld7_width]*/ ,
  transform: ['r' + ld7_start, c.tx, c.ty],
});

// //  7 o'clock DASH
// //========================================================
var ld8_perim = 360,
  ld8_radius = c.radiusOf(ld8_perim),
  ld8_width = 22,
  ld8_end = ld7_end,
  ld8_start = ld8_end - ld8_width + 1;
ls.ld8 = logo.circle(c.tx, c.ty, ld8_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
  // stroke: c.l2Or,
  // transform: ['r' + ld8_start, c.tx, c.ty],
});

//  8 o'clock DASH
//========================================================
var ld9_perim = 360,
  ld9_radius = c.radiusOf(ld9_perim),
  ld9_width = 22,
  ld9_end = ld8_end + (ld9_width * 1.5),
  ld9_start = ld9_end - ld9_width + 1;
ls.ld9 = logo.circle(c.tx, c.ty, ld9_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
  // stroke: c.l2Or,
  // strokeWidth: ld9_radius * 1.35,
  // strokeDasharray: [ld9_width, ld9_perim - ld9_width],
  // transform: ['r' + ld9_start, c.tx, c.ty],
});

//  7 - 8 INNER CONNECTION
//========================================================
var ld10_perim = 360,
  ld10_scale = 1 / 2.5,
  ld10_radius = c.radiusOf(ld10_perim * ld10_scale),
  ld10_start = ld8_start,
  ld10_end = ld9_end,
  ld10_width = (ld10_end - ld10_start) * ld10_scale - 1;
ls.ld10 = logo.circle(c.tx, c.ty, ld10_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: 2,
  strokeDasharray: [0, ld10_perim] /*[ld10_width, ld10_perim - ld10_width]*/ ,
  transform: ['r' + ld10_start, c.tx, c.ty],
});

// //  7 - 8 OUTER CONNECTION
// //========================================================
var ld11_perim = 360,
  ld11_scale = 1 / 1.75,
  ld11_radius = c.radiusOf(ld11_perim * ld11_scale),
  ld11_start = ld8_start,
  ld11_end = ld9_end,
  ld11_width = (ld11_end - ld11_start) * ld11_scale - 1;
ls.ld11 = logo.circle(c.tx, c.ty, ld11_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: 10,
  strokeDasharray: [0, ld11_perim] /*[ld11_width, ld11_perim - ld11_width]*/ ,
  transform: ['r' + ld11_start, c.tx, c.ty],
});

//  10 o'clock DASH
//========================================================
var ld12_perim = 360,
  ld12_radius = c.radiusOf(ld12_perim),
  ld12_width = 12,
  ld12_end = 222,
  ld12_start = ld12_end - ld12_width + 1;
ls.ld12 = logo.circle(c.tx, c.ty, ld12_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
  // stroke: c.l2Or,
  // strokeWidth: ld12_radius,
  // strokeDasharray: [ld12_width, ld12_perim - ld12_width],
  // transform: ['r' + ld12_start, c.tx, c.ty],
});

//  11 o'clock DASH
//========================================================
var ld13_perim = 360,
  ld13_radius = c.radiusOf(ld13_perim),
  ld13_width = 12,
  ld13_end = ld12_end + (ld13_width * 1.5),
  ld13_start = ld13_end - ld13_width + 1;
ls.ld13 = logo.circle(c.tx, c.ty, ld13_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
  // strokeWidth: ld13_radius,
  // strokeDasharray: [ld13_width, ld13_perim - ld13_width],
  // transform: ['r' + ld13_start, c.tx, c.ty],
});

//  10 - 11 CONNECTION
//========================================================
var ld14_perim = 360,
  ld14_scale = 3 / 4,
  ld14_radius = c.radiusOf(ld14_perim * ld14_scale),
  ld14_start = ld12_start,
  ld14_end = ld13_end,
  ld14_width = (ld14_end - ld14_start) * ld14_scale - 1;
ls.ld14 = logo.circle(c.tx, c.ty, ld14_radius).attr({
  fill: 'transparent',
  stroke: c.l2Or,
  strokeWidth: 4,
  strokeDasharray: [0, ld14_perim - 0],
  transform: ['r' + ld13_start, c.tx, c.ty],
});


//========================================================
//
// ANIMATIONS
//
//========================================================

var initAnim_timeout = 2000;
var anim_expand1Dash_timeout = 200;
var anim_expand3Dash_timeout = 400;
var anim_expand1to3Dash_timeout = 100;
var anim_expandNoonDash_timeout = 100;
var anim_expand3to7Dash_timeout = 200;
var anim_expand8Dash_timeout = 200;
var anim_expand11Dash_timeout = 200;
var anim_expand10Dash_timeout = 200;

var initAnim = new Promise(function(resolve) {
  // center circles
  ls.lc1.attr({
    fillOpacity: 1
  });

  ls.lc2.animate({
    r: 18,
    fillOpacity: 0.2
  }, initAnim_timeout, c.timingFunc2);
  ls.lc1.animate({
    r: 4
  }, initAnim_timeout, c.timingFunc2, resolve);
});

var anim_expand1Dash = initAnim.then(function() {
  return new Promise(function(resolve) {
    // 1 o'clock dash
    Snap.animate(0, 205, function(val) {
      var width = val / 12;
      var strokeWidth = c.radiusOf(val) * 1.5;
      ls.ld1.attr({
        r: c.radiusOf(val),
        strokeWidth: strokeWidth,
        strokeDasharray: [width, val - width]
      });
    }, anim_expand1Dash_timeout, c.timingFunc2, resolve);
  })
});

var anim_expand3Dash = anim_expand1Dash.then(function() {
  return new Promise(function(resolve) {
    // 3 o'clock dash
    ls.ld2 = ls.ld1.clone();

    Snap.animate(0, ld3_width, function(val) {
      var width = ld3_perim;
      ls.ld3.attr({
        strokeDasharray: [val, width - val]
      });
    }, anim_expand3Dash_timeout, mina.bounce);

    // 1-3 inner connection
    Snap.animate(ld2_perim / 12, ld2_perim / 16, function(val) {
      ls.ld2.attr({
        strokeDasharray: [val, ld2_perim - val]
      });
    }, anim_expand3Dash_timeout, mina.bounce);

    Snap.animate(-85, ld2_start, function(val) {
      ls.ld2.attr({
        transform: ['r' + val, c.tx, c.ty]
      });
    }, anim_expand3Dash_timeout, mina.bounce, resolve);
  })
});

var anim_expandNoonDash = anim_expand3Dash.then(function() {
  return new Promise(function(resolve) {
    // Noon dash
    ls.ld4.attr({
      strokeDasharray: [ld4_width, ld4_perim - ld4_width]
    });

    Snap.animate(ld1_start, ld4_start, function(val) {

      ls.ld4.attr({
        transform: ['r' + val, c.tx, c.ty]
      });

      // Noon-1 connection
      ls.ld5.attr({
        strokeDasharray: [10, ld5_perim - 10],
      });

      var deg = Math.abs(-275 + val) / 2;
      ls.ld5.attr({
        transform: ['r' + (ld5_start - deg), c.tx, c.ty]
      });

    }, anim_expandNoonDash_timeout, c.timingFunc2, resolve);
  })
});

var anim_expand3to7Dash = anim_expand3Dash.then(function() {
  return new Promise(function(resolve) {
    // 7 o'clock dash
    ls.ld8 = ls.ld2.clone().attr({
      r: ld8_radius,
      strokeWidth: ld8_radius * 1.35,
      strokeDasharray: [ld8_width, ld8_perim - ld8_width],
    });

    Snap.animate(ld7_start, (ld7_end - ld8_width + 1), function(val) {
      // 3-7 long bottom dash
      ls.ld7.attr({
        strokeDasharray: [val + 20, ld7_perim - val + 20]
      });

      ls.ld8.attr({
        transform: ['r' + val, c.tx, c.ty]
      });
    }, anim_expand3to7Dash_timeout, c.timingFunc2, resolve);
  })
});

var anim_expand8Dash = anim_expand3to7Dash.then(function() {
  return new Promise(function(resolve) {
    // 8 o'clock dash
    ls.ld9 = ls.ld8.clone();

    Snap.animate(ld8_start, ld9_start, function(val) {

      ls.ld9.attr({
        transform: ['r' + val, c.tx, c.ty]
      });

      var width = (val - ld8_start) / 2;
      // 7-8 inner connection
      ls.ld10.attr({
        strokeDasharray: [width, ld10_perim - width]
      });
      // 7-8 outer connection
      ls.ld11.attr({
        strokeDasharray: [width * 1.5, ld10_perim - width * 1.5]
      });

    }, anim_expand8Dash_timeout, c.timingFunc2, resolve);
  })
});

var anim_expand11Dash = anim_expandNoonDash.then(function() {
  return new Promise(function(resolve) {
    // 11 o'clock dash
    ls.ld13 = ls.ld4.clone();
    ls.ld13.attr({
      strokeDasharray: [ld13_width, ld13_perim - ld13_width]
    });

    Snap.animate(ld4_start, ld13_start, function(val) {

      ls.ld13.attr({
        transform: ['r' + val, c.tx, c.ty]
      });

    }, anim_expand11Dash_timeout, mina.bounce, resolve);
  })
});

var anim_expand10Dash = anim_expand11Dash.then(function() {
  return new Promise(function(resolve) {
    // 10 o'clock dash
    ls.ld12 = ls.ld4.clone();
    ls.ld12.attr({
      strokeDasharray: [ld12_width, ld12_perim - ld12_width]
    });

    // 10-11 connection
    ls.ld14.attr({
      strokeDasharray: [8.5, ld14_perim - 8.5],
    });

    Snap.animate(ld13_start, ld12_start, function(val) {

      ls.ld12.attr({
        transform: ['r' + val, c.tx, c.ty]
      });

      var deg = Math.abs(-229 + val) / 1.9;
      ls.ld14.attr({
        transform: ['r' + (ld13_start - deg), c.tx, c.ty]
      });

    }, anim_expand10Dash_timeout, mina.bounce, resolve);
  })
});

var anim_expand1to3Dash = anim_expand11Dash.then(function() {
  return new Promise(function(resolve) {
    // 1-3 outer connection
    ls.ld6.attr({
      stroke: c.l2Or
    });

    Snap.animate(c.perimOf(ld3_radius / ld6_scale), ld6_perim, function(val) {
      var mod = (ld6_perim * val) / Math.pow(ld6_perim, 2) - 0.1;
      var radius = c.radiusOf(val * ld6_scale) - (ld6_stroke / 2) * 4;
      var strokeDasharray = [ld6_width * mod, val - ld6_width * mod];
      ls.ld6.attr({
        r: radius,
        strokeDasharray: strokeDasharray
      });
    }, anim_expand1to3Dash_timeout, c.timingFunc2, next);
  })
});

// LOGO GROUP
var ldg = logo.group(ls.lc1, ls.lc2, ls.ld1, ls.ld2, ls.ld3, ls.ld4, ls.ld5, ls.ld6, ls.ld7, ls.ld8, ls.ld9, ls.ld10, ls.ld11, ls.ld12, ls.ld13, ls.ld14);
ldg.attr({
  mask: l_mask,
});

//========================================================
//  Animate Logo
//========================================================

// ls.animateLogo = function() {
//   return initAnim;
// };
//
// ls.animateLogo()



// ——————————————————————————————————————————————————
// TextScramble
// https://codepen.io/soulwire/pen/mErPAK
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'LiTl31',
  'Automation Engineering',
  'Coming Soon',
]

const el = document.querySelector('h1')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}
