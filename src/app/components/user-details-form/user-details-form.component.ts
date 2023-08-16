import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataStorageService} from "../../data-storage.service";

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent {
  @Input() animals :Array<any> =  [];
  @Input() cities:Array<string> = [];
  @Input() genders:Array<string>  = [];
  addUserFrom: FormGroup;
  constructor(private fb: FormBuilder,private dataStorageService:DataStorageService) {
    this.animals = this.dataStorageService.animals;
    this.cities = this.dataStorageService.cities;
    this.genders = this.dataStorageService.genders;
    this.addUserFrom = fb.group({
      userGroup: fb.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        gender: new FormControl(null,Validators.required)
      }),
      animal: new FormArray([]),
      city: new FormControl(null,Validators.required)
    });

  }

  onSubmit() {
    this.addUserFrom.markAllAsTouched();
    if (!this.addUserFrom.valid) {
      console.log('Formularz niepoprawny');
      return;
    }
    console.log(this.addUserFrom.value);
  }

  changeGender(event:string) {
    this.addUserFrom.value.userGroup.gender = event;
  }

  onCheckboxChange(event: any) {
    console.log(event)

    const selectedCountries = (this.addUserFrom.controls['animal'] as FormArray);
    if (event.checked) {
      selectedCountries.push(new FormControl(event.value));
    } else {
      const index = selectedCountries.controls
        .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
    }
  }

}
