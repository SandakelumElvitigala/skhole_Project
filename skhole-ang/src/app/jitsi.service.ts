import { Injectable } from '@angular/core';

declare var JitsiMeetExternalAPI: any; // Declaring the external Jitsi API globally

@Injectable({
  providedIn: 'root'
})
export class JitsiService {

  constructor() { }

  public initJitsi(containerId: string, roomName: string, subject: string) {
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      parentNode: document.querySelector(`#${containerId}`),
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WELCOME_PAGE: false,
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'hangup']
      },
      userInfo: {
        displayName: subject
      }
    };
    const api = new JitsiMeetExternalAPI(domain, options);
    return api;
  }
}
