import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map,timeout,catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl, Validators} from "@angular/forms"
import {IPerson} from "../interfaces/Person";

@Component({
  selector: 'app-person_detail',
  templateUrl: './person_detail.component.html',
  styleUrls: ['./person_detail.component.css']
})

export class Person_detailComponent implements OnInit {
  constructor(
    private activatedRoute : ActivatedRoute, 
    private httpclient : HttpClient, 
    private router : Router
  ){}

  mode : string= ""; 
  personcd : string;
  disableInput : boolean;

  public person : IPerson;  

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.personcd = params['personcd'];
      this.mode = params['mode'];
    });
    // console.log(this.mode);
    this.initPerson();
    if (this.mode != "Create"){
      this.GetPerson();
    }

    if(this.mode == "Update" || this.mode == "Create"){
      this.disableInput = false;
    }
    else{
      this.disableInput = true;
      this.txtPersonName.disable();
      this.txtPersonNameKana.disable();
      this.txtMailAddress.disable();
    }

    console.log(this.mode);
    console.log(this.disableInput);
    console.log(this.person);
  }

  async GetPerson(){
    this.person = await this.httpclient.get<IPerson>("/api/user/" + this.personcd).toPromise();
  }

  Dosave(){
    switch(this.mode){
      case "Create":
        this.CreatePerson();
        break;
      case "Update":
        this.UpdatePerson();
        break;
      case "Delete":
        this.DeletePerson();
        break;
    }
  }

  async CreatePerson(){
    await this.httpclient.post("/api/user", this.person, this.httpOptions)
    .pipe(
      timeout(5000),
      catchError(this.handleError())
    ).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));
        this.router.navigate([`/persons`]);
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  async UpdatePerson(){
    await this.httpclient.put("/api/user/" + this.person.PersonCd, this.person, this.httpOptions)
    .pipe(
      catchError(this.handleError())
    ).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));        
        this.router.navigate([`/persons`]);
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  async DeletePerson(){
    await this.httpclient.delete("/api/user/" + this.person.PersonCd)
    .pipe(catchError(this.handleError())
    ).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));        
        this.router.navigate([`/persons`]);
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }
  private handleError(): any {
    return (error: any): Observable<any> => {
      const ret = {
        'status': error.status
        , 'data': error.statusText + '/' + error.url
      };
      return throwError(ret);
    };
  }

  txtPersonName = new FormControl("",[
    Validators.required,
  ]);

  txtPersonNameKana = new FormControl("",[
    Validators.required,
  ]);

  txtMailAddress = new FormControl("",[
    Validators.email,
  ]);

  private initPerson(){
    this.person = {
      PersonCd:"",
      PersonName:"",
      PersonNameKana:"",
      Birthday:"",
      Sex:"",
      Zip:"",
      Address1:"",
      Address2:"",
      Address3:"",
      Address4:"",
      Tel:"",
      Mobile:"",
      MailAddress:"",
      AuthenticationDate:"",
      DeleteFlag:"",
      CreateUser:"",
      CreateDate:"",
      UpdateUser:"",
      UpdateDate:"",
    }

  }
}
