'use strict';

const supportedLocales = ['en-gb', 'fr-fr'];

const defaultToEnglishIfUnsupported = (locale = '') => {
  locale = locale.toLowerCase();
  return supportedLocales.includes(locale) ? locale : 'en-gb';
}

const allCats = (locale) => {
  locale = defaultToEnglishIfUnsupported(locale);
  const localisedCats = require (`./${locale}/fake_cats`);

  return localisedCats;
};

const aSingleCat = (pawId, locale) => allCats(locale).find(cat => cat.pawId === pawId);

module.exports = {
  allCats,
  aSingleCat
};
