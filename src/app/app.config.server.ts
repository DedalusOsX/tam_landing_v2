import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideTransloco, TranslocoLoader } from '@ngneat/transloco';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideTransloco({
      config: {
        availableLangs: ['en', 'hy', 'ru'],
        defaultLang: 'en',
        reRenderOnLangChange: false,
        prodMode: true
      },
      loader: class implements TranslocoLoader {
        getTranslation() { return Promise.resolve({}); }
      }
    })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
