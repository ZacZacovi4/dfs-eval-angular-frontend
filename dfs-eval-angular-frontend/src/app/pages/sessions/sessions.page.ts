import { Component, inject, signal, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sessions.html',
})
export class SessionsPage implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  auth = inject(AuthService);

  sessions = signal<any[]>([]);
  nouvelleSession = '';

  utilisateur = 'b@b.com'; // temporaire

  ngOnInit() {
    this.chargerSessions();
  }

  chargerSessions() {
    this.api.getSessions().subscribe((data: any) => {
      this.sessions.set(data);
    });
  }

  creer() {
    if (!this.nouvelleSession.trim()) return;

    const email = this.auth.user()?.email;
    if (!email) return;

    this.api
      .createSession({
        nom: this.nouvelleSession,
        createur: email,
      })
      .subscribe(() => {
        this.nouvelleSession = '';
        this.chargerSessions();
      });
  }

  rejoindre(id: number) {
    const email = this.auth.user()?.email;
    if (!email) return;

    this.api.rejoindreSession(id, email).subscribe(() => {
      alert('Session rejointe !');
      this.chargerSessions();
    });
  }

  jouer(id: number) {
    this.router.navigate(['/jeu', id]);
  }

  voirClassement(id: number) {
    this.router.navigate(['/classement', id]);
  }

  estParticipant(session: any) {
    return session.participants.some((p: any) => p.utilisateur === this.auth.user()?.email);
  }
}
