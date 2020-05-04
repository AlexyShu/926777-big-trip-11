import {render, RenderPosition, replace} from '../utils/render.js';
import {FilterType} from "../const.js";
import FiltersComponent from '../components/filters.js';

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._filterComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;
    // this._onDataChange = this._onDataChange.bind(this);
    // this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FiltersComponent(filters);
    // this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._enentsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  // _onDataChange() {
  //   this.render();
  // }
}
