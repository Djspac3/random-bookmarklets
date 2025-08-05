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
      localStorage.getItem(`bookmarklet${id}.name`) ||
      `bookmark ${id} has no name`;
    this.script =
      localStorage.getItem(`bookmarklet${id}.contents`) ||
      'javascript:alert("no bookmark is stored here")';
    this.page = localStorage.getItem(`bookmarklet${id}.pageLink`) || String(id);
  }

  edit(
    name: string | undefined,
    script: string | undefined,
    page: string | undefined
  ) {
    name = name || `bookmark ${this.id} has no name`;
    script = script || 'javascript:alert("no bookmark is stored here")';
    page = page || String(this.id);

    this.name = name;
    this.script = script;
    this.page = page;
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
