// Esqueleto de carregamento dos índices do arquivo.
//
// Vive aqui, e não num `app/loading.js` na raiz, por uma razão medida: um
// `loading.js` cria uma fronteira de Suspense sobre tudo o que está abaixo
// dele. O Next transmite o shell mal a fronteira existe, o estado HTTP 200
// sai com esse primeiro pedaço, e um `notFound()` lançado depois já só
// consegue trocar o conteúdo — nunca o estado. Com o esqueleto na raiz, cada
// ficha inexistente respondia 200 com o corpo do 404, e os rastreadores
// indexavam gralhas de endereço como se fossem registos.
//
// Por isso este esqueleto só é montado em segmentos que não têm fichas por
// baixo. Nas fichas, a resposta espera pelo servidor e devolve o estado certo.
export default function ArchiveLoading() {
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
