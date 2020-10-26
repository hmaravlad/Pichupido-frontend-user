import Vue from 'vue';

Vue.filter('truncate', (text: string, length: number, suffix?: string) => {
  if (text.length > length) {
    return text.substring(0, length) + (suffix || '...');
  }
  return text;
});
