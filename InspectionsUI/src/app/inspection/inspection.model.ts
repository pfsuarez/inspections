interface Base {
  id: number;
  name: string;
}

// tslint:disable-next-line: no-empty-interface
export interface Inspectors extends Base {

}

// tslint:disable-next-line: no-empty-interface
export interface Status extends Base {
  //
}

export interface Inspections {
  id: number;
  customer: string;
  inspectionDate: string;
  address: string;
  observations: string;
  inspector: Inspectors;
  status: Status;
}
