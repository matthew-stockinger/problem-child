- refactor the whole thing to use a form and submit button. Add bootstrap stuff.

  <!-- - freeCodeCamp/controlled inputs method:
  - redo state shape to have an input section and a submit section. That way,
    I can use controlled inputs like usual. Upon submitting, the 'submit' section
    of state can copy from 'input' section of state.
    Finally, 'input' state can live lower in the tree. 'submit' must be on top, I think. -->

  - uncontrolled method: https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form
    - probably better for this scenario, overall.
    - perfectly ok to mix controlled with uncontrolled, I believe, if needed.

- redo bootstrap validation: https://getbootstrap.com/docs/5.3/forms/validation/

  - seems I need custom validation with CSS and HTML.
  - browser-based validation doesn't give good experience.

- result constraints could create infinite loops in problem creation?
  - resultMin must not be greater than highest possible
  - resultMax must not be less than lowest possible.
  - currently not working. Check if highestPossibleResult and lowestPossibleResult functions are working as expected.
- problems might show division by 0?
- event handlers needed in
  - Operations
