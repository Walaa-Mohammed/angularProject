import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KhamsatCommunity, SubjectCategory } from 'src/app/Classes/KhamsatCommunity';
import { KhamsatCommunityService } from '../../../../Services/KhamsatCommunityService';

@Component({
  selector: 'app-addnew-model-implemented',
  templateUrl: './addnew-model-implemented.component.html',
  styleUrls: ['./addnew-model-implemented.component.css']
})
export class AddnewModelImplementedComponent implements OnInit {

  constructor(private fb:FormBuilder,private khamsatCommunityService:KhamsatCommunityService,private router :Router) { }
  communityList:KhamsatCommunity []=[];
  errorMsg: any;
  dataSaved=false;
  massage: string;
  CommunityId: number=0;
  addCommunityForm:any;
  subject:SubjectCategory;
  keys() : Array<string> {
    var keys = Object.keys(this.subject);
    return keys.slice(keys.length / 2);
}
  ngOnInit(): void {
    this.addCommunityForm=this.fb.group({
      Content:['',[Validators.required]],
      Title:['',[Validators.required]],
      Subject:['',[Validators.required]],
      //Comments:['',[Validators.required]],
     // UserID:['',[Validators.required]],
    })
   this.getCommunity();
  }
  get Content(){
    return this.addCommunityForm.get('Content')
  }
  get Title(){
    return this.addCommunityForm.get('Title')
  }
  get Subject(){
    return this.addCommunityForm.get('Subject')
  }


  getCommunity(){
    this.khamsatCommunityService.returnAllCommunity().subscribe((Data)=>{
      this.communityList=Data;
    },(err)=>{
    this.errorMsg=err;
    })
  }
Reset() {  
  this.addCommunityForm.reset();  
 } 
addcommunity(community: KhamsatCommunity) {  
  debugger;  
  community.ID = this.CommunityId;  
  this.khamsatCommunityService.addKhamsatCommunity(community).subscribe(  
   () => {  
    this.dataSaved = true;  
    this.massage = 'Record saved Successfully';  
    this.Reset();  
    this.CommunityId = 0; 
    this.getCommunity();      
   });  
   this.router.navigate(['/aboutKhamsat']);
 }

}
