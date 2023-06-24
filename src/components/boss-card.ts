import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles.ts';

type BossList = {
  name: string;
};

@customElement('boss-card')
export class BossCard extends LitElement {
  static styles = [
    sharedStyles,
    css`
      /* ---------CARD------------ */

      .image-part {
        width: 300px;

        height: 350px;

        /* z-index:1000; */
      }
      .image-part img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }

      .bottom-info-part {
        pointer-events: auto;
        box-sizing: border-box;
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        background-color: #fff;
        color: black;
        width: 340px;
        height: 140px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        position: relative;
      }

      .bottom-info-part::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 25%;
        backdrop-filter: blur(10px);
        z-index: -1;
      }

      .card-im {
        cursor: pointer;
        border-radius: 10px;
        position: relative;
      }

      .card {
        cursor: pointer;
        border-radius: 10px;
        margin-top: 1rem;
        transition: transform 0.2s ease-out;
      }

      .card:hover {
        transform: translateY(-10px);
        border-radius: 10px;
        z-index: 0;
      }
/* 
      .top-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        z-index: 1;
        color: white;
      } */

      .top-text h2 {
        position: absolute;
        top: 70%;
        padding: 1rem;
        font-size: 32px;
      }

      .top-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        z-index: 0;
        color: white;
        overflow: hidden;
      }

      .top-text::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15%;
        backdrop-filter: blur(5px);
        z-index: -1;
      }

      /* ----------- CARD END--------------- */
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.bossUrl = this.data?.component?.replace('.md', '');
  }

  @property({ type: { name: String } }) data = null;
  @property({ type: String }) bossUrl = null;

  render() {
  
    return html`
      <div
        class="card"
        @click=${() => {
          window.location.href = `/bloodborne/boss/${this.bossUrl}`;
        }}
      >
        <div class="card-im">
          <div class="top-text">
            <h2 style="position:absolute;top:76%;padding:1rem;font-size:20px;">
              ${this.data?.data.name}
            </h2>
          </div>

          <!-- ----------- Image part --------- -->

          <div class="image-part">
            <img height="340" src="${this.data?.data.image}" alt="Image" />
          </div>
        </div>


      </div>
    `;
  }
}
