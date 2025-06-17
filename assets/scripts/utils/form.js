/**
 * Return all values of form element.
 * Format:
 *   {[key: (name | id)]: value}
 * @param {HTMLFormElement} formEl - Input fields need to have name attribute
 * @template T
 * @return {T}
 */
export const serializeForm = (formEl) => {
  return Array.from(formEl.querySelectorAll(":scope input")).
    filter(Boolean).
    reduce((acc, input) => {
      const name = input.name;
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

/**
 * Populate form with values
 * @param {HTMLFormElement} formEl
 * @param {Object.<string, any>} values
 */
export const populateForm = (formEl, values) => {
  Object.entries(values).forEach(([key, value]) => {
    const inputEl = formEl.querySelector(`:scope input[name="${key}"]`);
    if (inputEl) {
      switch (inputEl.type) {
        case "checkbox":
          inputEl.checked = value;
          break;
        default:
          inputEl.value = value;
      }
    }
  });
};