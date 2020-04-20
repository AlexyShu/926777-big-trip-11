export const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(component.getElement());
      break;
  }
};

// функция для отрисовки DOM-элементов
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

// export const remove = (element) => {
//   element.remove();
// };
