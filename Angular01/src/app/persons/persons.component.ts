import { Component, OnInit,ViewChild, Input } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {Router } from '@angular/router';
import {MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {IPerson} from "../interfaces/Person";
import { saveAs } from 'file-saver';
import { collectExternalReferences } from '@angular/compiler';
import { observable } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private httpClient : HttpClient, private router : Router
    ){ }

  localpersons : IPerson[] ;
  contents: string;
  dataSource = new MatTableDataSource(this.localpersons);
  selectedFile : File = null;

  ngOnInit() {
    this.DoGet();
    this.dataSource.paginator = this.paginator;
  }

  async DoGet(){
    this.localpersons = await this.httpClient.get<IPerson[]>("/api/user").toPromise();
    this.dataSource.data = this.localpersons; //new MatTableDataSource(this.localpersons);
  }

  rowClick(action,obj) {
    this.router.navigate([`/person_detail`],{ queryParams: { personcd: obj.PersonCd,mode:action } });
  }

  output_CSV(){
    console.log("output_CSV");
    // // test for if savaAs can use. It's Good
    // var blob = new Blob(["Hello, world!"], {type: "text/csv;charset=utf-8"});
    // var filename = 'hello world.txt';
    // saveAs(blob, filename);

    this.httpClient.post("api/userdownload",{}, {"responseType" : "blob"}).subscribe(r => {
      saveAs(r, 'Person.csv')
    });

  }

  UpFileChanged(event){
    //console.log(event);
    this.selectedFile = event.target.files[0];

    var fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);

    // //get the return message 
    // this.httpClient.post("/api/upload",fd , {responseType: "text"}).subscribe(r =>{
    //   console.log(r);
    // });

    //get http event
    this.httpClient.post("/api/upload",fd , {responseType: "text", reportProgress: true, observe: 'events'}).subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        console.log("The progress of upload is " + Math.round(event.loaded / event.total * 100) + "%");
      }
      else if(event.type === HttpEventType.Response){
        console.log(event); // => this is the response.
        console.log(event.body);
      }
    });

  }
}
