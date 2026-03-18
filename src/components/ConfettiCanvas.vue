<template>
  <canvas ref="canvas" class="confetti-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let animId = null
let particles = []

const COLORS = ['#4f8ff7', '#38c9a7', '#f5a623', '#f25f5c', '#a78bfa', '#fbbf24']
const PARTICLE_COUNT = 100

function createParticle(w, h) {
  return {
    x: w * 0.5 + (Math.random() - 0.5) * w * 0.4,
    y: h * 0.4,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -16 - 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 7 + 3,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 12,
    gravity: 0.3 + Math.random() * 0.15,
    opacity: 1,
    decay: 0.004 + Math.random() * 0.006,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }
}

function draw(ctx, w, h) {
  ctx.clearRect(0, 0, w, h)
  let alive = false
  for (const p of particles) {
    if (p.opacity <= 0) continue
    alive = true
    p.vy += p.gravity
    p.x += p.vx
    p.y += p.vy
    p.rotation += p.rotationSpeed
    p.opacity -= p.decay
    p.vx *= 0.99
    ctx.save()
    ctx.globalAlpha = Math.max(0, p.opacity)
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rotation * Math.PI) / 180)
    ctx.fillStyle = p.color
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
  if (alive) {
    animId = requestAnimationFrame(() => draw(ctx, w, h))
  }
}

onMounted(() => {
  const c = canvas.value
  if (!c) return
  const parent = c.parentElement
  c.width = parent.offsetWidth || window.innerWidth
  c.height = parent.offsetHeight || 500
  const ctx = c.getContext('2d')
  particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(c.width, c.height))
  draw(ctx, c.width, c.height)
})

onBeforeUnmount(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
.confetti-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}
</style>
