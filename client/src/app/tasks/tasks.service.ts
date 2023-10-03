import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../types/task';
import { Observable, Subject } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

    private tasks$: Subject<Task[]> = new Subject();

    private headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
    });

    constructor(private httpClient: HttpClient) { }

    private refreshTasks(){
      this.httpClient.get<Task[]>(`${apiUrl}/tasks/tasks/myTasks`, {headers: this.headers})
        .subscribe(tasks=>{
          this.tasks$.next(tasks);
        });
    }

    getTasks(): Subject<Task[]> {
      this.refreshTasks();
      return this.tasks$;
    }

    getTasksById(id: any){
      return this.httpClient.get<Task[]>(`${apiUrl}/tasks/myTasks`, {headers: this.headers});
    }

    createTask(task: Task): Observable<any> {
      return this.httpClient.post(`${apiUrl}/tasks/addTask`, task, {headers: this.headers});
    }
    
    updateTask(id: string, task: Task): Observable<any> {
      return this.httpClient.patch(`${apiUrl}/tasks/${id}`, task, {headers: this.headers});
    }
    
    deleteTask(id: string): Observable<any> {
      return this.httpClient.delete(`${apiUrl}/tasks/${id}`, {headers: this.headers});
    }
}
