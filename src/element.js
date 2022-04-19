// https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements
// connectedCallback：当 custom element首次被插入文档DOM时，被调用。
// disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
// adoptedCallback：当 custom element被移动到新的文档时，被调用。
// attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。
import CreateApp, { appInstanceMap } from './app'

class MyElement extends HTMLElement {

  // 声明需要监听的属性名，只有这些属性变化时才会触发attributeChangedCallback
  static get observedAttributes () {
    return ['name', 'url']
  }

  constructor() {
    console.log('>>>>>')
    super();
  }

  connectedCallback() {
    // 元素被插入到DOM时执行，此时去加载子应用的静态资源并渲染
    console.log('micro-app is connected', this.getAttribute)
    // 创建微应用实例
    const app = new CreateApp({
      name: this.name,
      url: this.url,
      container: this,
    })

    // 记入缓存，用于后续功能
    appInstanceMap.set(this.name, app);
  }

  disconnectedCallback () {
    // 元素从DOM中删除时执行，此时进行一些卸载操作
    console.log('micro-app has disconnected')
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    // 元素属性发生变化时执行，可以获取name、url等属性的值
    console.log(`attribute ${attrName}: ${newVal}`)
    if (attrName === 'name' && !this.name && newVal) {
      this.name = newVal
    } else if (attrName === 'url' && !this.url && newVal) {
      this.url = newVal
    }
  }
}

// customElements.define('micro-app', MyElement);
export function defineElement() {
  /**
   * 注册元素
   * 注册后，就可以像普通元素一样使用micro-app，当micro-app元素被插入或删除DOM时即可触发相应的生命周期函数。
   */
  if (!window.customElements.get("micro-app")) {
    window.customElements.define("micro-app", MyElement);
  }
}
