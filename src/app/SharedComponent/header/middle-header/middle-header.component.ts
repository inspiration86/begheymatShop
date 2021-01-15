import {Component, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";
import {Post} from "../../../Post";
import {SearchService} from "../../../search.service";

@Component({
  selector: 'app-middle-header',
  templateUrl: './middle-header.component.html',
  styleUrls: ['./middle-header.component.css']
})
export class MiddleHeaderComponent implements OnInit {
  listResultSearch: SelectItem[];
  successSearch: boolean;
  queryString:any[]=[];
  names: any;
  post: Post[]
  constructor(  private dataService: SearchService) {
    this.names = ['ماسک', 'ژل', 'موبایل', 'ماسک شماره 2', 'Natasha', 'Marry', 'Zian', 'karan']
    this.listResultSearch = [
      {label: 'ماسک', value: null},
      {label: 'ماسک صورت', value: {id: 1, name: 'New York', code: 'NY'}},
      {label: 'گوشی شیومی', value: {id: 2, name: 'Rome', code: 'RM'}},
      {label: 'موبایل', value: {id: 3, name: 'London', code: 'LDN'}},
      {label: 'موبایل', value: {id: 4, name: 'Istanbul', code: 'IST'}},
      {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
    ];
  }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(posts => {
      this.post = posts;
      this.dataService.postsData = posts;
    });
  }

  search(event: any) {
    this.successSearch = true;
    const serachTerm = event.target.value;
    this.queryString.splice(0,this.queryString.length)
    for (let i;i<=10;i++) {
      let x = this.listResultSearch.filter(x => x.label.startsWith(serachTerm))
      if (x.length > 0) {
        this.queryString.push({
            value: this.listResultSearch.filter(x => x.label.startsWith(serachTerm))
          }
        )
      } else {
        this.successSearch = false;
        this.queryString.splice(0, this.queryString.length)

      }
    }
    // console.log(this.queryString.length)
    if (serachTerm.length <= 0) {
      this.successSearch = false;
    }

  }
  search1(event: any) {

    for (var i = 0; i < this.names.length; i++) {
      if (this.names.indexOf(event.target.value) > -1) {
        console.log(this.names.indexOf(event.target.value))
        this.successSearch = true;
        this.queryString.push({
          value:event.target.value
        });

        break;
      }
      this.successSearch = false;
      this.queryString.splice(0,this.queryString.length)
    }



  }
  onSelect(address: any) {
    this.successSearch = false;
  }
  onSelectedFilter(e) {
    this.getFilteredExpenseList();
  }
  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0)
      this.post = this.dataService.filteredListOptions();
    else {
      this.post = this.dataService.postsData;
    }

  }
  onSelectedOption(x:any){

  }
}
