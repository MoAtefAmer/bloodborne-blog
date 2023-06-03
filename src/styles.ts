import { css } from 'lit';

export const sharedStyles = css`
  @media screen and (max-width: 767px) {
    /* Use this to hide and show elements for desktop vs mobile */

    .flexr {
      /* for flex reponsive */
      flex-direction: column;
    }
  }

  @media screen and (min-width: 768px) {
    /* Use this to hide and show elements for desktop vs mobile */

    .flexr {
      /* for flex reponsive */
      flex-direction: row;
    }
  }

  .flexw {
    display: flex;
    flex-wrap: wrap;
  }
`;
