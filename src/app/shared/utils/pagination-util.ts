import { PageOptions } from "../interfaces/page-options";
import { HttpParams } from "@angular/common/http";


export function processPageOptionParams(pageOptions: PageOptions): HttpParams {
  let params = new HttpParams();
  params = params.append('page', pageOptions.page);
  params = params.append('size', pageOptions.size);
  if (pageOptions.sort) {
    pageOptions.sort.forEach((value) => {
      if (value.direction && value.field) {
        params = params.append('sort', `${value.field},${value.direction}`);
      }
    }); 
  }
  return params;
}


