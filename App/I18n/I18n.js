import i18n from 'i18n-js'


const en = require('./languages/english.json')
const ur = require('./languages/ur.json')

i18n.fallbacks = true
i18n.locale = 'en'
i18n.translations = { en, ur}
/*
const fallback = { languageTag: 'en', isRTL: false }
const { languageTag } =
RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback
console.tron.warn(languageTag)
i18n.locale = languageTag
*/
