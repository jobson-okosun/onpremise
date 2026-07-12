import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { protobufInterceptor } from './interceptors/protobuf.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([protobufInterceptor])),
    provideHotToastConfig(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
          preset: Aura,
          options: {
            darkModeSelector: false 
          }
        }
    })
  ]
};
