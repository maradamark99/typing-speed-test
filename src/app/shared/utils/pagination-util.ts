import { PageOptions } from "../interfaces/page-options";
import { HttpParams } from "@angular/common/http";

export default class PaginationUtil {
  private static DEFAULT_PAGE = 0;
  private static DEFAULT_SIZE = 10;

  static processPageOptionParams(pageOptions: Partial<PageOptions>): HttpParams {
    let params = new HttpParams();
    params = params.append('page', pageOptions.page ?? this.DEFAULT_PAGE);
    params = params.append('size', pageOptions.size ?? this.DEFAULT_SIZE);

    if (pageOptions.sort) {
      pageOptions.sort.forEach((value) => {
        if (value.direction && value.field) {
          params = params.append('sort', `${value.field},${value.direction}`);
        }
      }); 
    }
    return params;
  }
}




