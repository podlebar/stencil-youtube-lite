import { Element, Method, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'lite-youtube',
  styleUrl: 'lite.css'
})
export class Lite {
  @Prop() dataVideoid: string;
  @Element() el: HTMLElement;

  private posterUrl: string = `https://i.ytimg.com/vi/${this.dataVideoid}/hqdefault.jpg`;
  private preconnected: boolean = false

  connectedCallback() {
    const playBtn = document.createElement('div');
    this.el.style.backgroundImage = `url("${this.posterUrl}")`;
    playBtn.classList.add('lty-playbtn');
    this.el.append(playBtn);
    this.el.addEventListener('pointerover', this.warmConnections, { once: true });
    this.el.addEventListener('click', () => this.addIframe());
  }

  warmConnections() {
    if (this.preconnected) return;
    this.addPrefetch('preload', this.posterUrl, 'image');
    this.addPrefetch('preconnect', 'https://www.youtube.com');
    this.addPrefetch('preconnect', 'https://www.google.com');
    this.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
    this.addPrefetch('preconnect', 'https://static.doubleclick.net');
    this.preconnected = true;
  }

  @Method()
  async addPrefetch(kind, url, as = '') {
    const linkElem = document.createElement('link');
    linkElem.rel = kind;
    linkElem.href = url;
    if (as != '') {
      linkElem.as = as;
    }
    linkElem.crossOrigin = 'anonymous';
    document.head.append(linkElem);
  }

  addIframe() {
    const escapedVideoId = encodeURIComponent(this.dataVideoid);
    const iframeHTML = `
      <iframe width="560" height="315" frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        src="https://www.youtube.com/embed/${escapedVideoId}?autoplay=1"
      ></iframe>`;
    this.el.insertAdjacentHTML('beforeend', iframeHTML);
    this.el.classList.add('lyt-activated');
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
