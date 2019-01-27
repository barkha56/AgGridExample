/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import { Component,ElementRef, HostListener, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
	selector: 'sheetjs',
	templateUrl: './sheetjs.component.html'
})

export class SheetJSComponent {
	columnDefs;
	rowData ;
	newColumnDef; 
	public items:Array<string> = ['RSA_ID','first_name','last_name','gender','risk_salary','Category','dob'];
	public disName:Array<string> = ['RSA id','First Name','Last Name','Gender','Risk Ssalary','Category','Date Of Birth'];
	 testObject: { [key: string]: string } =
  {
		'RSA_ID' : 'RSA id',
	 	'first_name' : 'First Name',
		'last_name' : 'Last Name',
		'gender' : 'Gender',
		'risk_salary':'Risk Salary',
		'Category' : 'Category',
		'dob' :'Date Of Birth'
	 };
	//public data: any = [ ];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
	selectedValue: string = '';
  //event handler for the select element's change event
	selectChangeHandler (event: any) 
	{
    //update the ui
		this.selectedValue = event.target.value;
	}
	generateColumns(data: any[]) 
	{
  let columnDefinitions = [];
	console.log("Data"+data);
    data.map(object => {

      Object
        .keys(object)
        .map(key => {
          let mappedColumn = {
            headerName: key.toUpperCase(),
            field: key
          }
					console.log("old mapped column"+mappedColumn.field);
          columnDefinitions.push(mappedColumn);
        })
    })
    //Remove duplicate columns
    columnDefinitions = columnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
		)
		console.log("old column format"+columnDefinitions);
    return columnDefinitions;
  }
	newColumns(data : any[])
	{
		let newcolumnDefinitions = [];
		//console.log("Column"+column);
    data.map(object => {

      Object
        .keys(object)
        .map(key => {
          let mappedColumn = {
					
            headerName: key.toUpperCase(),
						field: key,
					
          }
console.log("new mapped column"+mappedColumn.field);
          newcolumnDefinitions.push(mappedColumn);
        })
		})
		//Remove duplicate columns
    newcolumnDefinitions = newcolumnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
		)
    
		console.log("new column format"+newcolumnDefinitions);
    return newcolumnDefinitions;
	}
	
	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.rowData = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
			this.columnDefs = this.generateColumns(	this.rowData);
			this.newColumnDef = this.newColumns(this.disName);
			
		};
		reader.readAsBinaryString(target.files[0]);
	}


}
	
