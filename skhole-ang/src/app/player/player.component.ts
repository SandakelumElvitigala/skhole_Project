import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  video: any;
  currentVideoUrl: string | undefined;
  isPlaying = false;
  videoElement!: HTMLVideoElement;
  playPauseButton!: HTMLElement;
  volumeSlider!: HTMLInputElement;
  muteButton!: HTMLElement;
  progressBar!: HTMLElement;
  playbackLine!: HTMLElement;
  currentTimeRef!: HTMLElement;
  maxDurationRef!: HTMLElement;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve video data from state
    this.video = history.state.video;

    if (!this.video) {
      console.error('No video data found!');
    } else {
      this.currentVideoUrl = this.video.url; // Set the video URL
    }

    // DOM element references
    this.videoElement = document.getElementById('video') as HTMLVideoElement;
    this.playPauseButton = document.getElementById('play-pause') as HTMLElement;
    this.volumeSlider = document.getElementById('volume') as HTMLInputElement;
    this.muteButton = document.getElementById('mute') as HTMLElement;
    this.progressBar = document.querySelector('.progress-bar') as HTMLElement;
    this.playbackLine = document.querySelector('.playback-line') as HTMLElement;
    this.currentTimeRef = document.getElementById('current-time') as HTMLElement;
    this.maxDurationRef = document.getElementById('max-duration') as HTMLElement;

    // Add event listeners
    this.playPauseButton.addEventListener('click', this.togglePlayPause.bind(this));
    this.volumeSlider.addEventListener('input', this.changeVolume.bind(this));
    this.muteButton.addEventListener('click', this.toggleMute.bind(this));
    this.playbackLine.addEventListener('click', this.seekVideo.bind(this));

    this.videoElement.addEventListener('timeupdate', this.updateProgress.bind(this));

    // Key events for play/pause
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        this.togglePlayPause();
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up event listeners
    document.removeEventListener('keydown', this.togglePlayPause);
  }

  togglePlayPause(): void {
    if (this.videoElement.paused) {
      this.videoElement.play();
      this.playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      this.videoElement.pause();
      this.playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    this.isPlaying = !this.isPlaying;
  }

  changeVolume(): void {
    this.videoElement.volume = parseInt(this.volumeSlider.value) / 100;
    if (this.videoElement.volume === 0) {
      this.muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
      this.muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  }

  toggleMute(): void {
    if (this.videoElement.muted) {
      this.videoElement.muted = false;
      this.muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      this.volumeSlider.value = (this.videoElement.volume * 100).toString();
    } else {
      this.videoElement.muted = true;
      this.muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      this.volumeSlider.value = '0';
    }
  }

  seekVideo(event: MouseEvent): void {
    const timelineWidth = this.playbackLine.clientWidth;
    this.videoElement.currentTime = (event.offsetX / timelineWidth) * this.videoElement.duration;
  }

  updateProgress(): void {
    const currentTime = this.videoElement.currentTime;
    const duration = this.videoElement.duration;
    const percentage = (currentTime / duration) * 100;
    this.progressBar.style.width = `${percentage}%`;

    this.currentTimeRef.innerHTML = this.formatTime(currentTime);
    this.maxDurationRef.innerText = this.formatTime(duration);
  }

  formatTime(time: number): string {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
  }

  playVideo(videoUrl: string): void {
    this.currentVideoUrl = videoUrl;
    if (this.videoElement) {
      this.videoElement.load();
      this.videoElement.play();
    }
  }
}
