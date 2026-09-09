export default function Loading() {
  return (
    <div className="archive-loading" role="status" aria-label="Loading archive record">
      <div className="archive-loading-head"><span /><span /><span /></div>
      <div className="archive-loading-hero" />
      <div className="archive-loading-grid">
        <section><span /><span /><span /><span /></section>
        <aside><span /><span /><span /></aside>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
