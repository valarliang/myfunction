
function useLink(props) {
  const router = Vue.inject('router')
  function navigate(ev) {
    ev.preventDefault;
    router.push(props.to)
  }
  return {
    navigate
  }
}
export const RouterLink = {
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    }
  },
  setup(props,{slots}) {
    const link = useLink(props)
    return () => {
      return Vue.h('a', {href: 'javascript:;', onClick: link.navigate}, slots.default && slots.default())
    }
  }
}
