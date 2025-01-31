Base Components and Hooks:

BaseCalculatorLayout provides consistent styling and structure
useCalculator hook handles common calculator logic (form handling, state management, calculations storage)


Modular Calculator Components:

Each calculator is a separate component
Calculators can be lazy-loaded to improve initial load time
Common logic is abstracted through hooks and base components


Schema-based Validation:

Each calculator has its own schema
Schemas are loaded dynamically with their respective calculators



To implement a new calculator, you would:

1)Add it to the registry
2)Create its schema
3) Create the calculator component using the base components and hooks
4)The routing and loading are handled automatically


## Categories i wanted to implement in future
1)Biology
104 calculators

2)Chemistry
101 calculators

3)Construction
149 calculators

4)Conversion
307 calculators

5)Ecology
33 calculators

6)Everyday life
265 calculators

7)Finance
581 calculators

8)Food
68 calculators

9)Health
424 calculators

10)Math
668 calculators

12)Physics
524 calculators

13)Sports
109 calculators

14)Statistics
185 calculators

15)Other
185 calculators
