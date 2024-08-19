type skill = {
  name: string
  icon?: string[]
  link: string
}

type skills = {
  [key: string]: skill
}

export const skills: skills = {
  'Visual Studio': {
    name: 'Visual Studio',
    icon: ['fas', 'code'],
    link: 'https://code.visualstudio.com/'
  },
  Git: { name: 'Git', icon: ['fab', 'github'], link: 'https://docs.github.com/en' },
  Bootstrap: { name: 'Bootstrap', icon: ['fab', 'bootstrap'], link: 'https://getbootstrap.com/' },
  CSS: {
    name: 'CSS',
    icon: ['fab', 'css3'],
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  HTML: {
    name: 'HTML',
    icon: ['fab', 'html5'],
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  Javascript: {
    name: 'Javascript',
    icon: ['fab', 'js'],
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  Typescript: { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
  'Vue FrameWork': {
    name: 'Vue FrameWork',
    icon: ['fab', 'vuejs'],
    link: 'https://vuejs.org/guide/introduction.html'
  },
  Python: { name: 'Python', icon: ['fab', 'python'], link: 'https://www.python.org/' },
  MySQL: { name: 'MySQL', icon: ['fas', 'database'], link: 'https://www.mysql.com/' },
  SQLite: { name: 'SQLite', icon: ['fas', 'database'], link: 'https://www.sqlite.org/docs.html' },
  'C#': {
    name: 'C#',
    link: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/'
  },
  '.NET': { name: '.NET', link: 'https://dotnet.microsoft.com/en-us/' },
  Flask: {
    name: 'Flask',
    icon: ['fas', 'flask'],
    link: 'https://flask.palletsprojects.com/en/3.0.x/'
  },
  Docker: { name: 'Docker', icon: ['fab', 'docker'], link: 'https://docs.docker.com/' }
}
