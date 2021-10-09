import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simpledialog',
  templateUrl: './simpledialog.component.html',
  styleUrls: ['./simpledialog.component.css']
})
export class SimpledialogComponent implements OnInit {

  constructor(private model: NgbModal) { 
    
  }

  ngOnInit(): void {
    
  }

  onMMSExportTapped() {
    this.model.dismissAll('MMS')
  }

  onSMSExportTapped() {
    this.model.dismissAll('SMS')
  }

  onCancelTapped() {
    this.model.dismissAll('Cancel')
  }
}
