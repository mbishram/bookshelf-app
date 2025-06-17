/**
 * Return all values of form element.
 * Format:
 *   {[key: (name | id)]: value}
 * @param {HTMLFormElement} formEl - Input fields need to have name or id attribute
 * @template T
 * @return {T}
 */
export const serializeForm = (formEl) => {
  return Array.from(formEl.querySelectorAll(":scope input")).
    filter(Boolean).
    reduce((acc, input) => {
      const name = input.name || input.id;
      let value;
      switch (input.type) {
        case "checkbox":
          value = input.checked;
          break;
        case "number":
          value = +input.value;
          break;
        default:
          value = input.value;
      }

      return {...acc, [name]: value};
    }, {});
};