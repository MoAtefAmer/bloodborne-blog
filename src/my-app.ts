import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './components/boss-card';
import { sharedStyles } from './styles.ts';
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

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <div class="flexw flexr main-container">
        <boss-card></boss-card>
        <boss-card></boss-card>
        <boss-card></boss-card>
        <boss-card></boss-card>
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
