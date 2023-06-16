import { bossList } from './../public/data/index';
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

      .main-container {
        gap:10px; 
         display: flex;
        flex-wrap: wrap;
        margin :0 auto;
        justify-content: center;
         align-items: center;"
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
    console.log('bossList', bossList)
  }

  render() {
    return html`
      <div class="flexw flexr main-container">
     ${map(bossList, (boss) => {
        return html`<boss-card .data=${boss}></boss-card>`
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
