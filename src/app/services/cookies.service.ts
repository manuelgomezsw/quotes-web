import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor() {}

  public setCookie(name: string, value: string) {
    let expiration: Date = new Date();
    expiration.setTime(expiration.getTime() + 1 * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${expiration.toUTCString()}`;

    document.cookie = `${name}=${value}; ${expires}`;
  }

  public getCookie(name: string): string {
    let cookies = document.cookie.split(';');
    let valueCookie: string;

    for (let i: number = 0; i < cookies.length; i += 1) {
      valueCookie = cookies[i].replace(/^\s+/g, '');
      if (valueCookie.indexOf(name) == 0) {
        return valueCookie.substring(name.length + 1, valueCookie.length);
      }
    }

    return '';
  }
}
