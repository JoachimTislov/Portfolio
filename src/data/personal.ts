import imageGuesserImg from '@/assets/images/image-guesser.webp'
import campusEatsImg from '@/assets/images/campus-eats.webp'
import connectFourImg from '@/assets/images/connectFour-small.webp'
import macroTrackerImg from '@/assets/images/macro-tracker-small.webp'
import profilePic from '@/assets/images/joachim.webp'
import routes from '@/router/routes'
import { tools } from './tools'
import type { PersonalData } from '@/logic/Portfolio/types'
import { icons } from '@/logic/Portfolio/icons'

const githubLink = 'https://github.com/JoachimTislov/'

export const personalData: PersonalData = {
  name: 'Joachim',
  surname: 'Tisløv',
  role: 'Software Developer',
  os: 'Arch Linux',
  ide: 'Neovim',
  country: 'Norway',
  email: 'joachim.tislov@gmail.com',
  picture: profilePic,
  sourceCode: githubLink + 'portfolio',
  intro: `I am ${new Date().getFullYear() - 2002} year old male from Sandnes with a passion for programming.`,
  about: [
    `I live with my Alaskan husky - Leo, I enjoy programming, gaming, sports and the process of solving a problem. I played football for around 14 years.`,

    `I got access to technology at a fairly young age, but it wasn't until highschool I started to learn coding. I remember creating a simple website with six boxes and I was tasked to present them in a 2x3 format. I didn't watch any tutorials and spent multiple hours before I eventually managed to style the website correctly, and I remember running down to my parents and showing them my website with utmost pride.`,

    `This task, among many others, is what sparked my interest in programming. The combination of tackling challenges with patience and intellectual or creative thinking, is rewarding.`
  ],
  keywords: 'Patient, resilient, motivated and persistent',
  university: 'University of Stavanger 2021 - 2025',
  degree: "Bachelor's Degree in Computer Science",
  skills: tools,
  socialLinks: [
    {
      icon: icons.linkedin,
      link: 'https://www.linkedin.com/in/joachim-tisløv-7074642b1'
    },
    {
      icon: icons.instagram,
      link: 'https://www.instagram.com/joachimtislov/'
    },
    { icon: icons.github, link: githubLink },
    {
      icon: icons.facebook,
      link: 'https://www.facebook.com/profile.php?id=100011419305331'
    }
  ],
  projects: {
    ongoing: {
      foodsavr: {
        name: 'FoodSavr',
        date: '27.08.2025',
        githubLink: githubLink + 'foodsavr',
        intro: `I personally need an application to handle almost every task related to inventory managament, meal planning, tracking macros and more. End goal is to provide the user with the desired functionality and enable simple self-hosting through containerization.`,
        tools: [tools.Java]
      },
      'lite-jnc': {
        name: 'Lite Java Compiler',
        date: '04.10.2025',
        githubLink: githubLink + 'lite-jnc',
        intro: `In order to get a deeper understanding of Java and the compilation process, I'm building a lightweight Java compiler from "scratch". The compiler should be capable of handling a subset of the Java language.`,
        tools: [tools.Go, tools.Java]
      },
      'php-api-server': {
        name: 'Multi purpose PHP application',
        date: '26.07.2025',
        githubLink: githubLink + 'php-api-server',
        intro: `The application must be capable of processing requests from different clients with distinct purposes. The chosen technology stack enables deployment on a shared hosting environment limited to PHP and MySQL support.`,
        tools: [tools.Vue, tools.PHP, tools.MySQL]
      },
      refviz: {
        name: 'RefViz',
        date: '16.01.2025',
        githubLink: githubLink + 'refviz',
        intro: `A tool designed to visualize code references within a codebase by generating structured Graphviz files that represent the relationships between symbols within the code. The gathered data is naturally visualized through a graph.`,
        tools: [tools.TypeScript, tools.Graphviz],
        links: [
          // First structured Graphviz file - took around 2 hours to generate the data used to generate the graph file
          'https://github.com/quickfeed/quickfeed/pull/1200/commits/2227fdaa6cb8e165c5c7d5f4bea6374554377565'
        ]
      }
    },
    archived: {
      'macro-tracker': {
        name: 'Macro Tracker',
        date: '08.04.2024 - 19.08.2024',
        githubLink: githubLink + 'macrotracker',
        group_size: 2,
        intro: `My fellow student and I aimed for excellence in creating a Macro Tracker. A simple website with a profile, a calender, statistics, list over meals and ingredients.`,
        description: [
          `The macro tracker includes an authentication system, personal meal and ingredient management, user profile, built in calender algorithms and a meal calendar. In addition to a date and statistics system, we also integrated the kassal.app api to enhance functionality.`,

          `The date system consist of a start and end date, and presents the meals within the set period. The statistics provide an overview of daily, total, recommended and average macros.`,

          `I took responsibility for both backend and frontend development, while my fellow student focused on styling, the website's layout and enabling users to upload a profile picture.`
        ],
        tools: [
          //Frontend
          tools.Bootstrap,
          tools.CSS,
          tools.HTML,
          tools.TypeScript,
          tools.Vue,
          // Backend
          tools.Python,
          tools.Flask,
          tools.SQLite
        ],
        link: 'https://macrotracker.joachimtisløv.no',
        image: macroTrackerImg
      },
      'connect-four': {
        name: routes.connectFour.displayName,
        path: routes.connectFour.path,
        date: '20.06.2024 - 15.07.2024',
        githubLink: githubLink + 'portfolio/tree/main/src/logic/ConnectFour',
        intro: `During my summer holiday, my father and brother played connect four. After hearing my brother lose
                for the 7th time, I thought; "Why not program a bot for him to play against?".`,
        description: [
          `The concept of building an intelligent bot initiated a month-long effort to engineer a sophisticated Four-in-a-Row algorithm. The intent of 
        creating such a bot, were to help my brother, but rather escalated into a far more better goal: `,

          `"Creating an intelligent bot combining both simple and advanced algorithms, making it unbeatable."`,

          `This is still ongoing, since it is in fact beatable. I am currently having issues with the core design of my algorithms;
                scan the board, check for three and two in a row, mark losing choices, filter out awful choices 
                and in the end determine the optimal choice among the remaining options.`,

          `That was the process in a nutshell. There are many more pieces to the puzzle.`
        ],
        tools: [
          //Frontend
          tools.Bootstrap,
          tools.CSS,
          tools.HTML,
          tools.TypeScript,
          tools.Vue
        ],
        image: connectFourImg
      },
      'campus-eats': {
        name: 'Campus Eats',
        date: '01.02.2023 - 20.05.2023',
        githubLink: githubLink + 'campus-eats',
        group_size: 5,
        intro: `A web app for ordering food from the canteen at the University of Stavanger. Target audience were students and employees at the university. User roles included customers, couriers and admins.`,
        tools: [
          tools.React,
          tools.TypeScript
          // tools.NodeJS,
          // tools.Express,
          // tools.MongoDB
        ],
        image: campusEatsImg
      },
      'image-guesser': {
        name: 'Image guesser',
        date: '22.10.2023 - 05.12.2023',
        githubLink: githubLink + 'image-guesser',
        group_size: 5,
        intro: `We developed a game with the objective of guessing an image. The roles of the game consisted of an Oracle which could either be AI or
                a person, and the rest were guessers.`,
        description: [
          `The website's structure is composed of an authentication system, primarily to identify players and distinguish them as different individuals.
                Then we have the join and create lobby alternatives, players can join public lobbies or create their own lobby which features customizable options including the Oracle, 
                image choice, amount of rounds, game mode and more.`,
          `The game is straightforward: the Oracle of the game reveals parts of the image and the guessers
                write their guesses in the chat until a player guesses correctly.`,

          `The application is synchronized using SignalR, enabling players to interact in real-time. The Oracle of the game choose which image tiles to reveal, 
                and if its AI or, in other words; an algorithm, then it determines which tiles to reveal when the leader of the lobby decides to do so.`,

          `The development period was roughly two months. I experienced programming an application in a group for the first time. It was quite challenging,
                 considering I didn't have full control over the project and couldn't just implement everything; So I adapted my work in relation to the group.`
        ],
        tools: [
          //Frontend
          tools.Bootstrap,
          tools.CSS,
          tools.HTML,
          tools.JavaScript,
          tools.CSharp,
          tools.ASPDotNet,
          tools.SQLite,
          tools.Docker
        ],
        image: imageGuesserImg
      }
    }
  }
}
