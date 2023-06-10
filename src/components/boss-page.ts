import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';

type Metadata = {
    [key:string] : string;
    title:string;
    
}



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
        margin:5rem 0;
        max-width:1400px;
      
      }

      .content-box {
        width: 75%;
        margin: auto; /* add this line to center the div */
        display: flex;
        justify-content: center;
        align-items: center;
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
    `,
  ];


  async fetchMarkdownFile(url:string) {
    try {
      const response = await fetch(
        `/data/${url}`
      )

      console.log('response', response)
      if (response.status === 200) return response

  

    } catch (e) {
      console.warn(e)
    }
  }




async connectedCallback() {
    super.connectedCallback();
    console.log('this.bossUrl', this.bossUrl)

    this.fetchData()
    
  }
  

@property({ type: String }) title = '' 
@property({ type: String }) content = ''
@property({ type: Boolean }) fetching = false
@property({ type: String }) bossUrl = null
@property({ type: String }) bossData = null


  fetchMetadata(data:string) {
    const matches = data.split('---')
    const metadata:Metadata = {
        title: ''
    }
    matches[1]
      .trim()
      .split('\n')
      .forEach((line) => {
        const [key, value] = line.split(':').map((x) => x.trim())
        if (key === 'date') {
          metadata[key] = value.substring(1, 11) 
        } else if (key === 'title') {
          metadata[key] = value.replace(/"/g, '') 
        } else {
          metadata[key] = value
        }
      })

    const content = matches.slice(2).join('---').trim()
    return { ...metadata, content }
  }


  async fetchData() {


    try {
      const response = await this.fetchMarkdownFile(this.bossUrl as unknown as string)
      const data:string = await response?.text()!
      
      const { content, ...metadata } = await this.fetchMetadata(data)
      console.log('metadata: ', metadata)
        
      this.title = metadata?.title

      this.content = marked(content)

    } catch (ex) {
      console.error('Failed loading md: ', ex)

    }

  }


  render() {
    console.log('this.bossData', this.bossData)
    console.log('this.bossUrl', this.bossUrl)
    return html`
      <div class=${`content-box`}>
        <div>
          <div>
            <div style="display:flex; gap:20px; font-size:17px;">
              <div>
                <p><a href="/">Home</a></p>
              </div>
              <div style="display:flex;justify-content:center;align-items:center;">
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
              <div>
                <p><a id="blog" href="/">BloodBorne Gallery</a></p>
              </div>
              <div style="display:flex;justify-content:center;align-items:center;">
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
                
              </div>
              <div><p>${this.title}</p></div>
            </div>
          </div>
          <div style="display:flex; ">
            <!-- <img
              style="width:80px; padding-right:10px;"
              src="/images/icon-512x512.png"
            /> -->
            <!-- <div style="display:flex; gap:20px; margin-top:20px;">
              <p></p>
             
            </div> -->
          </div>

          <h1 style="font-size:45px;">${this.title}</h1>
          <p style="font-size:20px;">${unsafeHTML(this.content)}</p>
        </div>
        <div class="bottom-bar">
       


       
        

      
       
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'boss-page': BossPage;
  }
}
