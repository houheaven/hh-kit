
import { defineComponent, h } from "vue";
import { icons } from "../index";
import type { IconName } from "../index";

const hhIcon = defineComponent({
  name: "hhIcon",
  props: {
    name: { type: String as () => IconName, required: true },
    size: { type: [Number, String], default: 24 },
  },
  setup(props) {
    return () => h("span", {
      style: { width: `${props.size}px`, height: `${props.size}px`, display: "inline-flex" },
      innerHtml: icons[props.name],
    });
  },
});

export default hhIcon;
