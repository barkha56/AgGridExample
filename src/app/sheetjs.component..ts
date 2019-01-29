/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
	selector: 'sheetjs',
	templateUrl: './sheetjs.component.html'
})
export class SheetJSComponent {
	columnDefs;
	rowData;
	newColumnDef;
	ws: any;
	headers;
	//for drop down display
	public items: Array<string> = ['RSA_ID', 'first_name', 'last_name', 'gender', 'risk_salary',
		'Category', 'dob'];
	testObject: { [key: string]: string } =
		{
			'RSA_ID': 'RSA id',
			'first_name': 'First Name',
			'last_name': 'Last Name',
			'gender': 'Gender',
			'risk_salary': 'Risk Salary',
			'Category': 'Category',
			'dob': 'Date Of Birth'
		};
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
	selectedValue: string = '';
	//event handler for the select element's change event
	selectChangeHandler(event: any)
	{
		//update the ui
		this.selectedValue = event.target.value;
	}
	createHeaderObj(headers) 
	{

	}
	generateColumns(data: any[]) 
	{
		let columnDefinitions = [];
		for (var i in data) {
			let mappedColumn = {
				headerName: data[i],
				field: data[i]

			}
			columnDefinitions.push(mappedColumn);
		}
		//Remove duplicate columns
		columnDefinitions = columnDefinitions.filter((column, index, self) =>
			index === self.findIndex((colAtIndex) => (
				colAtIndex.field === column.field
			))
		)
		return columnDefinitions;
	}
	newColumns(data: any[]) 
	{
		var headerObj = {
			"RSA_ID": "RSA id", "first_name": "First Name", "last_name": "Last Name", "gender": "Gender", "risk_salary": "Risk Salary",
			"Category": "Category", "dob": "Date Of Birth"
		};
		let newcolumnDefinitions = [];
		console.log("new header"+headerObj);
		for (var i in data) {
			let mappedColumn = {
				headerName: headerObj[data[i]],
				field: data[i]
			}
			newcolumnDefinitions.push(mappedColumn);
		}
		//Remove duplicate columns
		newcolumnDefinitions = newcolumnDefinitions.filter((column, index, self) =>
			index === self.findIndex((colAtIndex) => (
				colAtIndex.field === column.field
			))
		)
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
			const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];
			this.ws = ws;
			 this.headers = this.get_header_row(ws);
			/* save data */
			this.rowData = <AOA>(XLSX.utils.sheet_to_json(ws));
			this.columnDefs = this.generateColumns(this.headers);
			this.rowData.shift();
		};
		reader.readAsBinaryString(target.files[0]);
	}
	get_header_row(sheet) 
	{
		var headers = [];
		var range = XLSX.utils.decode_range(sheet['!ref']);
		var C, R = range.s.r; /* start in the first row */
		/* walk every column in the range */
		for (C = range.s.c; C <= range.e.c; ++C) {
			var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */

			var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
			if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

			headers.push(hdr);
		}
		return headers;
	}
	handleClick(event:any)
	{
		this.newColumnDef = this.newColumns(this.headers);
	}

}

