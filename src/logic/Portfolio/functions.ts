import { personalData } from '@/data/personal'
import type { Project, ProjectKey } from '@/logic/Portfolio/types'

export const aboutProject = (project: Project | undefined) => {
  const desc = project?.description ?? []
  return desc.length > 0
}

const projects = {
  ...personalData.projects.ongoing,
  ...personalData.projects.archived
}

export const projectsWithAbout = (function () {
  const aboutProjects: ProjectKey = {}
  for (const key in projects) {
    const project = projects[key]
    if (aboutProject(project)) {
      aboutProjects[key] = project
    }
  }
  return aboutProjects
})()

export const findProject = (name: string | string[]) => {
  if (typeof name === 'string') {
    const project = projects[name]
    if (aboutProject(project)) return project
  }
  return undefined
}
