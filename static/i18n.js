(function (global) {
    'use strict';

    var SUPPORTED = ['ka', 'en', 'ru'];
    var DEFAULT_LANG = 'ka';
    var STORAGE_KEY = 'site_lang';

    var UI = {
        'nav.projects': { ka: 'პროექტები', en: 'PROJECTS', ru: 'ПРОЕКТЫ' },
        'nav.about': { ka: 'შესახებ', en: 'ABOUT', ru: 'О НАС' },
        'nav.contact': { ka: 'კონტაქტი', en: 'CONTACT', ru: 'КОНТАКТ' },
        'nav.admin': { ka: 'ადმინი', en: 'ADMIN', ru: 'АДМИН' },
        'search.placeholder': { ka: 'ძებნა სათაურით', en: 'Search by title', ru: 'Поиск по названию' },
        'filters': { ka: 'ფილტრები', en: 'FILTERS', ru: 'ФИЛЬТРЫ' },
        'filters.type': { ka: 'ტიპი', en: 'Type', ru: 'Тип' },
        'filters.period': { ka: 'პერიოდი', en: 'Period', ru: 'Период' },
        'filters.clear': { ka: 'ყველა ფილტრის გასუფთავება', en: 'Clear all filters', ru: 'Сбросить фильтры' },
        'project.location': { ka: 'ადგილმდებარეობა რუკაზე', en: 'Location on map', ru: 'Местоположение на карте' },
        'project.description': { ka: 'აღწერა', en: 'Description', ru: 'Описание' },
        'project.images': { ka: 'სურათები', en: 'Images', ru: 'Изображения' },
        'project.info': { ka: 'პროექტის ინფორმაცია', en: 'Project information', ru: 'Информация о проекте' },
        'project.info.empty': { ka: 'ინფორმაცია არ არის მითითებული', en: 'No information provided', ru: 'Информация не указана' },
        'project.main_image': { ka: 'მთავარი სურათი', en: 'Main image', ru: 'Главное изображение' },
        'project.image': { ka: 'სურათი', en: 'Image', ru: 'Изображение' },
        'project.not_found': { ka: 'პროექტი ვერ მოიძებნა', en: 'Project not found', ru: 'Проект не найден' },
        'project.back_home': { ka: 'მთავარ გვერდზე', en: 'Back to home', ru: 'На главную' },
        'map.view_details': { ka: 'იხილეთ დეტალები', en: 'View details', ru: 'Подробнее' },
        'loading': { ka: 'იტვირთება...', en: 'Loading...', ru: 'Загрузка...' },
        'footer.rights': { ka: 'ყველა უფლება დაცულია.', en: 'All rights reserved.', ru: 'Все права защищены.' },
        'cat.ეკლესია': { ka: 'ეკლესია', en: 'Church', ru: 'Церковь' },
        'cat.ციხე': { ka: 'ციხე', en: 'Fortress', ru: 'Крепость' },
        'cat.მუზეუმი': { ka: 'მუზეუმი', en: 'Museum', ru: 'Музей' },
        'cat.ძეგლი': { ka: 'ძეგლი', en: 'Monument', ru: 'Памятник' },
        'cat.სხვა': { ka: 'სხვა', en: 'Other', ru: 'Другое' },
        'period.ძველი': { ka: 'ძველი', en: 'Ancient', ru: 'Древний' },
        'period.შუა საუკუნეები': { ka: 'შუა საუკუნეები', en: 'Medieval', ru: 'Средневековье' },
        'period.ახალი': { ka: 'ახალი', en: 'Modern', ru: 'Новый' },
        'period.თანამედროვე': { ka: 'თანამედროვე', en: 'Contemporary', ru: 'Современный' }
    };

    function normalizeLang(lang) {
        return SUPPORTED.indexOf(lang) >= 0 ? lang : DEFAULT_LANG;
    }

    function getSiteLang() {
        try {
            return normalizeLang(localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG);
        } catch (e) {
            return DEFAULT_LANG;
        }
    }

    function setSiteLang(lang) {
        lang = normalizeLang(lang);
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) { /* ignore */ }
        document.documentElement.lang = lang;
        global.dispatchEvent(new CustomEvent('sitelangchange', { detail: { lang: lang } }));
        applySiteI18n();
    }

    function t(key, lang) {
        lang = normalizeLang(lang || getSiteLang());
        var entry = UI[key];
        if (!entry) return key;
        return entry[lang] || entry[DEFAULT_LANG] || key;
    }

    function localizedField(project, fieldBase, lang) {
        lang = normalizeLang(lang || getSiteLang());
        if (!project) return '';
        if (lang === DEFAULT_LANG) return project[fieldBase] || '';
        var translated = project[fieldBase + '_' + lang];
        if (translated && String(translated).trim()) return translated;
        return project[fieldBase] || '';
    }

    function localizedProjectInfo(project, lang) {
        lang = normalizeLang(lang || getSiteLang());
        if (!project) return {};
        if (lang === DEFAULT_LANG) return project.project_info || {};
        var translated = project['project_info_' + lang];
        if (translated && Object.keys(translated).length) return translated;
        return project.project_info || {};
    }

    function applySiteI18n() {
        var lang = getSiteLang();
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var val = t(key, lang);
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder') !== null) {
                el.placeholder = val;
            } else {
                el.textContent = val;
            }
        });
        document.querySelectorAll('[data-i18n-cat]').forEach(function (el) {
            var cat = el.getAttribute('data-i18n-cat');
            el.textContent = t('cat.' + cat, lang) || cat;
        });
        document.querySelectorAll('[data-i18n-period]').forEach(function (el) {
            var period = el.getAttribute('data-i18n-period');
            el.textContent = t('period.' + period, lang) || period;
        });
        document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
            var active = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    function initLangSwitcher() {
        document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                setSiteLang(btn.getAttribute('data-lang'));
            });
        });
    }

    global.SiteI18n = {
        getSiteLang: getSiteLang,
        setSiteLang: setSiteLang,
        t: t,
        localizedField: localizedField,
        localizedProjectInfo: localizedProjectInfo,
        applySiteI18n: applySiteI18n,
        initLangSwitcher: initLangSwitcher
    };

    document.addEventListener('DOMContentLoaded', function () {
        document.documentElement.lang = getSiteLang();
        initLangSwitcher();
        applySiteI18n();
    });
})(window);
