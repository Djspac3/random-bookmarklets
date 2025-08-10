import { storageMacro } from "../lib/storage.ts";

const store = new storageMacro("google.com/bookmarlet.manager");

export class bookmarklet {
  constructor(id: number) {
    if (!id) {
      throw new Error("id is required for bookmarklet");
    }
    if (typeof id !== "number") {
      throw new TypeError("id must be a number");
    }
    if (Math.round(id) !== id) {
      throw new TypeError("id must be an non-negative integer");
    }
    if (id < 0) {
      throw new RangeError("id must be a non-negative integer");
    }

    this.id = id;
    this.name =
      store.get(`bookmarklet${id}.name`) || `bookmark ${id} has no name`;
    this.script =
      store.get(`bookmarklet${id}.contents`) ||
      'javascript:alert("no bookmark is stored here")';
    this.page =
      store.get(`bookmarklet${id}.pageLink`) || `google.com/bookmarklet.${id}`;
  }

  edit(
    name: string | undefined,
    script: string | undefined,
    page: string | undefined,
  ) {
    name = name || `bookmark ${this.id} has no name`;
    script = script || 'javascript:alert("no bookmark is stored here")';
    page = page || `google.com/bookmarklet.${this.id}`;

    this.name = name;
    this.script = script;
    this.page = page;

    store.set(`bookmarklet${this.id}.name`, name);
    store.set(`bookmarklet${this.id}.contents`, script);
    store.set(`bookmarklet${this.id}.pageLink`, page);
  }

  id: number;
  name: string | null;
  script: string | null;
  page: string | null;
}

export var bookmarklets: bookmarklet[] = [];

for (var i = 0; i++; i < 100) {
  if (localStorage.getItem(`bookmarklet${i}.script`)) {
    bookmarklets = bookmarklets.concat([new bookmarklet(i)]);
  }
}
