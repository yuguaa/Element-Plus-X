import type {
  BundledLanguage,
  BundledTheme,
  LanguageInput,
  StringLiteralUnion,
  ThemeRegistrationAny
} from 'shiki';

// 初始化Shiki 高亮器配置
export interface InitShikiOptions {
  // 语言列表
  langs: Array<LanguageInput | BundledLanguage> | undefined;
  // 主题列表
  themes: Partial<
    Record<
      string,
      ThemeRegistrationAny | StringLiteralUnion<BundledTheme, string>
    >
  >;
}
