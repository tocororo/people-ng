import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Person } from "../people/person.entity";
import { MatPaginator, MatSnackBar, MatTableDataSource, PageEvent } from "@angular/material";
import csvToJson from "convert-csv-to-json";
import { MessageHandler, StatusCode } from "toco-lib";

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
  headers = new Headers({ "Content-Type": "application/csv" });
  displayedColumns: string[] = [
    "nombre",
    "apellido1",
    "apellido2",
    "pais",
    "sexo",
    "institutional_email",
    "externals_email",
  ];

  constructor(private _snackBar: MatSnackBar) {}

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  showData() {
    if (this.files.length === 0) {
      const m = new MessageHandler(this._snackBar);
      m.showMessage(StatusCode.OK, "No hay archivo para mostrar");
    } else {
      this.readFile(this.files[0]).then((fileContents: string) => {
        let jsonFile = this.csvToJson(fileContents);
        const rta = JSON.parse(jsonFile);
        this.people = rta;
        let eliminado = this.people.shift();
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
      const m = new MessageHandler(this._snackBar);
      m.showMessage(StatusCode.OK, "No hay archivo para guardar");
    } else {
      console.log("Salvando");
    }
  }
}
