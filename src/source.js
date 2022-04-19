import { fetchSource } from './utils';

export default function loadHtml(app) {
  // fetch(app.url).then((res) => {
  //   return res.text()
  // }).then((html) => {
  //   console.log('html:', html)
  // }).catch((e) => {
  //   console.error('加载html出错', e)
  // })
  fetchSource(app.url)
    .then((html) => {
      html = html
        .replace(/<head[^>]*>[\s\S]*?<\/head>/i, (match) => {
          // 将head标签替换为micro-app-head，因为web页面只允许有一个head标签
          return match
            .replace(/<head/i, "<micro-app-head")
            .replace(/<\/head>/i, "</micro-app-head>");
        })
        .replace(/<body[^>]*>[\s\S]*?<\/body>/i, (match) => {
          // 将body标签替换为micro-app-body，防止与基座应用的body标签重复导致的问题。
          return match
            .replace(/<body/i, "<micro-app-body")
            .replace(/<\/body>/i, "</micro-app-body>");
        });

      // 将html字符串转化为DOM结构
      const htmlDom = document.createElement("div");
      htmlDom.innerHTML = html;
      console.log("html:", htmlDom);

      // 进一步提取和处理js、css等静态资源
      // extractSourceDom(htmlDom, app);
    })
    .catch((e) => {
      console.error("加载html出错", e);
    });
}
