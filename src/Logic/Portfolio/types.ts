type Skill = {
  name: string
  icon?: string[]
  link: string
}

export type Skills = {
  [key: string]: Skill
}

export type Project = {
  [key: string]: string | boolean | Skill[] | string[] | undefined
  name: string
  original?: boolean
  date: string
  githubLink?: string
  group_size?: string
  intro: string
  description: string[]
  tools: Skill[]
  image: string
  viewProjectLink?: string
}

export type PersonalData = {
  name: string
  surname: string
  email: string
  intro: string
  about: string[]
  keywords: string
  situation: string
  education: string
  skills: Skills
  socialLinks: { icon: string[]; link: string }[]
  jobs: string[]
  projects: {
    [key: string]: Project
  }
}
