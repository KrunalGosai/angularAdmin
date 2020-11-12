import { ToastrService } from 'ngx-toastr';
import { UsersFacade } from './../../users-facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UsersUserAddComponent implements OnInit, OnDestroy {

  q = {
    username: '',
    email: '',
    gender: '',
  };

  userForm: FormGroup;
  roleList = [];
  countryList = [];
  stateList = [];
  cityList = [];
  areaList = [];
  vehicleList = [];
  isEditMode:boolean = false;
  activeEditId;

  translateSubscription: Subscription;

  constructor(
    private usersFacade:UsersFacade,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    private activeRoute:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router
  ) {

    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      contact_2: [''],
      role_id: [''],
      gender: [''],
      email: ['', [Validators.required, Validators.email]],
      current_address: [''],
      sameAddress:[false],
      permanent_address: [''],
      dob: [''],
      uid: [''],
      family_details: [''],
      previous_occupation: [''],
      bank_details: [''],
      firm_name: [''],
      firm_gst: [''],
      supplier_of_what: [''],
      reference: [''],
      country_id: [''],
      state_id: [''],
      city_id: [''],
      area_id: [''],
      vehicle_id: [''],
      location:[''],
      is_active:[true]
          
    });

    this.activeRoute.params.subscribe(params => {
      if(params.id != undefined && params.id != null && params.id != ''){
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
    })
  }

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
    this.loadRoles()
    this.loadFormDropdowns();
    this.loadEditForm();
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  public onFormSubmit(event){
    if(this.userForm.valid == false){
      this.toastr.error('Please Fill all required field!','Required',{timeOut:3000});
    }else{
      if(this.isEditMode){
        let value = this.userForm.value;
        value._id = this.activeEditId;
        this.usersFacade.updateUser(value).then(res => {
          this.userForm.reset();
          this.router.navigate(['users'])
        })
      }else{
        this.usersFacade.newUser(this.userForm.value).then(res => {
          this.userForm.reset();
          this.router.navigate(['users'])
        })
      }
    }
  }

  public loadRoles() {
    this.usersFacade.getRoleList().subscribe(res => {
      let data:any = res;
      this.roleList = data.data;
    },err => console.error(err))
  }

  public loadFormDropdowns(){
    this.usersFacade.getCountryList().subscribe(res => {
      let data:any = res;
      this.countryList = data.data;
    },err => console.error(err))

    this.usersFacade.getStateList().subscribe(res => {
      let data:any = res;
      this.stateList = data.data;
    },err => console.error(err))

    this.usersFacade.getCityList().subscribe(res => {
      let data:any = res;
      this.cityList = data.data;
    },err => console.error(err))

    this.usersFacade.getAreaList().subscribe(res => {
      let data:any = res;
      this.areaList = data.data;
    },err => console.error(err))

    this.usersFacade.getVehicleList().subscribe(res => {
      let data:any = res;
      this.vehicleList = data.data;
    },err => console.error(err))

  }

  public loadEditForm(){
    if(this.isEditMode){
      this.usersFacade.getUserDetails().subscribe(res => {
        this.userForm.patchValue(res);
        let role_id =res.role_id._id;
        let location = res.location.coordinates.join(',');
        this.userForm.patchValue({
          role_id,location
        })
      },err => console.error(err))
    }
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'validations.required'
      : form.get('email').hasError('email')
      ? 'validations.invalid_email'
      : '';
  }

  //auto complete 
  states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
  ];

  value: string;
  filteredStates = this.states;

  filter(value: string) {
    if (value) {
      return this.states.filter(state => state.name.toLowerCase().startsWith(value.toLowerCase()));
    }

    return this.states;
  }

  // steps
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
