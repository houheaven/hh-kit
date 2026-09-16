
import type { FooterData } from "./hh-footer-types";
import wxQrcode from "../assets/wx-mp-houheaven.jpg";

// houheaven footer 数据
const hhFooterData: FooterData = {
  groups: [
    {
      title: "娱乐",
      links: [
        { label: "音乐 × 流毒", href: "http://music.houheaven.com" },
        { label: "电影 × 放映室", href: "http://movie.houheaven.com" },
        { label: "图片 × 玩世", href: "http://pic.houheaven.com" },
      ],
    },
    {
      title: "进击",
      links: [
        { label: "合作 × 后天堂工作室", href: "http://studio.houheaven.com" },
        { label: "摄影 × 摄影渣", href: "http://photo.houheaven.com" },
        { label: "技术 × 向上", href: "http://up.houheaven.com" },
      ],
    },
    {
      title: "作品",
      links: [
        { label: "框架 × hhframe", href: "http://plugin.houheaven.com/hhframe" },
        { label: "作品 × APP", href: "http://studio.houheaven.com/works/app" },
        { label: "作品 × 移动端", href: "http://studio.houheaven.com/works/mob" },
        { label: "作品 × 电脑端", href: "http://studio.houheaven.com/works/web" },
        { label: "作品 × 小程序", href: "http://studio.houheaven.com/works/wxapp" },
      ],
    },
    {
      title: "联系",
      links: [
        {
          label: "微信 × houheaven",
          type: "image-dialog",
          image: wxQrcode,
          text: "大爷儿，来玩啊",
        },
        { label: "微博 × houheaven", href: "http://weibo.com/houheaven" },
        { label: "Github × houheaven", href: "https://github.com/houheaven" },
      ],
    },
  ],
  copyright: `Copyright © 2012-${new Date().getFullYear()} houheaven. All rights reserved.`,
};

export default hhFooterData;
