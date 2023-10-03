import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TasksModule } from '../tasks/tasks.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TasksModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
