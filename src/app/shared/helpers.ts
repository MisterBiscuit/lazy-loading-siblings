import { ComponentType } from '@angular/cdk/overlay';
import { Route, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';

const kebabToPascal = (value: string): string => {
  return value
    .split('-')
    .map((part: string) => part.substring(0, 1).toUpperCase() + part.substring(1))
    .join('');
};

export const componentPath = (path: string, targetComponent: ComponentType<unknown>): Pick<Route, 'matcher' | 'component'> => {
 
  const parts = path.split('/');

  const componentMatcher = (segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult|null => {
    if (!targetComponent.name.includes(kebabToPascal(segmentGroup.segments[0].path))) {
      // The target component name doesn't match the parent, no match
      return null;
    }

    if (parts.length > segments.length) {
      // The actual URL is shorter than the config, no match
      return null;
    }

    if (route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || parts.length < segments.length)) {
      // The config is longer than the actual URL but we are looking for a full match, return null
      return null;
    }

    const posParams: {[key: string]: UrlSegment} = {};

    // Check each config part against the actual URL
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      const segment = segments[index];
      const isParameter = part.startsWith(':');
      if (isParameter) {
        posParams[part.substring(1)] = segment;
      } else if (part !== segment.path) {
        // The actual URL part does not match the config, no match
        return null;
      }
    }

    return {consumed: segments.slice(0, parts.length), posParams};
  }

  return {
    matcher: componentMatcher,
    component: targetComponent,
  };
};
