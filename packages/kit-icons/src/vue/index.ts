import { defineComponent, h } from 'vue'
import { icons, type IconName } from '../index'

export const HhIcon = defineComponent({
  name: 'HhIcon',
  props: {
    name: { type: String as () => IconName, required: true },
    size: { type: [Number, String], default: 24 },
  },
  setup(props) {
    return () =>
      h('span', {
        style: { width: `${props.size}px`, height: `${props.size}px`, display: 'inline-flex' },
        innerHTML: icons[props.name],
      })
  },
})
