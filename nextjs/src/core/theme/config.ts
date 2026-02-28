export interface ThemeConfig {
  name: string;
  version: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
  };
  layout: {
    header: boolean;
    sidebar: boolean;
    footer: boolean;
  };
  features: {
    darkMode: boolean;
    search: boolean;
    comments: boolean;
  };
}

export const defaultTheme: ThemeConfig = {
  name: 'solitude',
  version: '1.0.0',
  colors: {
    primary: '#425aef',
    secondary: '#f7f7fa',
    background: '#ffffff',
    foreground: '#363636',
  },
  layout: {
    header: true,
    sidebar: true,
    footer: true,
  },
  features: {
    darkMode: true,
    search: true,
    comments: true,
  },
};
