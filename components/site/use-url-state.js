'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// O estado de uma vista vive na URL, não só na memória do componente.
//
// A regra que isto serve: o leitor nunca deve perder contexto. Se filtrou a
// garagem por classe e fabricante, abriu um veículo e voltou atrás, tem de
// encontrar exactamente a mesma vista — e tem de conseguir mandar aquele
// endereço a outra pessoa e ela ver o mesmo. Com o estado só em `useState`,
// nenhuma das duas coisas acontece: voltar atrás devolve a lista inteira por
// ordem alfabética, e partilhar um endereço partilha a vista de ninguém.
//
// Três decisões que não são óbvias:
//
// 1. Lê-se a URL depois de montar, não durante a renderização. O HTML servido
//    tem de ser o mesmo que o servidor produziu, senão a hidratação diverge.
//    O estado inicial são sempre os valores por omissão.
//
// 2. Escreve-se com `replaceState` e não `pushState`. Cada tecla numa caixa de
//    pesquisa não merece uma entrada no histórico — o botão «voltar» ficaria
//    entupido a desfazer letras. O contexto sobrevive à mesma, porque o
//    endereço da listagem já leva os filtros quando o leitor salta para uma
//    ficha: voltar traz de volta essa URL, filtros incluídos.
//
// 3. Um valor igual ao de omissão sai da URL. Assim `/database/vehicles` é o
//    endereço limpo da vista limpa, e não `?cls=all&maker=all&sort=name&q=`.
//
// Devolve `[estado, definir]`. `definir` aceita um objecto parcial.
export function useUrlState(omissoes) {
  const [estado, setEstado] = useState(omissoes)

  // Guardadas em ref para `definir` poder ser estável: se dependesse dos
  // objectos, mudava a cada renderização e reiniciava os efeitos de quem o usa.
  const omissoesRef = useRef(omissoes)
  const estadoRef = useRef(estado)
  estadoRef.current = estado

  useEffect(() => {
    const lerDaUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const seguinte = { ...omissoesRef.current }
      for (const chave of Object.keys(omissoesRef.current)) {
        const valor = params.get(chave)
        if (valor != null) seguinte[chave] = valor
      }
      setEstado(seguinte)
    }

    lerDaUrl()
    // «Voltar» e «avançar» do browser mudam a query sem remontar o
    // componente: sem isto, o endereço mudava e a vista ficava na mesma.
    window.addEventListener('popstate', lerDaUrl)
    return () => window.removeEventListener('popstate', lerDaUrl)
  }, [])

  const definir = useCallback((parcial) => {
    const seguinte = { ...estadoRef.current, ...parcial }
    estadoRef.current = seguinte
    setEstado(seguinte)

    const params = new URLSearchParams(window.location.search)
    for (const [chave, valor] of Object.entries(seguinte)) {
      if (valor === omissoesRef.current[chave] || valor === '' || valor == null) params.delete(chave)
      else params.set(chave, String(valor))
    }
    const query = params.toString()
    window.history.replaceState(null, '', query ? `${window.location.pathname}?${query}` : window.location.pathname)
  }, [])

  return [estado, definir]
}

// Fecha um painel sobreposto como o resto do sítio já o faz: Escape fecha, o
// fundo deixa de rolar por baixo dele, e ao fechar o foco volta ao botão que o
// abriu — senão quem navega por teclado é despejado no início da página.
//
// O padrão já existia na pesquisa global e na barra de separadores; o que
// faltava era estar disponível para os painéis das listagens, que o não tinham.
export function usePainelSobreposto(aberto, fechar) {
  const focoAnterior = useRef(null)

  useEffect(() => {
    if (!aberto) return undefined

    focoAnterior.current = document.activeElement
    const scrollAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') { evento.preventDefault(); fechar() }
    }
    window.addEventListener('keydown', aoTeclar)

    return () => {
      window.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = scrollAnterior
      // `focus` pode falhar se o elemento entretanto saiu do documento.
      try { focoAnterior.current?.focus?.() } catch { /* o painel fechou na mesma */ }
    }
  }, [aberto, fechar])
}
