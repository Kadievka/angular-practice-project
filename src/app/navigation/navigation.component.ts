import { Component, OnInit } from '@angular/core';
import { faCoffee, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.canLogin = false;
    }else{
      this.canLogin = true;
    }
  }

  faCoffee = faCoffee;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  canLogin: boolean = true;

  closeResult = '';

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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.modalService.dismissAll();
    window.location.reload();
  }

}
