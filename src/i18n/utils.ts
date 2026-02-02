import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t<K extends keyof typeof ui[typeof defaultLang]>(key: K) {
        return (ui[lang] as typeof ui[typeof defaultLang])[key] || ui[defaultLang][key];
    }
}
export function getLocalizedPath(path: string, lang: string) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (lang === defaultLang) return cleanPath;
    return `/${lang}${cleanPath}`.replace(/\/+/g, '/');
}
