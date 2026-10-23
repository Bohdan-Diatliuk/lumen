import type { Directive } from 'vue'

// One shared observer: adds `is-visible` the first time an element enters the viewport
const observer = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
        }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
)

// Usage: v-reveal or v-reveal="150" (delay in ms, handy for staggering lists)
export const vReveal: Directive<HTMLElement, number | undefined> = {
    mounted(el, { value }) {
        el.classList.add('reveal')
        if (value) el.style.setProperty('--reveal-delay', `${value}ms`)
        observer.observe(el)
    },
    unmounted(el) {
        observer.unobserve(el)
    },
}
