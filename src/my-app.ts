import { bossList } from './bossList.ts';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './components/boss-card';
import { sharedStyles } from './styles.ts';
import { map } from 'lit/directives/map.js';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-app')
export class MyApp extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
      img {
        max-width: 100%;
        height: auto;
      }

      .main-container {
        gap: 10px;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
      }

      @media (min-width: 768px) {
        img {
        max-width: 100%;
        height: 300px;
      }
      }
    `,
  ];
  /**
   * Copy for the read the docs hint.
   */
  // @property()
  // docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  @property({ type: String })
  path = '';

  @property({ type: Array })
  bossList = [];

  async connectedCallback() {
    super.connectedCallback();

  }

  render() {
    return html`
      <div class="flexw flexr main-container">
        <img  src="/bloodbornebanner.png" alt="Image" />
        <h2 style=" font-size: 24px;font-weight: bold;">
          A simple strategy guide to defeat Bloodborne bosses
        </h2>
      </div>
      <div class="flexw flexr main-container">
        ${map(bossList, (boss) => {
          return html`<boss-card .data=${boss} ></boss-card>`;
        })}

        <!-- <boss-card></boss-card> -->
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}
