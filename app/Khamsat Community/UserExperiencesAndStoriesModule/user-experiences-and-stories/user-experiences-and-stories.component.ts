import { Component, OnInit } from '@angular/core';
import { KhamsatCommunity, SubjectCategory } from 'src/app/Classes/KhamsatCommunity';
import { KhamsatCommunityService } from '../../../../Services/KhamsatCommunityService';

@Component({
  selector: 'app-user-experiences-and-stories',
  templateUrl: './user-experiences-and-stories.component.html',
  styleUrls: ['./user-experiences-and-stories.component.css']
})
export class UserExperiencesAndStoriesComponent implements OnInit {

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
