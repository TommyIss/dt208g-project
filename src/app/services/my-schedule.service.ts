import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class MyScheduleService {
  mySchedule: Course[] = [];
  
  constructor(private http: HttpClient) { }

  getData(): Observable<Course[]> {
    let addedCourses = JSON.parse(localStorage.getItem('addedCourses') || '[]');
    this.mySchedule = addedCourses;
    return of(this.mySchedule);    
  }

  postData(course: Course): Observable<Course> {
    
    this.mySchedule.push(course);
    
    localStorage.setItem('addedCourses', JSON.stringify(this.mySchedule));

    return of(course);
  }
  
  deleteData(deletedCourse: Course): Observable<void> {

    this.mySchedule = this.mySchedule.filter(course => course.courseCode !== deletedCourse.courseCode);

    localStorage.setItem('addedCourses', JSON.stringify(this.mySchedule));

    return of(undefined);
  }
}
