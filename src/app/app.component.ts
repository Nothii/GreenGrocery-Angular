import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { TranslateService } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GreenGrocery';
  products: Product[] = [];
  fruit: any;
  fruit_title: any;
  isDarkTheme: boolean = false;

  // Initialize dark_mode and light_mode with translation keys
  dark_mode: string = 'assets/img/crescent-moon.png';
  light_mode: string = 'assets/img/sunny.png';

  constructor(private productService: ProductService, public translate: TranslateService, private renderer: Renderer2) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Set initial language if needed
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.isDarkTheme = localStorage.getItem('theme') === "Dark";
    this.translate.get('assets/img/crescent-moon.png').subscribe((res: string) => {
      this.dark_mode = res;
    });
    this.translate.get('assets/img/sunny.png').subscribe((res: string) => {
      this.light_mode = res;
    });
    this.setBodyBackground();
    this.productText();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.languageBackground();
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.setBodyBackground();
    this.productText();
    this.footerBackground();
    this.cardBackground();
  }

  private setBodyBackground() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    this.renderer.setStyle(document.body, 'background-color', backgroundColor);
  }

  private productText() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private footerBackground() {
    const footerBackgroundColor = this.isDarkTheme ? '#4d4d4d' : '#ffffff';
    this.renderer.setStyle(document.querySelector('.footer'), 'background-color', footerBackgroundColor);
  }
 
  private languageBackground() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private cardBackground() {
    const cardBackground = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const cardContents = document.querySelectorAll('.card-content');
    cardContents.forEach(cardContent => {
        this.renderer.setStyle(cardContent, 'background-color', cardBackground);
    });
  }
}
