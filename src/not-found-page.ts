import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js'

@customElement('not-found-page')
export class NotFoundPage extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                color:black;
            }
        `
    ];

    render() {
        return html`<div>404 Not Found </div>`;
    }
}
