const MAX_ITEMS = 100;

const state = {
  items: [],

  addItem(data) {
    this.items.push(data);
    if (this.items.length > MAX_ITEMS) {
      this.items.shift();
    }
  },

  getItems() {
    return this.items;
  },

  clear() {
    this.items = [];
  },

  getCount() {
    return this.items.length;
  },
};

module.exports = state;
