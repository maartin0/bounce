let duration_sec = 10;
let restitution = 0.7;
let acceleration_m_s = [0.5, 9.81];
let meter_pixel_scale = 1 / 50000;

let position = [0, 0];
let velocity = [0, 0];

let t_start = -1;
let last_t = -1;

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (vec, scalar) => [vec[0] * scalar, vec[1] * scalar];

function reset() {
  t_start = Date.now();
  last_t = t_start;
  t = 0;
  position = [0, 0];
  velocity = [0, 0];
}

function tick() {
  let t = (Date.now() - t_start) / 1000;
  if (position[0] * meter_pixel_scale >= window.innerWidth) reset();
  if (
    position[1] * meter_pixel_scale >= window.innerHeight * 0.9 &&
    velocity[1] > 0
  ) {
    velocity[1] = -1 * Math.abs(velocity[1]) * restitution;
  }
  let multiplier = 1 / (t - last_t);
  position = add(position, mul(velocity, multiplier));
  velocity = add(velocity, mul(acceleration_m_s, multiplier));
  updatePos(position);
  last_t = t;
  requestAnimationFrame(tick);
}

const ele = document.querySelector(".ball");
function updatePos(position) {
  const [x, y] = mul(position, meter_pixel_scale);
  console.log(position);
  ele.style.left = `${x}px`;
  ele.style.top = `${y}px`;
}

tick();
