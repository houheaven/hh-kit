
<template>
  <div class="hh-grids" :class="classes">
    <div class="hh-grids-item" v-for="(item, idx) in list" :key="idx">
      <slot name="item" v-bind="item" :index="idx"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ListItem = Record<string, any>;

  export default defineComponent({
    name: "hh-grids",
    props: {
      // 数据列表
      list: {
        type: Array as () => ListItem[],
        default: () => [],
      },
      // 默认所占列数
      span: {
        type: [String, Number],
        default: "",
      },
      // 手机所占列数
      phone: {
        type: [String, Number],
        default: "",
      },
      // 平板所占列数
      pad: {
        type: [String, Number],
        default: "",
      },
      // 窄屏电脑所占列数（1024-1280）
      pc: {
        type: [String, Number],
        default: "",
      },
      // 中屏电脑所占列数（1280-1680）
      md: {
        type: [String, Number],
        default: "",
      },
      // 宽屏电脑所占列数（1680+）
      // lg: {
      //   type: [String, Number],
      //   default: "",
      // },
    },
    computed: {
      classes(): string[] {
        const span = this.span !== "" ? `hh-grids-c${this.span}` : "";
        const phone = this.phone !== "" ? `hh-grids-phone-c${this.phone}` : "";
        const pad = this.pad !== "" ? `hh-grids-pad-c${this.pad}` : "";
        const pc = this.pc !== "" ? `hh-grids-pc-c${this.pc}` : "";
        const md = this.md !== "" ? `hh-grids-md-c${this.md}` : "";
        // const lg = this.lg !== "" ? `hh-grids-lg-c${this.lg}` : "";

        return [
          span,
          phone,
          pad,
          pc,
          md,
          // lg,
        ];
      },
    },
  });
</script>

<style lang="less">
  .ColsToPercent(@cols: 1, @nums: 1) {
    @val: (100 / @cols) * @nums * 1%;
    flex: 0 0 @val;
    max-width: @val;
  }
  .hh-grids {
    display: flex;
    flex-wrap: wrap;
  }
  .hh-grids-item {
    float: left;
    display: flex;
    margin: 0;
    padding: 0;
    .ColsToPercent(1);
    box-sizing: border-box;
    & > * {
      flex: 1;
    }
  }
  .hh-grids-c1 > * { .ColsToPercent(1); }
  .hh-grids-c2 > * { .ColsToPercent(2); }
  .hh-grids-c3 > * { .ColsToPercent(3); }
  .hh-grids-c4 > * { .ColsToPercent(4); }
  .hh-grids-c5 > * { .ColsToPercent(5); }
  .hh-grids-c6 > * { .ColsToPercent(6); }
  .hh-grids-c7 > * { .ColsToPercent(7); }
  .hh-grids-c8 > * { .ColsToPercent(8); }
  .hh-grids-c9 > * { .ColsToPercent(9); }
  .hh-grids-c10 > * { .ColsToPercent(10); }
  
  @media (max-width: 1681px) {
    .hh-grids-lg-c1 > * { .ColsToPercent(1); }
    .hh-grids-lg-c2 > * { .ColsToPercent(2); }
    .hh-grids-lg-c3 > * { .ColsToPercent(3); }
    .hh-grids-lg-c4 > * { .ColsToPercent(4); }
    .hh-grids-lg-c5 > * { .ColsToPercent(5); }
    .hh-grids-lg-c6 > * { .ColsToPercent(6); }
    .hh-grids-lg-c7 > * { .ColsToPercent(7); }
    .hh-grids-lg-c8 > * { .ColsToPercent(8); }
    .hh-grids-lg-c9 > * { .ColsToPercent(9); }
    .hh-grids-lg-c10 > * { .ColsToPercent(10); }
  }
  @media (max-width: 1680px) {
    .hh-grids-md-c1 > * { .ColsToPercent(1); }
    .hh-grids-md-c2 > * { .ColsToPercent(2); }
    .hh-grids-md-c3 > * { .ColsToPercent(3); }
    .hh-grids-md-c4 > * { .ColsToPercent(4); }
    .hh-grids-md-c5 > * { .ColsToPercent(5); }
    .hh-grids-md-c6 > * { .ColsToPercent(6); }
    .hh-grids-md-c7 > * { .ColsToPercent(7); }
    .hh-grids-md-c8 > * { .ColsToPercent(8); }
    .hh-grids-md-c9 > * { .ColsToPercent(9); }
    .hh-grids-md-c10 > * { .ColsToPercent(10); }
  }
  @media (max-width: 1280px) {
    .hh-grids-pc-c1 > * { .ColsToPercent(1); }
    .hh-grids-pc-c2 > * { .ColsToPercent(2); }
    .hh-grids-pc-c3 > * { .ColsToPercent(3); }
    .hh-grids-pc-c4 > * { .ColsToPercent(4); }
    .hh-grids-pc-c5 > * { .ColsToPercent(5); }
    .hh-grids-pc-c6 > * { .ColsToPercent(6); }
    .hh-grids-pc-c7 > * { .ColsToPercent(7); }
    .hh-grids-pc-c8 > * { .ColsToPercent(8); }
    .hh-grids-pc-c9 > * { .ColsToPercent(9); }
    .hh-grids-pc-c10 > * { .ColsToPercent(10); }
  }
  @media (max-width: 1024px) {
    .hh-grids-pad-c1 > * { .ColsToPercent(1); }
    .hh-grids-pad-c2 > * { .ColsToPercent(2); }
    .hh-grids-pad-c3 > * { .ColsToPercent(3); }
    .hh-grids-pad-c4 > * { .ColsToPercent(4); }
    .hh-grids-pad-c5 > * { .ColsToPercent(5); }
    .hh-grids-pad-c6 > * { .ColsToPercent(6); }
    .hh-grids-pad-c7 > * { .ColsToPercent(7); }
    .hh-grids-pad-c8 > * { .ColsToPercent(8); }
    .hh-grids-pad-c9 > * { .ColsToPercent(9); }
    .hh-grids-pad-c10 > * { .ColsToPercent(10); }
  }
  @media (max-width: 767px) {
    .hh-grids-phone-c1 > * { .ColsToPercent(1); }
    .hh-grids-phone-c2 > * { .ColsToPercent(2); }
    .hh-grids-phone-c3 > * { .ColsToPercent(3); }
    .hh-grids-phone-c4 > * { .ColsToPercent(4); }
    .hh-grids-phone-c5 > * { .ColsToPercent(5); }
    .hh-grids-phone-c6 > * { .ColsToPercent(6); }
    .hh-grids-phone-c7 > * { .ColsToPercent(7); }
    .hh-grids-phone-c8 > * { .ColsToPercent(8); }
    .hh-grids-phone-c9 > * { .ColsToPercent(9); }
    .hh-grids-phone-c10 > * { .ColsToPercent(10); }
  }
</style>
