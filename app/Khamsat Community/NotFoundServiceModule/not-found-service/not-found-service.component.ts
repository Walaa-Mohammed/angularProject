import { Component, OnInit } from '@angular/core';
import { KhamsatCommunity, SubjectCategory } from 'src/app/Classes/KhamsatCommunity';
import { KhamsatCommunityService } from '../../../../Services/KhamsatCommunityService';

@Component({
  selector: 'app-not-found-service',
  templateUrl: './not-found-service.component.html',
  styleUrls: ['./not-found-service.component.css']
})
export class NotFoundServiceComponent implements OnInit {

  constructor(private communityService:KhamsatCommunityService) { }
  communityList:KhamsatCommunity [];
  errorMsg: any;
  dataSaved=false;
  massage: string;

  ngOnInit(): void {

   this.getCommunity();
 
  }
  getCommunity(){
    this.communityService.returnAllCommunity().subscribe(
    (Data)=>{
      this.communityList=Data;
     },
    (err)=>{
    this.errorMsg=err;
    })
  }

}
