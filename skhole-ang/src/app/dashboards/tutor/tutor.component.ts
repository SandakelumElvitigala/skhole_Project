import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TutorNavComponent } from '../../navs/tutor-nav/tutor-nav.component';
import { GlobalService } from '../../global.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor',
  imports: [RouterOutlet, TutorNavComponent, CommonModule],
  templateUrl: './tutor.component.html',
  styleUrl: './tutor.component.css'
})


export class TutorComponent implements OnInit {
  globalName: string = '';
  videos: any[] = []; // Use `any[]` to store the video data

  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
    // Access the global name from localStorage using GlobalService
    this.globalName = this.globalService.getName();
    this.fetchAndDisplayTotalViews(this.globalService.getId());
    this.fetchAndDisplayVideoCount(this.globalService.getId());
    // Fetch videos when the component initializes
    this.getVideos(this.globalService.getId());
  }

  onVideoSelect(video: any): void {
    // Navigate to video.component with the selected video data
    this.router.navigate(['/video'], { state: { video } });
  }

  // Fetch video data
  async getVideos(userId:string): Promise<void> {
    console.log('Fetching videos...');
    const API_URL = (userId: string): string =>`http://localhost:8080/skhole/videos/view/${userId}`;

    try {
      const response = await fetch(API_URL(userId));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the video data and update the component
      this.videos = await response.json();
      console.log('Fetched videos:', this.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }


async fetchAndDisplayTotalViews(userId: string): Promise<void> {

  const API_URL_TOTAL = (userId: string): string =>
    `http://localhost:8080/skhole/videos/get/total/views/${userId}`;
  try {
    // Fetch the video count from the API
    const response: Response = await fetch(API_URL_TOTAL(userId));

    if (response.ok) {
      // Parse JSON response
      const viewCount: number = await response.json();
      console.log(`User ${userId} has ${viewCount} views.`);

      // Update the UI with the view count
      const playsElement = document.getElementById('plays');
      if (playsElement) {
        playsElement.textContent = viewCount !== 0 ? `${viewCount}` : "--";
      }
    } else {
      console.error('Failed to fetch view count');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Function to fetch and display video count
async fetchAndDisplayVideoCount(userId: string): Promise<void> {
  const API_URL = (userId: string): string => 
    `http://localhost:8080/skhole/videos/count/${userId}`;
  try {
    // Fetch the video count from the API
    const response: Response = await fetch(API_URL(userId));

    if (response.ok) {
      // Parse JSON response
      const videoCount: number = await response.json();
      console.log(`User ${userId} has uploaded ${videoCount} videos.`);

      // Update the UI with the video count
      const videoCountElement = document.getElementById('videoCount');
      if (videoCountElement) {
        videoCountElement.textContent = videoCount !== 0 ? `${videoCount}` : "--";
      }
    } else {
      console.error('Failed to fetch video count');
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}




  // Example method to update the global name
  updateGlobalName(newName: string): void {
    this.globalService.setName(newName);
    this.globalName = newName; // Update the local component variable
  }
}