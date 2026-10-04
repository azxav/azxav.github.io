const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`;

const FRAG = `precision mediump float;
uniform vec2 uRes;
uniform vec2 uPointer;
uniform float uTime;
uniform float uDark;
uniform float uActive;
float hash(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031);
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 d=uv-uPointer;
  float pull=exp(-dot(d,d)*16.0)*uActive;
  vec2 p=uv+d*pull*0.045;
  float structure=smoothstep(0.2,0.9,p.x);
  float wave=sin(p.x*7.2-uTime*0.28)*0.03;
  float spine=0.28+p.x*0.5+wave;
  float band=exp(-pow((p.y-spine)/mix(0.2,0.05,structure),2.0));
  float scale=mix(10.0,18.0,structure);
  vec2 gv=vec2(p.x*(uRes.x/uRes.y),p.y)*scale;
  vec2 id=floor(gv);
  vec2 f=fract(gv);
  float n=hash(id);
  float n2=hash(id+17.2);
  float tick=floor(uTime*4.0);
  float tw=hash(id+tick);
  vec2 jitter=(vec2(n,n2)-0.5)*mix(0.75,0.03,structure);
  float rad=mix(0.15,0.08,structure);
  float speck=smoothstep(rad,rad*0.25,length(f-0.5-jitter*0.45));
  float gate=mix(0.93,0.7,band)-pull*0.16;
  float on=step(gate,tw);
  float alpha=speck*on*mix(0.16,0.48,band);
  alpha*=smoothstep(0.96,0.58,p.y);
  vec3 col=mix(vec3(0.07,0.07,0.065),vec3(0.93,0.92,0.89),uDark);
  gl_FragColor=vec4(col,alpha);
}`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function darkTheme(): boolean {
  return document.documentElement.dataset.theme === "dark";
}

function syncFallback(img: HTMLImageElement | null): void {
  if (!img) return;
  const next = darkTheme() ? img.dataset.dark : img.dataset.light;
  if (next && img.getAttribute("src") !== next) img.src = next;
}

export function mountGrain(): void {
  const root = document.querySelector<HTMLElement>("[data-grain]");
  if (!root) return;
  const canvas = root.querySelector<HTMLCanvasElement>("[data-grain-canvas]");
  const img = root.querySelector<HTMLImageElement>("[data-grain-fallback]");
  if (!canvas) return;

  syncFallback(img);
  const themeObserver = new MutationObserver(() => syncFallback(img));
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    root.dataset.mode = "static";
    return;
  }

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    root.dataset.mode = "static";
    return;
  }

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) {
    root.dataset.mode = "static";
    return;
  }

  const program = gl.createProgram();
  if (!program) {
    root.dataset.mode = "static";
    return;
  }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, "a");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    root.dataset.mode = "static";
    return;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const uRes = gl.getUniformLocation(program, "uRes");
  const uPointer = gl.getUniformLocation(program, "uPointer");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uDark = gl.getUniformLocation(program, "uDark");
  const uActive = gl.getUniformLocation(program, "uActive");

  gl.useProgram(program);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  let tx = 0.35;
  let ty = 0.4;
  let px = tx;
  let py = ty;
  let targetActive = 0;
  let active = 0;
  let visible = true;
  let raf = 0;
  let last = 0;
  const t0 = performance.now();

  const resize = (): void => {
    const rect = root.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    let w = Math.max(1, Math.floor(rect.width * dpr));
    let h = Math.max(1, Math.floor(rect.height * dpr));
    const maxEdge = 1280;
    const scale = Math.min(1, maxEdge / Math.max(w, h));
    w = Math.max(1, Math.floor(w * scale));
    h = Math.max(1, Math.floor(h * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  const draw = (now: number): void => {
    px += (tx - px) * 0.08;
    py += (ty - py) * 0.08;
    active += (targetActive - active) * 0.08;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform2f(uPointer, px, py);
    gl.uniform1f(uTime, (now - t0) / 1000);
    gl.uniform1f(uDark, darkTheme() ? 1 : 0);
    gl.uniform1f(uActive, active);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const stop = (): void => {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const loop = (now: number): void => {
    raf = requestAnimationFrame(loop);
    if (document.hidden || !visible) {
      stop();
      return;
    }
    if (now - last < 42) return;
    last = now;
    draw(now);
  };

  const start = (): void => {
    if (raf || document.hidden || !visible) return;
    raf = requestAnimationFrame(loop);
  };

  const place = (clientX: number, clientY: number): void => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    tx = (clientX - rect.left) / rect.width;
    ty = 1 - (clientY - rect.top) / rect.height;
    targetActive = 1;
  };

  window.addEventListener("pointermove", (event) => place(event.clientX, event.clientY), {
    passive: true,
  });
  window.addEventListener("pointerleave", () => {
    targetActive = 0;
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) start();
    else stop();
  });
  observer.observe(root);

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(root);

  root.dataset.mode = "live";
  resize();
  start();
}
