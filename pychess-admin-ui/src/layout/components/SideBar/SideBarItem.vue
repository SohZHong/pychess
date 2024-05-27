<script lang="ts">
import { defineComponent, h, PropType, Component } from 'vue'
import { JSX } from 'vue/jsx-runtime'

interface MenuItemProps {
    icon?: Component,
    title?: string
}

export default defineComponent({
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: Object as PropType<Component>,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup (props: MenuItemProps) {
    return () => {
      const vnodes: JSX.Element[] = []
      const icon = props.icon
      const title = props.title

      vnodes.push(h('el-icon', { innerHTML: icon }))
      vnodes.push(h('span', { slot: 'title', title: title, innerHTML: title }))
    }
  }
})
</script>
