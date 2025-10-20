import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { User } from '../models/user.module';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-users-management',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule,RouterOutlet],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent {
  users: User[] = [];
  isAdmin: boolean = false;
  selectedUser: User | null = null;
  newUser: User = { name: '', email: '', username: '', password: '', role: 'User' };
  showSignupForm = true;
  showPass = false;
  activeUser: any = null;
  actionView: boolean = false;
  actionEdit: boolean = false;
  dropdownDirection: 'down' | 'up' = 'down';
  showActionViewEdit: boolean = false;
  @ViewChildren('menuTrigger') menuTriggers!: QueryList<ElementRef>;



  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.showSignupForm = false;
    this.showActionViewEdit = false;
    this.isAdmin = this.authService.isAdmin();
    console.log('Is Admin:', this.isAdmin);
    const navState = history.state;
    this.loadUsers();
    if(navState.reload){
      this.loadUsers(); // your method to fetch latest data
    }

  }

  ngOnChanges(): void {
      this.ngOnInit(); 
  }

  
   addUserForm(): void {
    this.showSignupForm = true;
    // this.showCancelButton = true;
    localStorage.setItem('parent-page', 'users-management');
    localStorage.setItem('registerButtonLabel', 'Add User');
    this.router.navigate(['signup'], { relativeTo: this.router.routerState.root.firstChild });
  }

  // cancel(): void {
  //   this.showSignupForm = false;
  //   this.showCancelButton = false;
  // }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error loading users:', err)
    });
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
    console.log('Admin:', this.isAdmin);
    this.selectedUser = { ...user };
    this.actionEdit = true;
    this.showActionViewEdit = true;
    this.actionView = false;
  }

   selectUserView(user: User): void {
    this.selectedUser = { ...user };
    if(this.actionView==true){
      this.actionView = false;
      this.showActionViewEdit = false;
    }
    else{
      this.actionView = true;
      this.showActionViewEdit = true;
    }
    
    this.actionEdit = false;
  }


  saveUser(): void {
    if (!this.selectedUser || !this.isAdmin) return;

    this.userService.updateUser(this.selectedUser).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Update failed:', err)
    });
    this.showActionViewEdit=false
  }

  addUser(): void {
    if (!this.isAdmin) return;

    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.newUser = { name: '', email: '', username: '', password: '', role: 'User' };
        this.loadUsers();
      },
      error: (err) => console.error('Add failed:', err)
    });
  }

  userView(user: User): void {
    this.selectUserView(user);
  }

  deleteUser(user: User): void {
  this.selectedUser = { ...user };
  if (!this.selectedUser || !this.isAdmin) return;

    this.userService.deleteUser(this.selectedUser).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Delete failed:', err)
    });
    this.showActionViewEdit=false
  }



  // toggleMenu(user: any) {
  //   this.activeUser = this.activeUser === user ? null : user;
  // }

toggleMenu(user: any) {
  this.activeUser = this.activeUser === user ? null : user;

  // Wait for view to update
  setTimeout(() => {
    const index = this.users.indexOf(user);
    const trigger = this.menuTriggers.get(index);
    if (trigger) {
      const rect = trigger.nativeElement.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      console.log('Space below:', spaceBelow);
      this.dropdownDirection = spaceBelow < 300 ? 'up' : 'down';
      console.log('Dropdown direction:', this.dropdownDirection);
    }
  });
}


}
