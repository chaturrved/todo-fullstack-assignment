import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from '../types/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  createTaskForm!: FormGroup;
  constructor(
    private tasksService: TasksService,
    private fb: FormBuilder,
  ) {
    this.createTaskForm = new FormGroup({});
  }
  
  ngOnInit(): void {
    this.tasks = [];
    this.loadTasks();
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      content: [''],
      completed: [false],
    });
  }

  loadTasks(){
    if(localStorage.getItem('userId')){
      const id = localStorage.getItem('userId');
      this.tasksService.getTasksById(id).subscribe({
        next: (res: Task[]) => {
          this.tasks = [];
          this.tasks = res;
        },
        error: (error: any) => {console.error('Get tasks failed:', error);}
      });
    }
  }

  filterCompletedTasks(event: Event){
    const checkbox = event.target as HTMLInputElement;
    if(checkbox.checked){
     this.tasks = this.tasks.filter((task) => task.completed === false);
    }else{
      this.loadTasks();
    }
  }

  createTask() {
    const newTask: Task = this.createTaskForm.value;
    if(newTask.title){
      newTask.completed = false;
      this.tasksService.createTask(newTask).subscribe({
        next:(res) => {
            this.tasks.push(res);
            this.createTaskForm.reset();
          },
        error:(error) =>{
          console.error('Create task failed:', error);
          alert('Create task failed');
        }
      });
    }
  }

  onTaskStatusChange(event: Event, task: Task) {
     const checkbox = event.target as HTMLInputElement;

     if(checkbox.checked !== task.completed){
        task.completed = checkbox.checked;
     }

     this.tasksService.updateTask(task.id, task).subscribe({
        next: (res) => {
          console.log('Task updated successfully');
          this.loadTasks();
        },
        error: (error) => {
          console.error('Update task failed:', error);
          alert('Update task failed');
        }
      });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task.id).subscribe({
      next: (res) => {
        console.log('Task deleted successfully');
        this.loadTasks();
      },
      error: (error) => {
        console.error('Delete task failed:', error);
        alert('Delete task failed');
      }
    });
  }

  ngOnDestrot(): void {
    this.tasks = [];
  }

}
