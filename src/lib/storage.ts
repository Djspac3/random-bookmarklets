/**
 * to attempt to set this value use persistanceRequest()
 * the default value is not the actual value as due to esbuild iife () => {} format doesnt support top level await
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/StorageManager/persisted)
 */
// REMINDER: .then is used due to await not being supported in iife esbuild
export var persistance: boolean = false;
navigator.storage.persisted().then((value) => {
  persistance = value;
});
export function persistanceRequest() {
  const persist = navigator.storage.persist();
  persist.finally(async () => {
    persistance = await persist;
  });
  return persist;
}

export class storageMacro {
  dataUrl: string;
  _winprox: WindowProxy | null;
  _localstorage;
  _sessionstorage;

  constructor(storageUrl: string = "google.com/404.storage") {
    this.dataUrl = storageUrl;

    this._winprox = window.open(
      this.dataUrl,
      "_blank",
      "popup=true,resizable=false,width=100,height=100,left=1000,top=1000",
    );
    if (this._winprox) {
      // add name for easier noticing ig?
      this._winprox.document.title = "DATA STORAGE LIB WINDOW";
      this._localstorage = this._winprox.localStorage;
      this._sessionstorage = this._winprox.sessionStorage;
      this._winprox.document.documentElement.innerHTML = "";
    }
  }

  set(
    key: string,
    value: any,
    mode: "string" | "json" | "base64" = "string",
    storeType: "local" | "session" = "local",
  ) {
    let store: Storage;
    if ((storeType = "local")) {
      store = this._localstorage;
    } else {
      store = this._sessionstorage;
    }

    // prefixs determin the format
    //str: raw string
    //b64: base 64
    //jso: json
    if ((mode = "string")) {
      store.setItem(key, "str:" + String(value));
    }
    if ((mode = "base64")) {
      store.setItem(key, "b64:" + btoa(value));
    }
    if ((mode = "json")) {
      store.setItem(key, "jso:" + JSON.stringify(value));
    }
  }

  get(
    key: string,
    storeType: "local" | "session" = "local",
    throwerror: boolean = false,
  ): string | undefined {
    let store: Storage;
    if ((storeType = "local")) {
      store = this._localstorage;
    } else {
      store = this._sessionstorage;
    }

    let raw = store.getItem(key);
    if (!raw && throwerror) {
      throw new Error(
        `storageLib: unable to get key:'${key}' got null from ${(storeType = "local") ? "localstorage" : "sessionstorage"}`,
      );
    }
    if (!raw) {
      return undefined;
    }

    //first 3
    let prefix = raw.slice(0, 2);
    if ((prefix = "str")) {
      return raw;
    }
    if ((prefix = "b64")) {
      return atob(raw);
    }
    if ((prefix = "jso")) {
      return JSON.parse(raw);
    }
    throw new Error(
      `storageLib: format:'${prefix}' does not have a if statement`,
    );
  }
}
