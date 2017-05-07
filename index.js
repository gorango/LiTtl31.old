const duration = 400
const epsilon = (1000 / 60 / duration) / 4

const C = config()

const logo = new Snap('.logo')
const ls = {}

//  TRANSPARENT BACKGROUND CIRCLE
ls.lc2 = logo
  .circle(C.X, C.Y, 0)
  .attr({
    fill: C.ORANGE,
    fillOpacity: 0,
  })

//  CENTER SMALL CIRCLE
ls.lc1 = logo
  .circle(C.X, C.Y, 0)
  .attr({
    fill: C.ORANGE,
    fillOpacity: 0,
  })

//  1 o'clock DASH
let ld1_perim = 0,
  ld1_radius = C.radius(ld1_perim),
  ld1_start = 275,
  ld1_width = ld1_perim / 12,
  ld1_end = ld1_start + ld1_width
ls.ld1 = logo.circle(C.X, C.Y, ld1_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: 0,
  strokeDasharray: [ld1_width, ld1_perim - ld1_width],
  transform: ['r' + -85, C.X, C.Y],
})

//  3 o'clock DASH
let ld2_perim = 205,
  ld2_radius = C.radius(ld2_perim),
  ld2_start = -10,
  ld2_width = ld2_perim / 16,
  ld2_end = ld2_start + ld2_width
ls.ld2 = logo.circle(C.X, C.Y, ld2_radius).attr({
  fill: 'transparent',
  stroke: 'transparent'
})

//  1 - 3 -- CENTER DASH CONNECTION
let ld3_perim = 360,
  ld3_scale = 1 / 4,
  ld3_radius = C.radius(ld3_perim * ld3_scale),
  ld3_start = -85,
  ld3_end = ld2_width + ld2_start - 1,
  ld3_width = Math.abs(ld3_start - ld3_end) * ld3_scale
ls.ld3 = logo.circle(C.X, C.Y, ld3_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: 12,
  strokeDasharray: [0, ld3_perim],
  transform: ['r' + ld3_start, C.X, C.Y],
})

//  Noon DASH
let ld4_perim = 360,
  ld4_radius = C.radius(ld4_perim),
  ld4_start = 250,
  ld4_end = 270,
  ld4_width = ld4_end - ld4_start
ls.ld4 = logo.circle(C.X, C.Y, ld4_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: ld4_radius,
  strokeDasharray: [0, ld4_perim],
  transform: ['r' + ld1_start, C.X, C.Y]
})

//  Noon to 1 o'clock CONNECTION
let ld5_perim = 360,
  ld5_scale = 1 / 2,
  ld5_stroke = 10,
  ld5_radius = C.radius(ld5_perim * ld5_scale) + (ld5_stroke / 2),
  ld5_start = ld1_start + 1,
  ld5_width = 10
ls.ld5 = logo.circle(C.X, C.Y, ld5_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: ld5_stroke,
  strokeDasharray: [0, ld5_perim - 0],
  transform: ['r' + ld5_start, C.X, C.Y],
})

//  1 to 3 o'clock CONNECTION
let ld6_perim = 360,
  ld6_scale = 1 / 2,
  ld6_stroke = 2,
  ld6_radius = C.radius(ld6_perim * ld6_scale) - (ld6_stroke / 2) * 4,
  ld6_start = ld1_start,
  ld6_end = 365,
  ld6_width = (ld6_end - ld6_start) * ld6_scale - 5
ls.ld6 = logo.circle(C.X, C.Y, ld3_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
  strokeWidth: ld6_stroke,
  strokeDasharray: [0, ld6_perim],
  transform: ['r' + ld6_start, C.X, C.Y],
})

//  BOTTOM DASH -- 3 to 7 o'clock
let ld7_perim = 360,
  ld7_stroke = 40,
  ld7_radius = C.radius(ld7_perim),
  ld7_start = ld2_start,
  ld7_end = 135,
  ld7_width = ld7_end - ld7_start
ls.ld7 = logo.circle(C.X, C.Y, ld7_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: ld7_stroke,
  strokeDasharray: [0, ld7_perim],
  transform: ['r' + ld7_start, C.X, C.Y],
})

// //  7 o'clock DASH
let ld8_perim = 360,
  ld8_radius = C.radius(ld8_perim),
  ld8_width = 22,
  ld8_end = ld7_end,
  ld8_start = ld8_end - ld8_width + 1
ls.ld8 = logo.circle(C.X, C.Y, ld8_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
})

//  8 o'clock DASH
let ld9_perim = 360,
  ld9_radius = C.radius(ld9_perim),
  ld9_width = 22,
  ld9_end = ld8_end + (ld9_width * 1.5),
  ld9_start = ld9_end - ld9_width + 1
ls.ld9 = logo.circle(C.X, C.Y, ld9_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
})

//  7 - 8 INNER CONNECTION
let ld10_perim = 360,
  ld10_scale = 1 / 2.5,
  ld10_radius = C.radius(ld10_perim * ld10_scale),
  ld10_start = ld8_start,
  ld10_end = ld9_end,
  ld10_width = (ld10_end - ld10_start) * ld10_scale - 1
ls.ld10 = logo.circle(C.X, C.Y, ld10_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: 2,
  strokeDasharray: [0, ld10_perim],
  transform: ['r' + ld10_start, C.X, C.Y],
})

// //  7 - 8 OUTER CONNECTION
let ld11_perim = 360,
  ld11_scale = 1 / 1.75,
  ld11_radius = C.radius(ld11_perim * ld11_scale),
  ld11_start = ld8_start,
  ld11_end = ld9_end,
  ld11_width = (ld11_end - ld11_start) * ld11_scale - 1
ls.ld11 = logo.circle(C.X, C.Y, ld11_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: 10,
  strokeDasharray: [0, ld11_perim],
  transform: ['r' + ld11_start, C.X, C.Y],
})

//  10 o'clock DASH
let ld12_perim = 360,
  ld12_radius = C.radius(ld12_perim),
  ld12_width = 12,
  ld12_end = 222,
  ld12_start = ld12_end - ld12_width + 1
ls.ld12 = logo.circle(C.X, C.Y, ld12_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
})

//  11 o'clock DASH
let ld13_perim = 360,
  ld13_radius = C.radius(ld13_perim),
  ld13_width = 12,
  ld13_end = ld12_end + (ld13_width * 1.5),
  ld13_start = ld13_end - ld13_width + 1
ls.ld13 = logo.circle(C.X, C.Y, ld13_radius).attr({
  fill: 'transparent',
  stroke: 'transparent',
})

//  10 - 11 CONNECTION
let ld14_perim = 360,
  ld14_scale = 3 / 4,
  ld14_radius = C.radius(ld14_perim * ld14_scale),
  ld14_start = ld12_start,
  ld14_end = ld13_end,
  ld14_width = (ld14_end - ld14_start) * ld14_scale - 1
ls.ld14 = logo.circle(C.X, C.Y, ld14_radius).attr({
  fill: 'transparent',
  stroke: C.ORANGE,
  strokeWidth: 4,
  strokeDasharray: [0, ld14_perim - 0],
  transform: ['r' + ld13_start, C.X, C.Y],
})





// ANIMATION CONFIG
const initAnim_timeout = 2000
const anim_expand1Dash_timeout = 200
const anim_expand3Dash_timeout = 400
const anim_expand1to3Dash_timeout = 100
const anim_expandNoonDash_timeout = 100
const anim_expand3to7Dash_timeout = 200
const anim_expand8Dash_timeout = 200
const anim_expand11Dash_timeout = 200
const anim_expand10Dash_timeout = 200

const initAnim = new Promise(function(resolve) {
  ls.lc1.attr({ fillOpacity: 1 })
  ls.lc2.animate({ r: 18, fillOpacity: 0.2 }, initAnim_timeout, C.TIMING)
  ls.lc1.animate({ r: 4 }, initAnim_timeout, C.TIMING, resolve)
})

const anim_expand1Dash = initAnim.then(function() {
  return new Promise(function(resolve) {
    Snap.animate(0, 205, function(val) {
      const width = val / 12
      const strokeWidth = C.radius(val) * 1.5
      ls.ld1.attr({
        r: C.radius(val),
        strokeWidth: strokeWidth,
        strokeDasharray: [width, val - width]
      })
    }, anim_expand1Dash_timeout, C.TIMING, resolve)
  })
})

const anim_expand3Dash = anim_expand1Dash.then(function() {
  return new Promise(function(resolve) {
    ls.ld2 = ls.ld1.clone()
    Snap.animate(0, ld3_width, function(val) {
      ls.ld3.attr({ strokeDasharray: [val, ld3_perim - val] })
    }, anim_expand3Dash_timeout, mina.bounce)
    // 1-3 inner connection
    Snap.animate(ld2_perim / 12, ld2_perim / 16, function(val) {
      ls.ld2.attr({ strokeDasharray: [val, ld2_perim - val] })
    }, anim_expand3Dash_timeout, mina.bounce)
    Snap.animate(-85, ld2_start, function(val) {
      ls.ld2.attr({ transform: ['r' + val, C.X, C.Y] })
    }, anim_expand3Dash_timeout, mina.bounce, resolve)
  })
})

const anim_expandNoonDash = anim_expand3Dash.then(function() {
  return new Promise(function(resolve) {
    // Noon dash
    ls.ld4.attr({ strokeDasharray: [ld4_width, ld4_perim - ld4_width] })

    Snap.animate(ld1_start, ld4_start, function(val) {
      ls.ld4.attr({ transform: ['r' + val, C.X, C.Y] })
      // Noon-1 connection
      ls.ld5.attr({ strokeDasharray: [10, ld5_perim - 10] })
      const deg = Math.abs(-275 + val) / 2
      ls.ld5.attr({ transform: ['r' + (ld5_start - deg), C.X, C.Y] })
    }, anim_expandNoonDash_timeout, C.TIMING, resolve)
  })
})

const anim_expand3to7Dash = anim_expand3Dash.then(function() {
  return new Promise(function(resolve) {
    // 7 o'clock dash
    ls.ld8 = ls.ld2.clone().attr({
      r: ld8_radius,
      strokeWidth: ld8_radius * 1.35,
      strokeDasharray: [ld8_width, ld8_perim - ld8_width],
    })
    Snap.animate(ld7_start, (ld7_end - ld8_width + 1), function(val) {
      // 3-7 long bottom dash
      ls.ld7.attr({ strokeDasharray: [val + 20, ld7_perim - val + 20] })
      ls.ld8.attr({ transform: ['r' + val, C.X, C.Y] })
    }, anim_expand3to7Dash_timeout, C.TIMING, resolve)
  })
})

const anim_expand8Dash = anim_expand3to7Dash.then(function() {
  return new Promise(function(resolve) {
    // 8 o'clock dash
    ls.ld9 = ls.ld8.clone()
    Snap.animate(ld8_start, ld9_start, function(val) {
      ls.ld9.attr({ transform: ['r' + val, C.X, C.Y] })
      const width = (val - ld8_start) / 2
      // 7-8 inner connection
      ls.ld10.attr({ strokeDasharray: [width, ld10_perim - width] })
      // 7-8 outer connection
      ls.ld11.attr({ strokeDasharray: [width * 1.5, ld10_perim - width * 1.5] })
    }, anim_expand8Dash_timeout, C.TIMING, resolve)
  })
})

const anim_expand11Dash = anim_expandNoonDash.then(function() {
  return new Promise(function(resolve) {
    // 11 o'clock dash
    ls.ld13 = ls.ld4.clone()
    ls.ld13.attr({ strokeDasharray: [ld13_width, ld13_perim - ld13_width] })
    Snap.animate(ld4_start, ld13_start, function(val) {
      ls.ld13.attr({ transform: ['r' + val, C.X, C.Y] })
    }, anim_expand11Dash_timeout, mina.bounce, resolve)
  })
})

const anim_expand10Dash = anim_expand11Dash.then(function() {
  return new Promise(function(resolve) {
    // 10 o'clock dash
    ls.ld12 = ls.ld4.clone()
    ls.ld12.attr({ strokeDasharray: [ld12_width, ld12_perim - ld12_width] })
    // 10-11 connection
    ls.ld14.attr({ strokeDasharray: [8.5, ld14_perim - 8.5] })
    Snap.animate(ld13_start, ld12_start, function(val) {
      ls.ld12.attr({ transform: ['r' + val, C.X, C.Y] })
      const deg = Math.abs(-229 + val) / 1.9
      ls.ld14.attr({ transform: ['r' + (ld13_start - deg), C.X, C.Y] })
    }, anim_expand10Dash_timeout, mina.bounce, resolve)
  })
})

const anim_expand1to3Dash = anim_expand11Dash.then(function() {
  return new Promise(function(resolve) {
    // 1-3 outer connection
    ls.ld6.attr({ stroke: C.ORANGE })
    Snap.animate(C.perimeter(ld3_radius / ld6_scale), ld6_perim, function(val) {
      const mod = (ld6_perim * val) / Math.pow(ld6_perim, 2) - 0.1
      const radius = C.radius(val * ld6_scale) - (ld6_stroke / 2) * 4
      const strokeDasharray = [ld6_width * mod, val - ld6_width * mod]
      ls.ld6.attr({ r: radius, strokeDasharray: strokeDasharray })
    }, anim_expand1to3Dash_timeout, C.TIMING, next)
  })
})

// LOGO GROUP
const ldg = logo.group(ls.lc1, ls.lc2, ls.ld1, ls.ld2, ls.ld3, ls.ld4, ls.ld5, ls.ld6,
  ls.ld7, ls.ld8, ls.ld9, ls.ld10, ls.ld11, ls.ld12, ls.ld13, ls.ld14)

// CIRCLE MASK
const l_mask = logo.circle(C.X, C.Y, C.radius(360)).attr({ fill: 'white' })
ldg.attr({ mask: l_mask })



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
// Rotate Phrases
// ——————————————————————————————————————————————————

const PHRASES = [
  'LiTl31',
  'Automation Engineering',
  'Future is Now',
]

const el = document.querySelector('h1')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(PHRASES[counter]).then(() => {
    setTimeout(next, 3000)
  })
  counter = (counter + 1) % PHRASES.length
}




function config() {
  return {
    X: 150,
    Y: 150,
    TIMING: bezier(0.5, 0, 0, 1, epsilon),
    ORANGE: '#FFA500',
    radius (perim) { return perim / (2 * Math.PI) },
    perimeter (radius) { return 2 * Math.PI * radius },
  }
}

function bezier (x1, y1, x2, y2) {
  const curveX = (t) => {
    const v = 1 - t
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t
  }
  const curveY = (t) => {
    const v = 1 - t
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t
  }
  const derivativeCurveX = (t) => {
    const v = 1 - t
    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2
  }
  return function(t) {
    let x = t,
      t0, t1, t2, x2, d2, i
    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = curveX(t2) - x
      if (Math.abs(x2) < epsilon) return curveY(t2)
      d2 = derivativeCurveX(t2)
      if (Math.abs(d2) < 1e-6) break
      t2 = t2 - x2 / d2
    }
    t0 = 0, t1 = 1, t2 = x
    if (t2 < t0) return curveY(t0)
    if (t2 > t1) return curveY(t1)
    // Fallback to the bisection method for reliability.
    while (t0 < t1) {
      x2 = curveX(t2)
      if (Math.abs(x2 - x) < epsilon) return curveY(t2)
      if (x > x2) t0 = t2
      else t1 = t2
      t2 = (t1 - t0) * 0.5 + t0
    }
    // Failure
    return curveY(t2)
  }
}
