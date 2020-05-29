import {render, RenderPosition, replace} from "../utils/render.js";
import {FilterType} from "../const.js";
import Filters from "../components/filters.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        isChecked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new Filters(filters);
    this._filterComponent.setOnFilterChange(this._onFilterChange);
    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._pointsModel.setFilter(filterType);
  }

  changeByDefaultFilter() {
    this._activeFilterType = FilterType.EVERYTHING;
  }
}
