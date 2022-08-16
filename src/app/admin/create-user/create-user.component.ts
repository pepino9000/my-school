import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { List, ListService } from 'src/app/core/services/list/list.service';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { Grades } from 'src/app/courses/courses/courses.component';
import { MyValidators } from 'src/utils/validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form!: FormGroup;
  account: any = [];
  grades: Grades[] = [];
  data: Student | undefined;
  response: boolean = false;
  constructor (
    private formBuilder: FormBuilder,
    private gradeService: GradeService,
    private listService: ListService,
    private studentService: StudentService
  ) {
    this.buildForm();
  }

  get rut() {
    return this.form.get('rut');
  }
  get role() {
    return this.form.get('role');
  }

  async ngOnInit(): Promise<void> {
    this.form.get("rut")?.valueChanges.pipe(distinctUntilChanged()).subscribe(selectedValue => {
      if (selectedValue !== this.rut) {
        // Despejar Puntos y Guión
        let valor = selectedValue.replace('.', '').replace('-', '');
        // Aislar Cuerpo y Dígito Verificador
        let cuerpo = valor.slice(0, -1);
        let dv = valor.slice(-1).toUpperCase();
        // Formatear RUN
        if (selectedValue.replace('-', '').replace(/\D/g, '').length > 1) {
          let formattedValue = cuerpo.replaceAll('-', '') + '-' + dv.replaceAll('-', '');
          this.form.controls['rut'].setValue(formattedValue);
        } else {
          console.log('else')
          this.form.controls['rut'].setValue(dv);
        }
      }
    });
    await this.getAllGrades();
  }
  create(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const data = {
        ...this.form.value,
        password: '12345',
        role: Number(this.form.value.role),
      };
      let grade = Number(data.grade);
      if (data.role === 5) {
        delete data.grade;
        this.studentService.createStudent(data).subscribe(resp => {
          this.response = true;
          console.log(this.grades.find((g) => g.id === grade));
          if (!isNaN(grade)) {
            let list = {
              studentId: Number(resp),
              studentListId: Number(this.grades.find((g) => g.id === grade)?.listId)
            };
            console.log(list);
            this.addStudentToList(list);
          }
        });
      }
      else {
        delete data.grade;
        this.studentService.createUser(data).subscribe(resp => {
          this.response = true;
        });
      }
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      rut: ['', [Validators.required, MyValidators.isRutValid]],
      grade: ['', [this.form.get('role')?.value === '5' ? Validators.required : '']],
    });
  }

  async getAllGrades() {
    this.gradeService.getAllGrades()
      .subscribe(grade => {
        this.grades = grade;
      });
  }
  async addStudentToList(data: List) {
    this.listService.AddStudentToList(data)
      .subscribe(list => {
        console.log(list);
      });
  }
}
