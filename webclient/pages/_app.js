import App from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../constructors/redux'
import { Provider } from 'react-redux'

import { MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import muiTheme from '../constructors/muiTheme'

import { MetaMaskProvider } from '../context/MetaMask';
import { ZaboProvider } from '../context/Zabo';

import '../styles/index.sass'


class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
       <MetaMaskProvider>
        <ZaboProvider>
          <Provider store={store}>
            <MuiThemeProvider theme={createMuiTheme(muiTheme)}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </Provider>
        </ZaboProvider>
      </MetaMaskProvider>
    )
  }
}

export default withRedux(initStore)(MyApp)
