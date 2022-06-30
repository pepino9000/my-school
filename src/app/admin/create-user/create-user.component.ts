import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { MyValidators } from 'src/utils/validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form!: FormGroup;
  account: any = [];
  data: Student | undefined;
  response: boolean = false;
  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService
  ) {
    this.buildForm();
  }

  get rut() {
    return this.form.get('rut');
  }

  ngOnInit(): void {
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
  create(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const data = { ...this.form.value, password: '12345', role: 5 };
      this.studentService.createStudent(data).subscribe(resp => {
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
