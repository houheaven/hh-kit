
<template>
  <div class="hh-footer" :class="`hh-footer-grids-${currentGroups.length}`">
    <div class="hh-footer-content">
      <div class="hh-footer-links-container">
        <div class="hh-footer-links" v-for="(group, gIdx) in currentGroups" :key="gIdx">
          <h3 class="hh-footer-links-title">{{ group.title }}</h3>
          <ul class="hh-footer-links-list">
            <li class="hh-footer-links-item" v-for="(link, lIdx) in group.links" :key="lIdx">
              <template v-if="isImageDialogLink(link)">
                <a href="javascript:;" @click.prevent="openImageDialog(link)">{{ link.label }}</a>
              </template>
              <template v-else>
                <a :href="link.href" :target="link.external === false ? undefined : '_blank'">{{ link.label }}</a>
              </template>
            </li>
          </ul>
        </div>
      </div>
      <p class="hh-footer-copyright">{{ currentCopyright }}</p>
    </div>
  </div>

  <hh-image-dialog
    v-model="dialogVisible"
    :image="dialogImage"
    :text="dialogText"
  />
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import hhFooterData from "@houheaven/kit-assets/data/hh-footer-data";
  import type { FooterGroup, FooterLink, FooterLinkImageDialog } from "@houheaven/kit-assets/data/hh-footer-types";
  import hhImageDialog from "../hh-image-dialog/hh-image-dialog.vue";

  interface IfFooterProps {
    // 分组导航数据
    groups?: FooterGroup[];
    // 底部版权文字
    copyright?: string;
    // 开启后直接使用 houheaven 默认数据，优先级高于其它 props
    useHouheavenData?: boolean;
  }

  const props = withDefaults(defineProps<IfFooterProps>(), {
    groups: () => [],
    copyright: "",
    useHouheavenData: false,
  });

  defineOptions({ name: "hh-footer" });

  // useHouheavenData 优先级最高：开启后所有字段一律取 houheaven 内置数据
  const currentGroups = computed<FooterGroup[]>(() => (props.useHouheavenData ? hhFooterData.groups : props.groups));
  const currentCopyright = computed(() => (props.useHouheavenData ? hhFooterData.copyright : props.copyright));

  // 图片弹窗状态
  const dialogVisible = ref(false);
  const dialogImage = ref("");
  const dialogText = ref("");

  // 类型守卫:配合模板中 v-if 触发 TS 类型收窄
  function isImageDialogLink(link: FooterLink): link is FooterLinkImageDialog {
    return link.type === "image-dialog";
  }

  function openImageDialog(link: FooterLinkImageDialog): void {
    dialogImage.value = link.image;
    dialogText.value = link.text ?? "";
    dialogVisible.value = true;
  }
</script>

<style lang="less">
  .hh-footer {
    --content-width: 750px;
    --grid-columns: 4;
    --grid-gap: 40px;

    left: 0;
    bottom: 0;
    width: 100%;
    background: #2a2d33;
    padding: 40px 0 30px;

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    &-grids-3 {
      --content-width: 560px;
      --grid-columns: 3;
    }
    &-grids-2 {
      --content-width: 360px;
      --grid-columns: 2;
    }
    &-grids-1 {
      --content-width: 200px;
      --grid-columns: 1;
    }

    &-content {
      width: var(--content-width);
      margin: auto;
      border: 0px solid #f00;
    }
    &-links-container {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns), 1fr);
      gap: var(--grid-gap);
    }
    &-links {
      box-sizing: border-box;
      border: 0px solid #f00;
      &-title {
        font: 15px/1.7em "微软雅黑";
        color: #818692;
      }
      &-item {
        list-style-position: outside;
        list-style-type: none;
      }
      a {
        display: inline-block;
        font: 13px/1.6em "微软雅黑";
        color: #fff;
        transition: all 0.2s ease 0s;
        text-decoration: none;
        outline: none;

        &:hover {
          color: #47c1f4;
        }
      }
    }
    &-copyright {
      font: 13px/20px "微软雅黑";
      color: #818692;
      text-align: center;
      padding-top: 30px;
      clear: both;
    }

    @media (max-width: 719px) {
      & {
        --content-width: 80%;
        --grid-columns: 2;
        --grid-gap: 0;
        padding: 30px 0;
      }
      &-links {
        margin: 10px 0;
      }
      &-copyright {
        padding-top: 15px;
      }
    }
  }
</style>
