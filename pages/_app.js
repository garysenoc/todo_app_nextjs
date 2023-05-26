import App, { Container } from 'next/app';
import React, { Fragment } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core';
import theme from '../theme';

Router.events.on('routeChangeStart', url => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class RootApp extends App {
  constructor(props) {
    super(props);
    NProgress.configure({ showSpinner: false });
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} {...this.state} />
      </ThemeProvider>
    );
  }
}
