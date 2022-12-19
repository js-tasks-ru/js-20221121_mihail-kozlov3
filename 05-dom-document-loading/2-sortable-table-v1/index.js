export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  templateHeaderArrow(sortable) {
    if (sortable === true) {
      return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      `;
    }

    return "";
  }

  templateHeader({id, title, sortable}) {
    return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
          <span>${title}</span>
            ${this.templateHeaderArrow(sortable)}
        </div>
      `;
  }

  templateBodyRows(data = []) {
    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.templateBodyRow(item)}
        </a>`;
    }).join("");
  }

  templateBodyRow(item) {
    return this.headerConfig.map(({id, template}) => {
      return template ? template(item[id]) : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join("");
  }

  template() {
    return ` 
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.headerConfig.map(item => this.templateHeader(item)).join("")}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.templateBodyRows(this.data)}
          </div>
          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template();

    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  sort(fieldValue = "title", orderValue = "asc") {
    const sortedData = this.sortData(fieldValue, orderValue);
    this.subElements.body.innerHTML = this.templateBodyRows(sortedData);
  }

  sortData(field, order) {
    const column = this.headerConfig.find(item => item.id === field);
    const { sortType } = column;

    const directions = {
      asc: 1,
      desc: -1
    };

    const direction = directions[order];

    return (this.data).sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      }
    });
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  remove() {
    if (this.element) { this.element.remove(); }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}

