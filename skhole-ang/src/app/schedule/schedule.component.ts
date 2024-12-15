import { Component, OnInit } from '@angular/core';
import { TutorNavComponent } from '../navs/tutor-nav/tutor-nav.component';
import { JitsiService } from '../jitsi.service';
import { GlobalService } from '../global.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-schedule',
  imports: [TutorNavComponent, CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'] // Corrected styleUrls to match Angular convention
})
export class ScheduleComponent  implements OnInit {
  meetingLink: string | null = null;
  meetings: any[] = [];
  constructor(private jitsiService: JitsiService, private globalService: GlobalService) {}
  ngOnInit(): void {
    this.getScheduledMeetings();
  }

  async getScheduledMeetings() {
    const userId = this.globalService.getId(); // Get user ID from GlobalService
    const url = `http://localhost:8080/skhole/schedule/get/${userId}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        this.meetings = await response.json(); // Store meetings in the array
        console.log('Fetched meetings:', this.meetings);
      } else {
        console.error('Error fetching meetings:', response.statusText);
        alert('Failed to fetch meetings. Please try again later.');
      }
    } catch (error) {
      console.error('Error occurred while fetching meetings:', error);
      alert('An unexpected error occurred. Please check the console for details.');
    }
  }

  async scheduleClass() {
    const title = (document.getElementById('titl') as HTMLInputElement)?.value.trim() || '';
    const desc = (document.getElementById('descr') as HTMLTextAreaElement)?.value.trim() || '';
    const room = (document.getElementById('room') as HTMLInputElement)?.value.trim() || '';
    const grade = (document.getElementById('grade') as HTMLSelectElement)?.value.trim() || '';
    const subject = (document.getElementById('subject') as HTMLSelectElement)?.value.trim() || '';
    const date = (document.getElementById('date') as HTMLInputElement)?.value.trim() || '';
    const user = this.globalService.getId();
    const link = `https://meet.jit.si/${room}`;

    console.log('Inputs:', { title, desc, room, grade, subject, date, user });

    if (!title || !desc || !room || !grade || !subject || !date || !link) {
      alert('Please fill in all the fields.');
      return;
    }

    const payload = { title, desc, room, grade, subject, date, user, link };

    try {
      const response = await fetch('http://localhost:8080/skhole/schedule/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response from server:', responseData);

        // Set the meeting link to display it on the UI
        this.meetingLink = link;

        alert(`Class scheduled successfully! Your meeting link: ${link}`);
      } else {
        console.error('Error while scheduling class:', response.statusText);
        alert('Failed to schedule class. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during API call:', error);
      alert('An unexpected error occurred. Please check the console for details.');
    }

    const jitsiApi = this.jitsiService.initJitsi('jitsi-container', room, subject);
    console.log('Jitsi Meeting Initialized');
  }
}
