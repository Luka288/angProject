import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorPageFixService extends MatPaginatorIntl{
 override getRangeLabel = (page: number, pageSize: number, )=>{
    return `Page ${page}`

    // variaton 2 
    //!! return `Page ${page} Products on Page ${pageSize}`
  }
}
