
<template>
  <div class="hh-menu">
    <div v-for="(group, key) in list" :key="key">
      <h2 class="title">{{ group.title }}</h2>
      <hh-grids
        class="list"
        :class="group.cate"
        :list="group.list"
        span="6"
        md="5"
        pc="4"
        pad="3"
        phone="2"
      >
        <template v-slot:item="item">
          <a class="item" :href="item.url" target="_blank" v-if="group.cate === 'link'">
            <p>{{ item.title }}</p>
            <span v-if="item.descp">{{ item.descp }}</span>
          </a>
          <a class="item" :href="item.url" v-else-if="group.cate === 'html'">
            <p>{{ item.title }}</p>
            <span v-if="item.descp">{{ item.descp }}</span>
          </a>
          <div class="item" @click="route(item)" v-else>
            <p>{{ item.title }}</p>
            <span v-if="item.descp">{{ item.descp }}</span>
          </div>
        </template>
      </hh-grids>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import hhGrids from "../hh-grids";

  interface TsMenuListItem {
    title: string;
    descp: string;
    url?: string;
    path?: string;
  }
  type TsMenu = Record<string, {
    title: string;
    cate?: "link" | "html" | "todo";
    list: TsMenuListItem[];
  }>;

  export default defineComponent({
    name: "hh-menu",
    components: {
      hhGrids,
    },
    props: {
      list: {
        type: Object as () => TsMenu,
        default: () => ({}),
      },
    },
    methods: {
      async route(item: TsMenuListItem) {
        if (item.path) {
          await this.$router.push(item.path);
        }
      },
    },
  });
</script>

<style lang="less" scoped>
  .hh-menu {
    .title {
      margin-top: 15px;
      font-size: 18px;
      line-height: 1em;
    }
    .list {
      margin: 10px -10px;
      .item {
        display: block;
        margin: 10px;
        padding: 25px;
        line-height: 1.6em;
        background: #fff;
        border-radius: 10px;
        cursor: pointer;
        p {
          font-size: 16px;
          color: #44b549;
          word-break: break-all;
        }
        span {
          display: block;
          margin-top: 5px;
          font-size: 14px;
          color: #bbb;
        }
      }
      // 链接
      &.link {
        .item {
          p {
            color: #468bff;
          }
        }
      }
      // 待做
      &.todo {
        .item {
          border: 1px solid #ffb4b4;
          background-color: #fff1f1;
          p {
            color: #f77;
          }
        }
      }
    }
  }
</style>
