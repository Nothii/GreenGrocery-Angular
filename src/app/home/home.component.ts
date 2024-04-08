import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;

  constructor(private productService: ProductService, public translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Set initial language if needed
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    // Subscribe to language changes
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateProducts();
    });
  }

  ngAfterViewInit(): void {
    console.log('Dark mode:', this.isDarkTheme);
  }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark";
    this.updateProducts();
  }

  ngOnDestroy(): void {
    // Unsubscribe from language changes to prevent memory leaks
    this.langChangeSubscription.unsubscribe();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
  }

  private updateProducts() {
    this.products = this.productService.getProducts();
  }
}
