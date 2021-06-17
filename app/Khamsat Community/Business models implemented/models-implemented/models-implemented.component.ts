import { Component, OnInit } from '@angular/core';
import { KhamsatCommunity, SubjectCategory } from 'src/app/Classes/KhamsatCommunity';
import { KhamsatCommunityService } from '../../../../Services/KhamsatCommunityService';

@Component({
  selector: 'app-models-implemented',
  templateUrl: './models-implemented.component.html',
  styleUrls: ['./models-implemented.component.css']
})
export class ModelsImplementedComponent implements OnInit {

  
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
