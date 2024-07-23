import { LocalStorageMock } from './LocalStorageMock';

import type { Environment } from 'vitest'

import { JSDOM } from 'jsdom'

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    // custom setup
    const dom = new JSDOM('/index.html', {
      url: 'http://localhost/5173',
    });

    global.console.log = () => {}
    global.window = dom.window as any;
    global.document = dom.window.document;
    global.localStorage = new LocalStorageMock();

 
    return {
      teardown() {
        // called after all tests with this env have been run
        dom.window.close();
        (global.localStorage as LocalStorageMock).clear()
      }
    }
  }
}
