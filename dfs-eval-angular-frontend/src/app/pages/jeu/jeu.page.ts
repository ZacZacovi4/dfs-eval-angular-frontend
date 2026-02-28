import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-jeu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jeu.html',
})
export class JeuPage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private router = inject(Router);
  private auth = inject(AuthService);

  sessionId!: number;

  session = signal<any>(null);
  produit = signal<any>(null);
  resultat = signal<any>(null);

  prixPropose!: number;

  ngOnInit() {
    this.sessionId = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getSession(this.sessionId).subscribe((data: any) => {
      this.session.set(data);
      this.chargerProduitActuel();
    });
  }

  chargerProduitActuel() {
    const session = this.session();
    if (!session) return;

    const participant = session.participants.find(
      (p: any) => p.utilisateur === this.auth.user()?.email,
    );

    if (!participant) {
      alert('Vous devez rejoindre la session avant de jouer.');
      this.router.navigate(['/']);
      return;
    }

    const index = participant.reponses.length;
    const produitId = session.produits[index];

    this.api.getProduits().subscribe((produits: any) => {
      const p = produits.find((prod: any) => prod.id === produitId);
      this.produit.set(p);
    });
  }

  valider() {
    const email = this.auth.user()?.email;
    if (!email) return;

    this.api
      .proposerPrix(this.sessionId, {
        utilisateur: email,
        prixPropose: Number(this.prixPropose),
      })
      .subscribe((res: any) => {
        this.resultat.set(res);

        // 🔥 Recharge la session pour mettre à jour reponses
        this.api.getSession(this.sessionId).subscribe((data: any) => {
          this.session.set(data);
        });
      });
  }

  suivant() {
    this.resultat.set(null);
    this.prixPropose = 0;
    this.chargerProduitActuel();
  }

  allerClassement() {
    this.router.navigate(['/classement', this.sessionId]);
  }
}
