import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SheetJSComponent } from './sheetjs.component.';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
	selector: 'app-root',
    template: `<sheetjs></sheetjs>`
})
export class AppComponent {
	title = 'test';
}

@NgModule({
	declarations: [
		SheetJSComponent,
		AppComponent,
		HeaderComponent,
		FooterComponent
	],
	imports: [
        BrowserModule,
        FormsModule,
        NgSelectModule,
        AgGridModule.withComponents([])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }