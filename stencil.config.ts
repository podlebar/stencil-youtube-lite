import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-yt',
  outputTargets: [
    /*{
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },*/
    {
      type: 'www',
      baseUrl: 'https://simplum.ch/lyt/',
      serviceWorker: null // disable service workers
    }
  ]
};
