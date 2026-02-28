import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-classement',
  standalone: true,
  templateUrl: './classement.html',
})
export class ClassementPage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private router = inject(Router);

  classement = signal<any[]>([]);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getClassement(id).subscribe((data: any) => {
      this.classement.set(data);
    });
  }

  retour() {
    this.router.navigate(['/']);
  }
}
