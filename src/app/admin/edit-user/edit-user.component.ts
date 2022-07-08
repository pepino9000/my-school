import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
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
  account: any = [];
  user: Student | undefined;
  response: boolean = false;
  student!: Student;
  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  get rut() {
    return this.form.get('rut');
  }

  ngOnInit(): void {
    this.studentService.getStudent(Number(this.data.id))
      .subscribe(student => {
        this.student = student;
        this.form.patchValue(student);
      });
    this.buildForm();
    this.form.get("rut")?.valueChanges.pipe(distinctUntilChanged()).subscribe(selectedValue => {
      if (selectedValue !== this.rut) {
        // Despejar Puntos
        var valor = selectedValue.replace('.', '');
        // Despejar Guión
        valor = valor.replace('-', '');
        // Aislar Cuerpo y Dígito Verificador
        var cuerpo = valor.slice(0, -1);
        var dv = valor.slice(-1).toUpperCase();
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
    if (this.form.valid) {
      const user = { ...this.form.value, password: '12345', role: 5 };
      this.studentService.saveStudent(user, this.student.id).subscribe(resp => {
        this.response = true;
      });
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
    });
  }

}
