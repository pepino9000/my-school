import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { ListService } from 'src/app/core/services/list/list.service';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { Grades } from 'src/app/courses/courses/courses.component';
import { MyValidators } from 'src/utils/validator';

export interface DialogData {
  id: number;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  form!: FormGroup;
  grades!: Grades[];
  list!: number | null;
  account: any = [];
  user: Student | undefined;
  response: boolean = false;
  student!: Student;
  haveGrade: boolean = false;
  gradeId: number | undefined;
  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private gradeService: GradeService,
    private listService: ListService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  get rut() {
    return this.form.get('rut');
  }

  ngOnInit(): void {
    this.getAllGrades()
    this.studentService.getStudent(Number(this.data.id))
      .subscribe(student => {
        this.student = student;
        this.gradeService.getGradeByStudent(student.id).subscribe(g => {
          this.form.patchValue({ ...student, grade: g ? g.id : '' });
          if (g) {
            this.list = g.listId!;
          } else {
            this.list = null;
          }
        })
      });
    this.buildForm();
    this.form.get("rut")?.valueChanges.pipe(distinctUntilChanged()).subscribe(selectedValue => {
      if (selectedValue !== this.rut) {
        // Despejar Puntos
        let valor = selectedValue.replace('.', '');
        // Despejar Guión
        valor = valor.replace('-', '');
        // Aislar Cuerpo y Dígito Verificador
        let cuerpo = valor.slice(0, -1);
        let dv = valor.slice(-1).toUpperCase();
        // Formatear RUN
        if (selectedValue.replace('-', '').replace(/\D/g, '').length > 1) {
          let formattedValue = cuerpo + '-' + dv;
          this.form.controls['rut'].setValue(formattedValue);
        } else {
          this.form.controls['rut'].setValue(dv);
        }
      }
    });
  }
  save(event: Event) {
    event.preventDefault();
    let grade = Number(this.form.value.grade);
    if (this.form.valid) {
      const user = {
        ...this.form.value,
        password: '12345',
        role: 5,
      };
      delete user.grade
      this.studentService.saveStudent(user, this.student.id).subscribe(resp => {
        this.response = true;
      });
      let data;
      data = {
        studentId: this.data.id,
        studentListId: this.grades.find((g) => g.id === grade)?.listId,
      };
      this.listService.changeStudentList(data).subscribe((r) => {
        console.log(r);
      }
      );
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      rut: ['', [Validators.required, MyValidators.isRutValid]],
      grade: [''],
      phone: ['']
    });
  }
  async getAllGrades() {
    this.gradeService.getAllGrades()
      .subscribe(grade => {
        this.grades = grade;
      });
  }
}
