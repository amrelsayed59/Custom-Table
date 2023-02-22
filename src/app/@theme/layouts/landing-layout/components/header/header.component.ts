import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Languages } from '@core/data/Languages.interface';
import { TranslationKeys } from '@core/enums/translation-keys.enum';
import { TranslationService } from '@core/services/translate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  translationPrefix: string = `PAGES.NAVBAR.INPUTS.`;
  appLanguages: Languages[] = [
    {
      langName: 'arabic',
      langFilePrifix: 'ar',
      langIcon: '/assets/ar-lang.svg',
    },
    {
      langName: 'english',
      langFilePrifix: 'en',
      langIcon: '/assets/en-lang.svg',
    },
  ];

  /** get default language from local storage on app start up */
  defaultLang =
    localStorage.getItem(TranslationKeys.TRANSLATION_KEY) !== null
      ? localStorage.getItem(TranslationKeys.TRANSLATION_KEY)?.toString()
      : 'en';

  selectedLanguageName: any;

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService,
    private dateAdapter: DateAdapter<Date>,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.selectedLanguageName = this.appLanguages.find(
      (ele) => ele.langFilePrifix === this.defaultLang
    );
  }

  /** @description this method is used to toggle between languages
   *
   */
  changeLang(lang?: any) {
    // Add the selected language to the Local Storage
    localStorage.setItem(TranslationKeys.TRANSLATION_KEY, lang);
    // this.translate.setDefaultLang(lang);
    // this.translate.use(lang);
    ////////////////////////////////////

    if (lang === 'ar') {
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale(lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      // this.document.getElementById('theme')?.setAttribute('href', 'assets/bootstrap-rtl/bootstrap-rtl.min.css');
      // // this line to change the dire of the index page
      this.document.getElementById('htmlParent')?.setAttribute('dir', 'rtl');
      // // this line to change the language
      this.document.getElementById('htmlParent')?.setAttribute('lang', 'ar');
      ////
      this.selectedLanguageName = this.appLanguages.find(
        (ele) => ele.langFilePrifix === lang
      );
      window.location.reload();
    } else {
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale(lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      // this.document.getElementById('theme')?.setAttribute('href', 'assets/bootstrap/css/bootstrap.min.css');
      // this.document.getElementById('theme').setAttribute('href', '');
      // // this line to change the dire of the [index page]
      this.document.getElementById('htmlParent')?.setAttribute('dir', 'ltr');
      // // this line to change the language
      this.document.getElementById('htmlParent')?.setAttribute('lang', 'en-US');
      //////
      this.selectedLanguageName = this.appLanguages.find(
        (ele) => ele.langFilePrifix === lang
      );
      window.location.reload();
    }
  }
}
