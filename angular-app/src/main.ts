import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutingProviders } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';

bootstrapApplication(AppComponent, {
  providers: [appRoutingProviders,provideHttpClient(withFetch())]
});