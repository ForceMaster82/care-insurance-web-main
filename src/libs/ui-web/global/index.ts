import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  * {
    background-color: transparent;
    border: 0;
    margin: 0;
    outline: none;
    padding: 0;
  }

  html, body {
    -webkit-text-size-adjust : none;
    -ms-text-size-adjust : none;
    -moz-text-size-adjust : none;
    -o-text-size-adjust : none;
  }

  html {
    height: -webkit-fill-available;
  }

  body {
    min-height: 100vh;
    min-height: fill-available;
    min-height: -webkit-fill-available;
  }

  li, ul {
    list-style-type: none;
  }

  a {
    border: 0;
    color: inherit;
    text-decoration: none;
  }

  #__next {
    height: 100%;
    width: 100%;
  }
`
