import { Toaster_Service } from './../../../../Classes/ToasterNg';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';


@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  closeResult: string|any;
  u_title : any;
  u_message :any;
  title : any;
  message :any;
  alloperators:any[] | undefined;

  
  


  constructor(private modalService: NgbModal, private freeAPI: API_Services,private Snake_Wait:Snake_Waiting) { }

  ngOnInit(): void {
    this.Snake_Wait.start_bar("Please Wait")
    this.freeAPI.getlistofOperators()
    .subscribe
    (
      res=>
      {
        this.Snake_Wait.close_bar();
        let data = JSON.parse(JSON.stringify(res));
        this.alloperators = data.http_response;
        // console.log(data.http_response.length);
        Toaster_Service.toastNotification_S("Loaded Complete");
      },
      err=>
      {
        this.Snake_Wait.close_bar();
        Toaster_Service.toastNotification_D('Fetching Error');
        console.log(err);
      }
    )
  }



  delete_template(delete1: any) {
    this.modalService.open(delete1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  update_templates(content:any)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  update_Template()  // remain
  {

  }

  Cancel_Auth()  // Remain
  {

  }

  submit_Template() //Remain
  {

    let title = this.title;
    let code  = this.message;
    let body = 
    {
      name:title,
      code:code
    }

    this.freeAPI.create_operator(body)
    .subscribe
    (
      res=>
      {
        let data = JSON.parse(JSON.stringify(res));
        Toaster_Service.toastNotification_S(data.http_response);

      },
      err=>
      {
        Toaster_Service.toastNotification_D('Failed to create operator');
        console.log(err);

      }

    )


  }

  OnCheckBoxClicked(event:any) // Remain
  {
    console.log(event)
  }


  Checked_All() // Remain
  {

  }
}
