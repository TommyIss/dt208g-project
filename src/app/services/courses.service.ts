import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  url: string = 'assets/data/miun_courses.json';
  savedCourses: Course[] = [];

  constructor(private http: HttpClient) { }
  
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url).pipe(
      map((courses: Course[]) => {

        this.savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
        

        // Markera kurser som är tillagda
        return courses.map(course => {
          let isSaved = this.savedCourses.some((savedCourse: Course) => savedCourse.courseCode === course.courseCode);

          return { ...course, added: isSaved };
        });
        
      })
    );

    // localStorage.clear();
    // return this.http.get<Course[]>(this.url);

  }

  updateStatus(course: Course, status: boolean): Observable <void> {
    this.savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');

    if(status === false) {
      course.added = true;

      let existedCourses = this.savedCourses.some((savedCourse: Course) => savedCourse.courseCode === course.courseCode);
      if(!existedCourses) {
        this.savedCourses.push(course);
      }
    } else {
      course.added = false;

      this.savedCourses = this.savedCourses.filter(savedCourse => savedCourse.courseCode !== course.courseCode);

    }

    localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));

    return of(undefined);
  }
}
