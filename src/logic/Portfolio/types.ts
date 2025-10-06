import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Tool = {
  name: string
  icon?: IconDefinition
  link: string
}

type ToolName =
  | 'Python'
  | 'JavaScript'
  | 'TypeScript'
  | 'HTML'
  | 'CSS'
  | 'Git'
  | 'Bootstrap'
  | 'Vue'
  | 'MySQL'
  | 'SQLite'
  | 'CSharp'
  | 'DotNet'
  | 'ASPDotNet'
  | 'Flask'
  | 'VSCode'
  | 'React'
  | 'TailwindCSS'
  | 'Node'
  | 'Docker'
  | 'Go'
  | 'Graphviz'
  | 'Java'
  | 'PHP'
  | 'Laravel'
  | 'MariaDB'
  | 'PostgreSQL'
  | 'Assembly'

export type Tools = Record<ToolName, Tool>

export type Project = {
  [key: string]: string | number | boolean | Tool[] | string[] | undefined
  name: string
  path?: string
  date: string
  githubLink: string
  group_size?: number
  intro: string
  description?: string[]
  tools?: Tool[]
  image?: string
  link?: string
}

export type ProjectKey = { [key: string]: Project | undefined }

export type PersonalData = {
  name: string
  surname: string
  role: string
  os: string
  ide: string
  country: string
  email: string
  picture: string
  intro: string
  about: string[]
  keywords: string
  university: string
  degree: string
  skills: Tools
  socialLinks: { icon: IconDefinition; link: string }[]
  projects: {
    ongoing: ProjectKey
    archived: ProjectKey
  }
}
