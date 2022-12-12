export default class ColumnChart {
  
  defaultChartHeight = 50;
  defaultChartLink = '/#';

  constructor(params) {
    if (typeof params === 'object') {
      for (const [key, val] of Object.entries(params)) {
        this[key] = val;
      }
    }

    if (!this.chartHeight) { this.chartHeight = this.defaultChartHeight; }
    if (!this.link) { this.link = this.defaultChartLink; }

    this.render();
  }
  
  getDataList(data = this.data) {
    const maxVal = Math.max(...data);
    const scale = parseInt(this.chartHeight) / maxVal;
    return data.map(item => {
      return `
        <div 
          style="--value: ${Math.floor(item * scale)}" 
          data-tooltip="${(item / maxVal * 100).toFixed(0) + '%'}"
        ></div>`;
    }).join('');
  }
  
  hasData() {
    return this.data && this.data.length && this.data.length > 0;
  }

  getTemplate() {
    let header = this.value;
    if (this.hasOwnProperty('formatHeading') && typeof this.formatHeading === 'function') {
      header = this.formatHeading(this.value);
    }

    const addNoDataClass = (!this.hasData()) ? ' column-chart_loading' : '';
    const chart = (this.hasData()) ? this.getDataList() : '';

    return `
    <div class="column-chart${addNoDataClass}" style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label}
        <a href="${this.link}" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${header}</div>
        <div data-element="body" class="column-chart__chart">
          ${chart}
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  update(data) {
    let columnChart = this.element.querySelector(`.column-chart__chart`);
    columnChart.innerHTML = '';
    
    if (this.hasData()) {
      columnChart.innerHTML = this.getDataList(data);
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
