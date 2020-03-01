import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@NgModule({
	declarations: [
		AppComponent,
		ModalComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatDialogModule, 
		MatInputModule, 
		MatButtonModule, 
		MatCardModule, 
		MatFormFieldModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
