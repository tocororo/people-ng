import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatTableDataSource,
  PageEvent,
} from "@angular/material";
import { MessageHandler, StatusCode } from "toco-lib";
import { PeopleService } from "../people/people.service";
import {
  ActivatedRoute,
  NavigationExtras,
  ParamMap,
  Params,
  Router,
  convertToParamMap,
} from "@angular/router";
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

  people: any;
  files: File[] = [];
  dataSource = new MatTableDataSource<any>([]);
  m = new MessageHandler(this._snackBar);
  displayedColumns: string[] = [
    "name",
    "lastName",
    "aliases",
    "gender",
    "country",
    "institutional_email",
    "emails",
  ];

  pageSize = 5;
  pageIndex = 0;
  filtersParams: ParamMap;

  org: any;

  constructor(
    private _snackBar: MatSnackBar,
    private peopleService: PeopleService,
    public dialog: MatDialog
  ) {}

  onSelect(event: any) {
    const files = [...event.addedFiles];

    this.readFile(files[0]).then((fileContents: string) => {
      let person = null;
      if (files[0].type !== "application/json") {
        const jsonFile = this.csvToJson(fileContents);
        person = JSON.parse(jsonFile)[0];
      } else {
        person = JSON.parse(fileContents).result[0];
      }

      const areValidKeys = this.displayedColumns.every((i) =>
        person.hasOwnProperty(i)
      );
      if (areValidKeys) {
        this.files = files;
        this.openDialog();
        return;
      }

      this.m.showMessage(
        StatusCode.OK,
        "El archivo a importar no cumple con los campos requeridos"
      );

      // if (this.files.length > 0) {
      //   this.m.showMessage(StatusCode.OK, "Solo se puede seleccionar un archivo");
      // }else {
      //   this.files.push(...);
      //   this.openDialog()
    });
  }

  showData() {
    if (this.files.length === 0) {
      this.m.showMessage(StatusCode.OK, "No hay archivo para mostrar");
    } else {
      this.readFile(this.files[0]).then((fileContents: string) => {
        if (this.files[0].type !== "application/json") {
          const jsonFile = this.csvToJson(fileContents);
          this.people = JSON.parse(jsonFile);
        } else {
          this.people = JSON.parse(fileContents).result;
        }
        // const eliminado = this.people.shift();
        this.dataSource.data =
          this.people.length > 800 ? this.people.slice(0, 800) : this.people;
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
        // console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        // console.error("No file to read.");
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
      this.peopleService.saveImport(this.org.id, this.files[0]).subscribe((response) => {
        console.log(response);
        // this.formData.delete("peopleFile");
      });
    }
  }

  filtersChange(values: Params) {
    console.log(values.organizations);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrgDialogComponent, {
      width: "95%",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.org = result;
    });
  }
}
