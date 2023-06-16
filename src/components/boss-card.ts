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
        width: 340px;

        height: 340px;
      }
      .image-part img {
        width: 100%;
        height: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
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
      }
      .avatar {
        border-radius: 50%;
        width: 22px;
        height: 22px;
      }
      .owner-display {
        display: flex;
        gap: 5px;
        margin-top: 3px;
        z-index: 50;
      }
      .address-style {
        font-size: 15px;
        font-family: 'Suisse', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 800;
        color: #6e6e6e;
        margin-top: 1px;
      }
      .bottom-container {
        padding-top: 0.5rem;
        padding-bottom: 1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .crypto-text {
        font-size: 23px;
        font-family: 'Suisse', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 800;
        color: #6e6e6e;
      }
      .card-im {
        cursor: pointer;
        border-radius: 10px;
        position: relative;
      }
      .card {
        cursor: pointer;
        border-radius: 10px;
        /* position: relative; */
        transition: transform 0.2s ease-out;
      }
      .card:hover {
        transform: translateY(-10px);

        border-radius: 10px;
        z-index: 0;
      }

      .card:hover .top-text {
        display: flex;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }
      .card::before {
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background-color: rgba(0, 0, 0, 0.7); */
        opacity: 0;
        transition: opacity 0.2s ease-out;
      }
      .card:hover::before {
        opacity: 1;
      }
      .top-text {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        z-index: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
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
    console.log('data', this.data);
    return html`
    
      <div class="card" @click=${()=>{window.location.href=`/bloodborne/boss/${this.bossUrl}`}}>
        <div class="card-im">
          <div class="top-text">
            <h2 style="position:absolute;top:65%;padding:1rem;left:5%;">
              ${this.data?.data.name}
            </h2>
          </div>

          <!-- ----------- Image part --------- -->

          <div class="image-part">
            <img width="340" height="340" src="${this.data?.data.image}" alt="Image" />
          </div>
        </div>

        <!-- ----------- Image part end --------- -->
        <!-- -------------- Bottom card part ---------------- -->

        <div class="bottom-info-part" @click=${() => {}}>
          <!-- -------------- Top owner part ---------------- -->

          <div class="owner-display" href="">
            <div>
              <img src="/cleric_beast.jpg" class="avatar" alt="Avatar" />
            </div>
            <div class="address-style">@father</div>
          </div>

          <!-- -------------- Top owner part end ---------------- -->

          <div style="display:flex;">
            <div class="address-style" style="margin-top:0.7rem;">
              <!-- Price -->
              Buy Now
            </div>
          </div>

          <div class="bottom-container">
            <div class="crypto-text">0 MATIC</div>
          </div>
        </div>

        <!-- -------------- Bottom card part end---------------- -->
      </div>
     
    `;
  }
}
