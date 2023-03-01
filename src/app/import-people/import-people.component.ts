import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Person } from "../people/person.entity";
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource, PageEvent } from "@angular/material";
import csvToJson from "convert-csv-to-json";
import { MessageHandler, StatusCode } from "toco-lib";
import { PeopleService } from '../people/people.service';
import { ActivatedRoute, NavigationExtras, ParamMap, Params, Router, convertToParamMap } from "@angular/router";
import { OrgDialogComponent } from "./org-dialog/org-dialog.component";

@Component({
  selector: "app-import-people",
  templateUrl: "./import-people.component.html",
  styleUrls: ["./import-people.component.scss"],
})
export class ImportPeopleComponent {
  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  people: any[] = [];
  files: File[] = [];
  dataSource = new MatTableDataSource<any>([]);
  m = new MessageHandler(this._snackBar);
  formData = new FormData();
  displayedColumns: string[] = [
    "nombre",
    "apellido1",
    "apellido2",
    "pais",
    "sexo",
    "institutional_email",
    "externals_email",
  ];

  pageSize = 5;
  pageIndex = 0;
  filtersParams: ParamMap;

  org: any;

  constructor(
    private _snackBar: MatSnackBar,
    private peopleService: PeopleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  onSelect(event: any) {
    console.log(event);
    if (this.files.length > 0) {
      this.m.showMessage(StatusCode.OK, "Solo se puede seleccionar un archivo");
    }else {
      this.files.push(...event.addedFiles);
    }

  }

  showData() {
    if (this.files.length === 0) {
      this.m.showMessage(StatusCode.OK, "No hay archivo para mostrar");
    } else {
      this.readFile(this.files[0]).then((fileContents: string) => {
        const jsonFile = this.csvToJson(fileContents);
        const rta = JSON.parse(jsonFile);
        this.people = rta;
        const eliminado = this.people.shift();
        console.log("people", this.people);
        this.dataSource.data = this.people;
      });
    }
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = (e) => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error("No file to read.");
        return reject(null);
      }

      reader.readAsText(file);
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.people = [];
  }

  csvToJson(csv: any) {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 0; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }
    return JSON.stringify(result);
  }

  saveData() {
    if (this.files.length === 0) {
      this.m.showMessage(StatusCode.OK, "No hay archivo para guardar");
    } else {
      this.formData.append("peopleFile", this.files[0]);
      console.log(this.formData);
      this.peopleService.postPeople(this.formData)
        .subscribe(response => {
          console.log(response);
          this.formData.delete("peopleFile")
        })
    }
  }


  filtersChange(values: Params) {
    console.log(values.organizations);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrgDialogComponent, {
      width: '95%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.org = result;
    });
  }
}
