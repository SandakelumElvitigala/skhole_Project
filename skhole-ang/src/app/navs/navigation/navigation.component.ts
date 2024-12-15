import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../global.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  imports: [FormsModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('username') usernameRef!: ElementRef;
  @ViewChild('email') emailRef!: ElementRef;
  @ViewChild('password') passwordRef!: ElementRef;
  @ViewChild('passwordRepeat') passwordRepeatRef!: ElementRef;
  @ViewChild('role') roleRef!: ElementRef;

  @ViewChild('mail') unRef!: ElementRef;
  @ViewChild('pw') pwRef!: ElementRef;

  @ViewChild('reg') myModal!: ElementRef;
  @ViewChild('log') myModal1!: ElementRef;

  globalName: string = '';
  globalId: string = '';

  // Inject GlobalService and Router in a single constructor
  constructor(private router: Router, private globalService: GlobalService) { }

  // Register method
  async register() {
    // Getting values from the inputs using ViewChild
    const Name = this.nameRef.nativeElement.value;
    const userName = this.usernameRef.nativeElement.value;
    const email = this.emailRef.nativeElement.value;
    const password = this.passwordRef.nativeElement.value;
    const confirmPassword = this.passwordRepeatRef.nativeElement.value;
    const role = this.roleRef.nativeElement.value;

    // Validation checks
    if (!Name || !userName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const name = `${Name}`;
    const API_URL = "http://localhost:8080/skhole/users/register";

    try {
      // Send request to the backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          userName,
          role,
          email,
          password, // Send the password to the backend
          profilePicture: null, // No profile picture to send
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('User registered successfully:', result);
      alert('Registration successful!');

      // After registration, update the global name
      this.updateGlobalName(name);
      this.closeModal();

      // Navigate to the home page
      this.router.navigate(['/dashboardTutor']);

    } catch (error) {
      console.error('Error registering user:', error);
      alert('There was an error registering the user. Please try again.');
    }
  }

  // Login method
  async login(): Promise<void> {
    const API_URL: string = "http://localhost:8080/skhole/users/login";

    // Define an interface for the expected response data structure
    interface UserData {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string;
    }

    // Get the input values using ViewChild
    const email: string = this.unRef.nativeElement.value;
    const password: string = this.pwRef.nativeElement.value;

    const loginData = { email, password };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const userData: UserData = await response.json();
        // Store user information in localStorage
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('username', userData.name);
        localStorage.setItem('image', userData.image);
        localStorage.setItem('type', userData.role);
        console.log(userData);
        // Redirect based on the user's role
        this.updateGlobalName(userData.name);
        this.updateGlobalId(userData.id);
        this.closeModal();

        if (userData.role === 'student') {
          this.router.navigate(['/dashboardStudent']);
        } else {
          this.router.navigate(['/dashboardTutor']);
        }
      } else {
        // Login failed, display an error message
        const errorMsg: string = await response.text();
        alert(`Login failed: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  }

  closeModal(): void {
    if (this.myModal) {
      // This assumes you're using a modal with a "hidden" class or Angular controls visibility through a flag
      this.myModal.nativeElement.style.display = 'none';
    }
    else if(this.myModal1){
      this.myModal1.nativeElement.style.display = 'none';
    }
  }

  // Method to update the global name
  updateGlobalName(name: string): void {
    this.globalService.setName(name);
    this.globalName = name;  // Update the local component variable
  }

  updateGlobalId(id: string): void{
    this.globalService.setId(id);
    this.globalId = id;
  }

}
