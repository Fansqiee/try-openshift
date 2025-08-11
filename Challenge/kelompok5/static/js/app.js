(function(){
  // Theme toggle with localStorage
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'light') root.classList.add('light');
  btn?.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });

  // Typed text effect
  const typed = document.getElementById('typed');
  const lines = [
    '🚀 Siap dideploy di OpenShift / Docker.',
    '🎨 Desain minimalis, vibes lucu.',
    '🧩 Full static, cocok untuk Django collectstatic.'
  ];
  let li=0, ch=0, deleting=false;
  function type(){
    if(!typed) return;
    const curr = lines[li];
    typed.textContent = curr.slice(0, ch);
    if(!deleting && ch <= curr.length){ ch++; }
    else if(deleting && ch >= 0){ ch--; }
    if(ch === curr.length + 8){ deleting = true; }
    if(ch === 0 && deleting){ deleting = false; li = (li+1) % lines.length; }
    setTimeout(type, deleting ? 28 : 48);
  }
  type();

  // Click counter
  const counterEl = document.getElementById('counter');
  const counterBtn = document.getElementById('counterBtn');
  let count = Number(localStorage.getItem('clickCount') || 0);
  if(counterEl) counterEl.textContent = count;
  counterBtn?.addEventListener('click', () => {
    count += 1;
    localStorage.setItem('clickCount', String(count));
    if(counterEl) counterEl.textContent = count;
  });

  // Confetti (canvas particles)
  const canvas = document.getElementById('confetti');
  const btnConfetti = document.getElementById('confettiBtn');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const colors = ['#ffd166','#06d6a0','#118ab2','#ef476f','#8338ec','#3a86ff','#ff006e'];

    function resize(){
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function spawn(n=120){
      for(let i=0;i<n;i++){
        particles.push({
          x: W/2, y: H/3,
          r: Math.random()*6+3,
          vx: (Math.random()-0.5)*6,
          vy: Math.random()*-4-2,
          color: colors[(Math.random()*colors.length)|0],
          life: 120 + Math.random()*40,
          shape: Math.random() < .5 ? 'rect':'circle'
        });
      }
    }
    function step(){
      ctx.clearRect(0,0,W,H);
      particles = particles.filter(p => (p.life -= 1) > 0);
      for(const p of particles){
        p.vy += 0.08; // gravity
        p.x += p.vx;
        p.y += p.vy;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life/160);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        if(p.shape === 'rect'){
          ctx.rotate(p.life * 0.05);
          ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
        }else{
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI*2);
          ctx.fill();
        }
        ctx.restore();
      }
      requestAnimationFrame(step);
    }
    step();
    btnConfetti?.addEventListener('click', () => spawn(160));
  }

  // Year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
})();