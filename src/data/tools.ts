import type { Tools } from '../logic/Portfolio/types'
import {
  faCode,
  faDatabase,
  faFlask,
  faWind
} from '@fortawesome/free-solid-svg-icons'
import {
  faGolang,
  faJava,
  faGithub,
  faBootstrap,
  faCss3,
  faHtml5,
  faJs,
  faVuejs,
  faPython,
  faDocker,
  faReact,
  faNodeJs
} from '@fortawesome/free-brands-svg-icons'

export const tools: Tools = {
  VSCode: {
    name: 'Visual Studio',
    icon: faCode,
    link: 'https://code.visualstudio.com/'
  },
  Git: {
    name: 'Git',
    icon: faGithub,
    link: 'https://docs.github.com/en'
  },
  Bootstrap: {
    name: 'Bootstrap',
    icon: faBootstrap,
    link: 'https://getbootstrap.com/'
  },
  CSS: {
    name: 'CSS',
    icon: faCss3,
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  HTML: {
    name: 'HTML',
    icon: faHtml5,
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  JavaScript: {
    name: 'Javascript',
    icon: faJs,
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  TypeScript: { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
  Vue: {
    name: 'Vue FrameWork',
    icon: faVuejs,
    link: 'https://vuejs.org/guide/introduction.html'
  },
  Python: {
    name: 'Python',
    icon: faPython,
    link: 'https://www.python.org/'
  },
  MySQL: {
    name: 'MySQL',
    icon: faDatabase,
    link: 'https://www.mysql.com/'
  },
  SQLite: {
    name: 'SQLite',
    icon: faDatabase,
    link: 'https://www.sqlite.org/docs.html'
  },
  CSharp: {
    name: 'C#',
    link: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/'
  },
  DotNet: { name: '.NET', link: 'https://dotnet.microsoft.com/en-us/' },
  ASPDotNet: {
    name: 'ASP.NET',
    link: 'https://dotnet.microsoft.com/en-us/apps/aspnet'
  },
  Flask: {
    name: 'Flask',
    icon: faFlask,
    link: 'https://flask.palletsprojects.com/en/3.0.x/'
  },
  Docker: {
    name: 'Docker',
    icon: faDocker,
    link: 'https://docs.docker.com/'
  },
  React: {
    name: 'React',
    icon: faReact,
    link: 'https://react.dev/'
  },
  Node: {
    name: 'Node.js',
    icon: faNodeJs,
    link: 'https://nodejs.org/en/'
  },
  TailwindCSS: {
    name: 'Tailwind CSS',
    icon: faWind,
    link: 'https://tailwindcss.com/'
  },
  Go: {
    name: 'Go',
    icon: faGolang,
    link: 'https://go.dev/'
  },
  Graphviz: {
    name: 'Graphviz',
    link: 'https://graphviz.org/'
  },
  Java: {
    name: 'Java',
    icon: faJava,
    link: 'https://www.java.com/en/'
  },
  PHP: {
    name: 'PHP',
    link: 'https://www.php.net/'
  },
  Laravel: {
    name: 'Laravel',
    link: 'https://laravel.com/'
  },
  MariaDB: {
    name: 'MariaDB',
    link: 'https://mariadb.org/'
  },
  PostgreSQL: {
    name: 'PostgreSQL',
    link: 'https://www.postgresql.org/'
  },
  Assembly: {
    name: 'Assembly',
    link: 'https://en.wikipedia.org/wiki/Assembly_language'
  }
}
