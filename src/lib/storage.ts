import { error } from "console";

/**
 * to attempt to set this value use persistanceRequest()
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/StorageManager/persisted)
 */
export var persistance: boolean = await navigator.storage.persisted();
export function persistanceRequest() {
  const persist = navigator.storage.persist();
  persist.finally(async () => {
    persistance = await persist;
  });
  return persist;
}

export class storageFragment {
  dataUrl: string;
  _winprox: WindowProxy | null;
  _localstorage;
  _sessionstorage;

  constructor(storageUrl: string) {
    this.dataUrl = storageUrl || "google.com/404.storage";

    this._winprox = window.open(
      this.dataUrl,
      "_blank",
      "popup=true,resizable=false,width=100,height=100,left=1000,top=1000",
    );
    this._localstorage = this._winprox?.localStorage;
    this._sessionstorage = this._winprox?.sessionStorage;
  }

  set(
    key: string,
    value: any,
    mode: "string" | "json" | "base64",
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

  get(key: string, storeType: "local" | "session" = "local"): string {
    let store: Storage;
    if ((storeType = "local")) {
      store = this._localstorage;
    } else {
      store = this._sessionstorage;
    }

    let raw = store.getItem(key);
    if (!raw) {
      throw new Error(
        `storageLib: unable to get key:'${key}' got null from ${(storeType = "local") ? "localstorage" : "sessionstorage"}`,
      );
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
    throw new error(
      `storageLib: format:'${prefix}' does not have a if statement`,
    );
  }
}
