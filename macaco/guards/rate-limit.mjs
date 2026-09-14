// The Macaco runs against production, so it paces itself: a minimum gap
// between actions and a ceiling per minute. Real visitors never notice it.
export class RateLimiter {
  constructor({ minDelayMs = 250, maxPerMinute = 120 } = {}) {
    this.minDelayMs = minDelayMs
    this.maxPerMinute = maxPerMinute
    this.stamps = []
    this.last = 0
  }

  async wait() {
    const now = Date.now()
    const gap = this.last + this.minDelayMs - now
    if (gap > 0) await sleep(gap)
    this.stamps = this.stamps.filter((t) => Date.now() - t < 60000)
    if (this.stamps.length >= this.maxPerMinute) {
      await sleep(60000 - (Date.now() - this.stamps[0]) + 10)
    }
    this.last = Date.now()
    this.stamps.push(this.last)
  }
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
