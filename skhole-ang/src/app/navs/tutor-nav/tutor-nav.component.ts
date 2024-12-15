import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-tutor-nav',
  imports: [RouterLink],
  templateUrl: './tutor-nav.component.html',
  styleUrl: './tutor-nav.component.css'
})
export class TutorNavComponent {

  constructor(private globalService: GlobalService) {}

  async uploadVideos(){
    console.log("ok");
    console.log(this.globalService.getId);

  const API_URL = "http://localhost:8080/skhole/videos/upload";

  // Get input elements and their values
  const videoInput = document.getElementById('videoInput') as HTMLInputElement | null;
  const thumbnailInput = document.getElementById('thumbnailInput') as HTMLInputElement | null;
  const pdfInput = document.getElementById('pdfInput') as HTMLInputElement | null;

  if (!videoInput || !thumbnailInput) {
    alert('Video and Thumbnail are required.');
    return;
  }

  const videoFile = videoInput.files ? videoInput.files[0] : null;
  const thumbnailFile = thumbnailInput.files ? thumbnailInput.files[0] : null;
  const pdfFile = pdfInput?.files ? pdfInput.files[0] : null;

  if (!videoFile || !thumbnailFile) {
    alert('Please select a video and thumbnail file.');
    return;
  }

  const title = (document.getElementById('title') as HTMLInputElement | null)?.value || '';
  const desc = (document.getElementById('desc') as HTMLInputElement | null)?.value || '';
  const grade = (document.getElementById('grade') as HTMLInputElement | null)?.value || '';
  const subject = (document.getElementById('subject') as HTMLInputElement | null)?.value || '';
  const userId = this.globalService.getId();

  if (!userId) {
    alert('User ID is required. Please log in.');
    return;
  }

  // Create a FormData object to handle file uploads
  const formData = new FormData();
  formData.append('file', videoFile);
  formData.append('thumbnail', thumbnailFile);
  if (pdfFile) {
    formData.append('pdf', pdfFile); // Add PDF only if provided
  }
  formData.append('topic', title);
  formData.append('description', desc);
  formData.append('grade', grade);
  formData.append('subject', subject);
  formData.append('userId', userId); // Attach the user ID

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData, // Send the FormData object directly
    });

    if (response.ok) {
      const videoUrl = await response.text();
      alert('Video uploaded successfully! Video URL: ' + videoUrl);
      // Redirect or further actions
    } else {
      const errorMsg = await response.text();
      alert('Upload failed: ' + errorMsg);
    }
  } catch (error) {
    console.error('Error during video upload:', error);
    alert('An error occurred during the video upload. Please try again.');
  }
  }

}
