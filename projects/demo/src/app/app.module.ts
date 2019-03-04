import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoreModule } from './core/core.module';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'popover', loadChildren: './popover/popover.module#PopoverDemoModule' },
  { path: 'tooltip', loadChildren: './tooltip/tooltip.module#TooltipDemoModule' },
  // { path: 'stateful-button', loadChildren: './stateful-button/stateful-button.module#StatefulButtonDemoModule' },
  { path: 'dialog', loadChildren: './dialog/dialog.module#DialogDemoModule' },
  { path: 'ellipsis', loadChildren: './ellipsis/ellipsis.module#EllipsisDemoModule' }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }