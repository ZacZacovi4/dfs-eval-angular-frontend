import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  getSessions() {
    return this.http.get(`${this.baseUrl}/sessions`);
  }

  getProduits() {
    return this.http.get(`${this.baseUrl}/produits`);
  }

  createSession(data: any) {
    return this.http.post(`${this.baseUrl}/sessions`, data);
  }

  rejoindreSession(id: number, utilisateur: string) {
    return this.http.post(`${this.baseUrl}/sessions/${id}/rejoindre`, { utilisateur });
  }

  proposerPrix(id: number, data: any) {
    return this.http.post(`${this.baseUrl}/sessions/${id}/reponse`, data);
  }

  getClassement(id: number) {
    return this.http.get(`${this.baseUrl}/sessions/${id}/classement`);
  }

  getSession(id: number) {
    return this.http.get(`${this.baseUrl}/sessions/${id}`);
  }
}
