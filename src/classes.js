export class bookmarklet {
  constructor(id) {
    if (!id) {throw new Error("id is required for bookmarklet");}
    if (typeof id !== 'number') {throw new TypeError("id must be a number");}
    if (Math.round(id) !== id) {throw new TypeError("id must be an non-negative integer");}
    if (id < 0) {throw new RangeError("id must be a non-negative integer");}

    this.id = id;
    this.name = localStorage.getItem(`bookmarklet${id}.name`) || `bookmark ${id} has no name`;
    this.script = localStorage.getItem(`bookmarklet${id}.contents`) || "javascript:alert(\"no bookmark is stored here\")";
    this.page = toString(localStorage.getItem(`bookmarklet${id}.pageLink`) || id);
  }
}