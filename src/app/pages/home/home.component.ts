import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  courses: Course[] = [];
  filteredCourses: Course[] = []; 
  subjects: string[] = [];
  uniqueSubjects: string[] = [];
  selectedSubject: string = 'Alla';
  searchPhrase: string = '';
  
  codeOrder: string = 'desc';
  nameOrder: string = 'desc';
  pointsOrder: string = 'desc';
  subjectOrder: string = 'desc';
  codeArrow: string = 'fas fa-caret-up';
  nameArrow: string = 'fas fa-caret-up';
  pointsArrow: string = 'fas fa-caret-up';
  subjectArrow: string = 'fas fa-caret-up';

  addText: string = 'Lägg till';
  added: boolean = false;

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      courses.forEach(course => {
        course.added = false;
      });
      this.courses = courses;
      this.courses.forEach((course) => {
      this.subjects.push(course.subject);
      });
      this.uniqueSubjects = [...new Set(this.subjects)];
      this.filteredCourses = courses;
      });
      
  }

  choseSubject() {
    if(this.selectedSubject !== 'Alla') {
      this.filteredCourses = this.courses.filter((course) => 
        course.subject.toLowerCase() === this.selectedSubject.toLowerCase()
      );
    } else {
      this.filteredCourses = this.courses;
    }  
  }

  searchCourses() {
    this.filteredCourses = this.courses.filter((course) => 
      course.courseCode.toLowerCase().includes(this.searchPhrase.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.searchPhrase.toLowerCase())
    );
  }

  sortByCode() {
    if(this.codeOrder === 'desc') {
      this.codeOrder = 'asc';
      this.codeArrow = 'fas fa-caret-down';
      this.filteredCourses.sort((a, b) => 
      (a.courseCode > b.courseCode) ? 1: -1
      );
    } else if(this.codeOrder === 'asc') {
      this.codeOrder = 'desc';
      this.codeArrow = 'fas fa-caret-up';
      this.filteredCourses.sort((a, b) => 
      (b.courseCode > a.courseCode) ? 1: -1
      );
    }
  }

  sortByName() {
    if(this.nameOrder === 'desc') {
      this.nameOrder = 'asc';
      this.nameArrow = 'fas fa-caret-down';
      this.filteredCourses.sort((a, b) =>
      (a.courseName > b.courseName) ? 1: -1
      );
    } else if(this.nameOrder === 'asc') {
      this.nameOrder = 'desc';
      this.nameArrow = 'fas fa-caret-up';
      this.filteredCourses.sort((a, b) => 
      (b.courseName > a.courseName) ? 1: -1
      );
    }
  }
  sortByPoints() {
    if(this.pointsOrder === 'desc') {
      this.pointsOrder = 'asc';
      this.pointsArrow = 'fas fa-caret-down';
      this.filteredCourses.sort((a, b) =>
      (a.points > b.points) ? 1: -1
      );
    } else if(this.pointsOrder === 'asc') {
      this.pointsOrder = 'desc';
      this.pointsArrow = 'fas fa-caret-up';
      this.filteredCourses.sort((a, b) => 
      (b.points > a.points) ? 1: -1
      );
    }
  }
  sortBySubject() {
    if(this.subjectOrder === 'desc') {
      this.subjectOrder = 'asc';
      this.subjectArrow = 'fas fa-caret-down';
      this.filteredCourses.sort((a, b) =>
      (a.subject > b.subject) ? 1: -1
      );
    } else if(this.subjectOrder === 'asc') {
      this.subjectOrder = 'desc';
      this.subjectArrow = 'fas fa-caret-up';
      this.filteredCourses.sort((a, b) => 
      (b.subject > a.subject) ? 1: -1
      );
    }
  }

  addCourse(course: Course) {
    course.added = true;
  }

  saveCourse(course: Course) {
    
    localStorage.setItem('course', JSON.stringify(course));
    
    // course: Course = JSON.parse(localStorage.getItem('savedCourse') || '{}');
  }
}
