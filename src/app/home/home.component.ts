import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;
  customOptions!: OwlOptions;

  constructor(private productService: ProductService, public translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Update products after language change
      this.updateProducts();
      // Check theme after language change
      this.checkDarkTheme();
    });
  }

  ngAfterViewInit(): void {
    // Check theme after view initialization
    this.checkDarkTheme();
  }

  ngOnInit(): void {
    // Check theme on component initialization
    this.checkDarkTheme();
    // Update products on component initialization
    this.updateProducts();
  }

  ngOnDestroy(): void {
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

  private checkDarkTheme() {
    // Check if dark theme is enabled in localStorage
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
  }

  // Method to toggle dark mode
  toggleDarkMode() {
    this.isDarkTheme = !this.isDarkTheme;
    // Update localStorage with the new theme preference
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
  }

  private applyThemeStyles() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }
}
