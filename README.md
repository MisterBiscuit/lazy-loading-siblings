# Lazy Loading Siblings

Correctly lazy-load a sibling module that includes routes with the same path as the current module's routes

## The issue

Some projects can end up being rather large and have many child modules.\
Often the basic functionality is similar (list views, detail views, ...) and therefore the routes are similar:

```
/
 | module-a/
 |  | list: ListAComponent
 |  | detail: DetailAComponent
 |
 | module-b/
 |  | list: ListBComponent
 |  | detail: DetailBComponent
```

These child modules can sometimes import each-other, to reduce code duplication.\
This isn't usually a problem with eager-loading, since all the routes are defined in `AppRoutingModule`, however when we try to lazy-load these child modules we end up with the wrong components being loaded.

This is because Angular loads the first child module and it's routes (using `RouterModule.forChild()`),
which imports the second child module, including it's routes too.\
Now, when it tries to match the requested route, Angular looks through the list of known routes and picks the first one that matches.\
The problem occurs because when Angular loads the child routes, it sorts them alphabetically,
apparently first by path and then by component name (might need more investigation here).\
Therefore when requesting a component that is lower in the list, it will return the first component instead.

## Architectural note

This problem can be solved by splitting the components into smaller components,
separating the parts required by both child modules into a shared module and importing that into both child modules.
This way one child module doesn't need to import another, and thus doesn't import the other's child routes.

This isn't always convenient in monolithic apps, as it could require a lot of rewriting, though this would be the ideal solution.

Assuming each child module's components are prefixed with the same name as the module's route,
what we need is a way to check whether the child route's component name does indeed match the module name for it to be considered to be a valid component by Angular.\
If it doesn't match, like in the case of a sibling module's components, the component won't be loaded.


## Solution analysis

When specifying a route's `path`, Angular uses `defaultUrlMatcher` to check which component should be loaded.\
When using the `matcher`, it will allow a more specific verification, however the matcher's `segments` parameter only contains the child portion of the requested path,
we need to know the requested route that leads to this child in the first place.


## The solution

I found that using the route's `matcher` in tandem with the `defaultUrlMatcher` allows us to use the default functionality,
but we can add another check for the parent path.

`src/app/shared/helpers.ts` contains `componentPath`, a method that takes a child path and the target component to load,
and returns an object containing `matcher` and `component` properties that can be directly added to a route.\
The target component's name is compared with the parent path (the path used to lazy-load this module).\


## Passing observation

I've used the `componentPath` method with all child modules in this repository to keep things simple, because this is a just simple example app.\
Although it is possible to use the method with the sibling module only, in bigger apps some child modules may include others and be included in others too, and therefore only using the method in some modules and not others may result in unexpdected routing behaviour later, such as importing the first child module as a sibling in another module, for example.

To prevent this, I reasoned it would be "safer" to use the same declarations everywhere.


## Final remarks

This is a solution I found to a real life situation. I'm not saying it's perfect or that it's not with it's own flaws, possibly such as slower responsiveness from the router, components not following the same naming convetions, etc.

This method can probably be improved upon, such as specifying a list of accepted parent paths instead of using the target component name, and if anyone has any suggestions, I'm all for it.

If anyone has an alternative solution to the problem and is willing to share, please do.
