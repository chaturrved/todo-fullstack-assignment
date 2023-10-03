import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksService } from './tasks.service';



@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [TasksService],
  exports: [TasksComponent]
})
export class TasksModule { }
