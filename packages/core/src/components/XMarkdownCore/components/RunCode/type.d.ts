export interface DialogOptions {
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
}

export interface DrawerOptions {
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt';
}

export interface ElxRunCodeProps {
  code: string[];
  content: string;
  preClass: string;
  preStyle: any;
  lang: string;
  visible: boolean;
  customClass?: string;
  mode?: 'dialog' | 'drawer';
  theme?: string;
  dialogOptions?: DialogOptions;
  drawerOptions?: DrawerOptions;
}
