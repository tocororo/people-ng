import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {convertLangFromNumberToString, Environment} from 'toco-lib';
import {ME, menuHelp} from "./constants";

@Component({
  selector: 'toco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
    * Returns the available language texts.
    */
   @Input() public languageTexts: string[] = ['Español', 'English'];;
  /**
   * Returns the available language abbreviations.
   */
   @Input() public languageAbbrs: string[] = ['es', 'en'];;
  /**
   * Returns the language currently used as number.
   * The Spanish language is: 0. It is the default.
   * The English language is: 1.
   */
  public currentLang: number;

  /**
   * Gets the icon for menu bar
   */
   @Input() public isBeta: boolean = true;
  /**
   * Gets the icon for menu bar
   */
   @Input() public icon: '';
  /**
   * Gets the icon label for menu bar
   */
  @Input() public iconLabel: '';
  /**
   * Gets the icon alt for menu bar
   */
  @Input() public iconAlt: '';
  /**
   * Gets a list of input `menuOptions` to build the menu bar
   */
   @Input() public menuOptions: MenuElement[];
  /**
   * Gets a list of input `menuLoginOptions` to build the login menu
   */
  @Input() public menuLoginOptions: MenuElement[];
  /**
   * Gets a list of input `menuUser` to build the user menu
   */
  @Input() public menuUser: MenuElement[];
  /**
   * Gets a boolean value of input `showMenuLang` to show a menuAppsnu
   */
  @Input() public showMenuLang: boolean;
  /**
   * Gets a value of input `isAuthenticated` to know when user is authenticated
   */
  @Input() public isAuthenticated: boolean = false;
  /**
   * Gets a value of input `autehnticated_name` to know the name of the authenticated user
   */
  @Input() public autehnticated_name: string = '';

  public _menuLoginOptions: MenuElement[]
  public _menuUser: MenuElement[]
  public _menuOptions: MenuElement[]
  public _menuApps: MenuElement[]

  public sceibaHost: string;

  public simpleMenu = false;

  constructor(private _env: Environment, private _transServ: TranslateService) { }

  ngOnInit() {
    this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
    this.showMenuLang == undefined ? this.showMenuLang = false : null;

    this.sceibaHost = this._env.sceibaHost;

    this._menuLoginOptions = this.menuLoginOptions || [
      {
        nameTranslate : "AUTENTICARSE",
        icon: "lock",
        href: null,
        // click: () => this.login
        click: () => console.log("login===")
      },
      {
        nameTranslate : "REGISTRARSE",
        icon: "assignment_ind",
        href: null,
        // click: () => this.login
        click: () => console.log("login===")
      }
    ];

    this._menuUser = this.menuUser || [
      {
        nameTranslate : "PERFIL_USUARIO",
        icon: "account_circle",
        href: `${ this.sceibaHost }account/settings/profile/`,
        useRouterLink : false
      },
      {
        nameTranslate : "CAMBIAR_CONTRASEÑA",
        icon: "vpn_key",
        href: `${ this.sceibaHost }account/settings/password/`,
        useRouterLink : false
      },
      {
        nameTranslate : "SEGURIDAD",
        icon: "security",
        href: `${ this.sceibaHost }account/settings/security/`,
        useRouterLink : false
      },
      {
        nameTranslate : "APLICACIONES",
        icon: "settings_applications",
        href: `${ this.sceibaHost }account/settings/applications/`,
        useRouterLink : false
      },
      {
        nameTranslate : "SALIR",
        icon: "exit_to_app",
        href: null,
        // click: () => this.logoff
        click: () => console.log("logoff===")
      },
      {
        nameTranslate : "YO",
        icon: "exit_to_app",
        href: null,
        // click: () => this.me
        click: () => console.log("me===")
      },
    ];

    const menuApps = this._menuApps || [
      {
        nameTranslate: "SCEIBA",
        // @ts-ignore
        href : this._env.sceiba,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/sceiba.svg", style: ""},
        divider: true
      },
      {
        nameTranslate : "BUSQUEDA",
        // @ts-ignore
        href : this._env.discover,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/discover.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "REVISTAS_MES",
        // @ts-ignore
        href : this._env.revistasmes,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/revistasmes.png", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "CATALOGO",
        // @ts-ignore
        href : this._env.catalog,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/catalog.svg", style: "width: 55px; height: 55px"},
        divider: true
      },
      {
        nameTranslate : "ORGANIZACIONES",
        // @ts-ignore
        href : this._env.organizations,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/organizaciones.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "PERSONAS",
        // @ts-ignore
        href : '/',
        target: "_self",
        useRouterLink : true,
        img: {src: "/assets/icons/apps/persons.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "VOCABULARIOS",
        // @ts-ignore
        href : this._env.vocabularies,
        target: "_blank",
        useRouterLink : true,
        img: {src: "/assets/icons/apps/vocabs.svg", style: "width: 55px; height: 55px"},
        divider: true
      },
      {
        nameTranslate : "SMOODLE",
        // @ts-ignore
        href : this._env.moodle,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/scourses.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "EVALUACION_APP",
        // @ts-ignore
        href : this._env.sceiba,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/evaluations.svg", style: "width: 55px; height: 55px"}
      },
    ];

    this._menuOptions = this.menuOptions || [
      {
        nameTranslate: "APLICACIONES",
        icon: "apps",
        childrenMenu: menuApps,
        isMenuApps: true
      },
      {
        nameTranslate: "AYUDA",
        icon: "help",
        childrenMenu: menuHelp
      },
      {
        nameTranslate: "USUARIO",
        icon: "account_circle",
        childrenMenu: this.menuLoginOptions,
        hidden: this.isAuthenticated
      },
      {
        nameTranslate: this.autehnticated_name,
        icon: 'person_pin',
        childrenMenu: this.menuUser,
        hidden: this.isAuthenticated
      },
      {
        nameTranslate: "AUTENTICARSE",
        icon: "account_circle",
        childrenMenu: this.menuLoginOptions,
        hidden: this.isAuthenticated
      },
    ];

    this._transServ.setDefaultLang('es');
    this._transServ.use('es');
    this._transServ.addLangs(this.languageAbbrs);
  }

  /*******************************************************************
   * Check if display is less than 600px to update menu classes
   * @returns String
   */
  showHideMenuHeader(): string {
    let menuClass = 'menuAppst-menu-trigger menuAppst-icon-button menuAppst-button-base';
    return window.innerWidth < 600 ? menuClass + ' show-menu' : menuClass + ' hide-menu';
  }
  showHideMenuHeaderElements(): string {
    return (window.innerWidth > 600) ? 'menu-full show-menu-elements' : 'menu-full hide-menu';
  }

  /**
     * Sets the current language.
     * @param index Zero-based index that indicates the current language.
     */
  public setLanguage(index: number): void {
    if (index != this.currentLang) {
      console.log('setLanguage method is called with language: ', index);

      let currentLangAsString: string = convertLangFromNumberToString((this.currentLang = index));

      /* Informs the new current language. */
      this._transServ.use(currentLangAsString);
      // this._recaptchaDynamicLanguageLoaderServ.updateLanguage(currentLangAsString);
    }
  }

}

interface IMG {
  src: string;
  style: string;
}

export interface MenuElement {
  nameTranslate: string;
  href?: string;
  target?: string;
  useRouterLink?: boolean;
  icon?: string;
  click?: () => void;
  img?: IMG;
  divider?: boolean;
  hidden?: boolean;
  isMenuApps?: boolean;
  childrenMenu?: MenuElement[];
}
