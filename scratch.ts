


interface Settings {
  lang: 'en' | 'da';
  welcome: boolean;
}
// Enforce key to be a specific key of Settings interface

function setSettings(key: keyof Settings, value: any) {
  // Update settings key
  console.log('oogabooga');
}

setSettings('lang', 'hi')
