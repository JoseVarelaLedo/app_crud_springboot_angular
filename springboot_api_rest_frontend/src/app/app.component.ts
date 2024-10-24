import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListaContactosComponent } from "./components/lista-contactos/lista-contactos.component";
import { ListaEmpleadosComponent } from "./components/lista-empleados/lista-empleados.component";
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaContactosComponent, ListaEmpleadosComponent ,RouterLink, FormsModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema Gestión BD';
  constructor(private readonly translate: TranslateService) {
    // Definir los idiomas disponibles
    this.translate.addLangs(['en', 'es', 'gz']);
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('es');

    // Elegir un idioma según la preferencia del navegador o usar el idioma predeterminado
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es|gz/) ? browserLang : 'es');
  }

  // Método para cambiar el idioma
  changeLanguage(lang: string) {
    console.log (this.translate);
    this.translate.use(lang);
  }
}
