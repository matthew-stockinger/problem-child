# Problem Child

## A flexible arithmetic problem generator

### Features

- Flexible constraint system allows for complete customization of output.
- Highly intelligent validation prevents sneaky impossible constraints.

### Development Blog

I began working on this app as a React learning project. My daughters are in elementary school, and both of them need more practice on their arithmetic facts, so I wanted to create something that would generate custom problem sets that we could print for them. There are existing web sites for this, but all of them have some shortcomings, such as ads, inflexibility or lack of control, and prescribed use cases. I wanted something very flexible, very fast, and free.

My first exposure to React was in an IBM course through Coursera. It gave me broad coverage of React methods, including class components and function components with hooks, local state management, state management with Redux, and state management with useContext hooks. While this breadth of knowledge has ultimately helped me have a deeper understanding, it initially caused me a lot of confusion about the "right" way to do things. There was little discussion in the course about how to choose between all of these methods.

In an effort to add depth to my learning, I completed freeCodeCamp's React and Redux courses. I found them really well laid out and explained--an impressive curriculum overall. So I began developing away, and the first time I ran into a problem, I went to the reactjs.org documentation for help. Surprise! Everything in freeCodeCamp is class components and everything in the docs is function components with hooks! More relearning ensued....

Program Iteration 1: I built it using create-react-app with a Redux template. Building the static version of the app went swimmingly. However, when I began planning state management, I quickly realized that I don't need Redux--it's overkill for a project with a half dozen components.

Program Iteration 2: Add state to all the components, coding all inputs as controlled inputs. Each change of an input triggered an instant refresh. The app was the most responsive thing I'd ever used. I then started working on form validation, and quickly discovered that onChange updates without a submit button make for a lousy UX. You see, in this app, form validation can't be done on a per-input basis--all of the constraints must be considered in the context of each other. For example, If the user entered a minimum that was greater than a maximumim, errors would fly and form submission was blocked.

Program Iteration 3: Add a submit button to the form. This is where I went into a deep dive about controlled and uncontrolled forms. I no longer wanted my inputs to trigger validation at the onChange event, but controlled inputs in React utilize constant updates to app state via onChange events. I've found there are two paths to solving this. One is to use uncontrolled inputs, where the browser handles their internal state, and React state only takes values from the inputs on form submission. The other option is to stick with controlled inputs, but maintain two React state trees: one for the internal state of the inputs, and one for the full App state. This is freeCodeCamp's approach, and I have come to believe that it is the best for my app. In the end, to avoid massive refactoring, I settled on a mix of uncontrolled and controlled inputs. My custom operations selectors have a React internal state variable, since they are not input elements and the browser can't handle their state natively. The rest of the standard inputs' internal states are handled by the browser.

### Changelog

I didn't start this until near the end, so it is very incomplete.

- 3.31.2023: added CSS print queries. React made this tough! I worked for a long time following a method from MDN with which an event listener is added to a MediaQueryList. The listener triggers a component state change that removes some components from the page, and changes some classes to get it all formatted nicely. The trickiest bug ensued: the print preview was being sized before the layout classes were applied and the app was rerendered. The result was many, many blank pages in the print preview. After hours of trying many things, the solution was to abandon the event listener on the MediaQueryList and instead use a listener for window.beforeprint. This way, the component state change triggers the appropriate rendering _before_ going to print preview.
- 3.31.2023: removed Redux from the project. This turned out to be easy.
- 3.31.2023: added contributing guidelines, code of conduct, and license to repo.
- 3.30.2023: fixed a bug. User could enter result constraints, for example, that would require answers between 1 and 2, operands constrained to 2-4, shuffle on. Constraints were being tested before shuffle was applied, resulting in faulty output. Using the example here, 2 / 4 would sometimes show up (4 / 2 = 2, which meets the constraints, but then shuffle would randomly change some of these into 2 / 4, which doesn't meet criteria.) Now, shuffle is applied during problem generation, before result constraint checking.
