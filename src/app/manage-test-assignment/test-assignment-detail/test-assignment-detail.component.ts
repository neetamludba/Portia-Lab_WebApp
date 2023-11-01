import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'app/manage-user/user.service';
import { TestAssignment } from 'app/models/test-assignment.model';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-test-assignment-detail',
  templateUrl: './test-assignment-detail.component.html',
  styleUrls: ['./test-assignment-detail.component.css'],
})
export class TestAssignmentDetailComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TestAssignmentDetailComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  assignmentDetailsForm = this.formBuilder.group({
    assignedTo: new FormControl(null, [Validators.required]),
  });

  users: User[] = [];

  errorMessage: string = '';

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getAllActiveUsers()
      .then((users) => {
        this.users = users.slice();
      })
      .catch((err) => console.log(err));
  }

  changeUser(e: any) {
    this.assignmentDetailsForm.setValue({ assignedTo: e.target.value });
  }

  addAssignment() {
    this.dialogRef.close({
      ...this.data,
      assignedToID: this.assignmentDetailsForm.get('assignedTo')?.value,
    });
  }
}
