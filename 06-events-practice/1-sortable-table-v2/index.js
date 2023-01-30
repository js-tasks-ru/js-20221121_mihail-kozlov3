export default class SortableTable {
  element = '';
  subElements = {};

  onSortClick = event => {
    const column = event.target.closest('[data-sortable="true"]');
    if (column) {
      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = column.dataset.order === "asc" ? "desc" : "asc";
      const {id, order} = column.dataset;
      this.sort(id, order);

      if (!arrow) {
        column.append(this.subElements.arrow);
      }
    }
  }

  constructor(headerConfig = [], {
    data = [],
    sorted = {
      id: headerConfig.find(item => item.sortable).id,
      order: 'asc',
    }
  } = {}) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
    this.initEventListeners();
  }

  templateHeaderArrow(id) {
    if (id === this.sorted.id) {
      return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      `;
    } else {
      return '';
    }
  }

  templateHeader({id, title, sortable}) {
    const sort = (id === this.sorted.id) ? this.sorted.order : "asc";

    return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${sort}">
          <span>${title}</span>
            ${this.templateHeaderArrow(id)}
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
      </div>
    </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    const {id, order} = this.sorted;
    this.sortData(id, order);

    wrapper.innerHTML = this.template();

    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  sort(fieldValue, orderValue) {
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
      default:
        console.error(`Unknown type: ${sortType}`);
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
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}