import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import { router } from '..';

type Metadata = {
  [key: string]: string;
  title: string;
};

// marked.use({
//     async: true,
//     pedantic: false,
//     gfm: true,
//   });

@customElement('boss-page')
export class BossPage extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        margin: 0 0;
        max-width: 1400px;
        color: white;
      }

      .content-box {
        width: 100%;
        margin: 0 auto; /* add this line to center the div */
        display: flex;
        /* justify-content: center; */
        /* align-items: center; */
        flex-direction: column;
        padding: 40px;

        border-radius: 10px;
      }
      .bottom-bar {
        width: 80%;
        padding-top: 30px;
        justify-content: center;
        align-items: center;
        display: flex;
        gap: 25px;
        border-top: solid 1px black; /* add this line to set a 1px black border */
      }

      .inner-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        padding: 1.5rem;
      }

      .blog-content {
        font-size: 20px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
      }
      .breadcrumb-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
      }

      @media (max-width: 768px) {
        .blog-content {
          font-size: 40px;
        }
      }
    `,
  ];

  async fetchMarkdownFile(url: string) {
    try {
      const response = await fetch(`/data/${url}`);

      if (response.status === 200) return response;
    } catch (e) {
      console.warn(e);
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  @property({ type: String }) title = '';
  @property({ type: String }) content = '';
  @property({ type: Boolean }) fetching = false;

  fetchMetadata(data: string) {
    const matches = data.split('---');
    const metadata: Metadata = {
      title: '',
    };
    matches[1]
      .trim()
      .split('\n')
      .forEach((line) => {
        const [key, value] = line.split(':').map((x) => x.trim());
        if (key === 'date') {
          metadata[key] = value.substring(1, 11);
        } else if (key === 'title') {
          metadata[key] = value.replace(/"/g, '');
        } else {
          metadata[key] = value;
        }
      });

    const content = matches.slice(2).join('---').trim();
    return { ...metadata, content };
  }

  async fetchData() {
    const bossUrl = router.location.params.bossUrl.toString();

    try {
      const response = await this.fetchMarkdownFile(bossUrl);
      const data: string = await response?.text()!;

      const { content, ...metadata } = this.fetchMetadata(data);

      this.title = metadata?.title;

      this.content = marked(content);
    } catch (ex) {
      console.error('Failed loading md: ', ex);
    }
  }
  // <h1 style="font-size:45px;">${this.title}</h1>
  // <p style="font-size:20px;">${unsafeHTML(this.content)}</p>
  render() {
    return html`
      <div class=${`content-box`}>
        <div style="display:flex; gap:20px; font-size:17px;">
          <div>
            <p><a href="/bloodborne-blog">Home</a></p>
          </div>
          <div class="breadcrumb-arrow">
            <mwc-icon
              ><svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  fill="currentColor"
                ></path>
              </svg>
            </mwc-icon>
          </div>
          <!-- <div>
            <p><a id="blog" href="/">BloodBorne Gallery</a></p>
          </div>
          <div class="breadcrumb-arrow" style="margin-top:3px;">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                fill="currentColor"
              ></path>
            </svg>
          </div> -->
          <div><p>${this.title}</p></div>
        </div>
        <div class="inner-box">
          <h1 style="font-size:45px;">${this.title}</h1>
          <div class="blog-content">${unsafeHTML(this.content)}</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'boss-page': BossPage;
  }
}
