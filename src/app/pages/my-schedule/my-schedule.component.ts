import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';
import { MyScheduleService } from '../../services/my-schedule.service';

@Component({
  selector: 'app-my-schedule',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-schedule.component.html',
  styleUrl: './my-schedule.component.scss'
})
export class MyScheduleComponent {
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

  totalPoints: number = 0;

  constructor(private courseService: CoursesService, private myScheduleService: MyScheduleService) {}

  ngOnInit() {
    this.myScheduleService.getData().subscribe((courses) => {
      
      this.courses = courses;
      
      this.courses.forEach((course) => {
        this.subjects.push(course.subject);
      });

      this.uniqueSubjects = [...new Set(this.subjects)];

      this.filteredCourses = courses;
      });

      this.totalPoints = this.filteredCourses.reduce((sum, course) => sum + parseFloat(course.points), 0);
    
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter((course) => {
      let matchSubject = this.selectedSubject === 'Alla' || course.subject.toLowerCase() === this.selectedSubject.toLowerCase();

      let matchSearch = this.searchPhrase.trim() === '' || 
      course.courseCode.toLowerCase().includes(this.searchPhrase.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.searchPhrase.toLowerCase());

      return matchSubject && matchSearch;
    });
  }
  choseSubject() {
    this.filterCourses();
  }

  searchCourses() {
    this.filterCourses();
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

  deleteCourse(course: Course) {
    
    // Uppdatera status för att bli möjligt att lägga till i kurser-sida
    this.courseService.updateStatus(course, course.added).subscribe(() => {
      console.log(`Kurs ${course.courseName} har ändrat sin status`);
    });


    // Uppdatera kurser
    this.courses = this.courses.filter(remainCourse => remainCourse.courseCode !== course.courseCode);
    
    this.filteredCourses = this.filteredCourses.filter(remainCourse => remainCourse.courseCode !== course.courseCode);
    
    // Uppdatera ämnen
    this.subjects = this.filteredCourses.map(course => course.subject);

    this.uniqueSubjects = [...new Set(this.subjects)];

    this.myScheduleService.deleteData(course).subscribe({
      next: () => {
        
        alert(`Kursen ${course.courseName} har raderats`);

        this.totalPoints = this.filteredCourses.reduce((sum, course) => sum + parseFloat(course.points), 0);

        
      },
      error: err => console.error('Fel vid radering: ', err)
    });

  }

}
