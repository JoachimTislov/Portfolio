import type { Project } from './types'

export const viewName = (project: Project) => {
  if (project.original) {
    return `View the refactored version`
  }
  return `View Project`
}
