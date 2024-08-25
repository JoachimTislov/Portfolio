import type { Project } from './types'

export const viewName = (project: Project) => {
  if (project.original) {
    return `View refactored version`
  }
  return `View Project`
}
