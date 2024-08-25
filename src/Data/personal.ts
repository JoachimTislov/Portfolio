import macroTrackerImg from '@/assets/images/macroTracker.png'
import imageGuesserImg from '@/assets/images/image-guesser.png'
import fourInARowImg from '@/assets/images/four-in-a-row.png'
import refactoredMacroTrackerImg from '@/assets/images/refactored-macro-tracker.png'
import { skills } from './skills'
import type { PersonalData } from '@/Logic/Portfolio/types'

export const personalData: PersonalData = {
  name: 'Joachim',
  surname: 'Tisløv',

  email: 'joachim.tislov@gmail.com',

  intro: `I am 22 year old male from Sandnes. I've had a passion for technology ever since I got access to it.`,

  about: [
    `I live with my Alaskan husky - Leo, 
      I love programming, gaming, sports and the process of solving a problem. I Played football for over 14 years, 
      which provided me with extensive team-building skills.`,

    `I got access to technology at a fairly young age, but it wasn't until highschool I started to learn coding. 
    I remember creating a simple website with six boxes and I was tasked to present them in a 2x3 format. I didn't
    watch any tutorial and spent multiple hours before I eventually managed to style the website correctly. I remember
    running down to my parents and showing them my website with utmost pride.`,

    `This task, among many others, is what sparked my interest in programming. The combination of tackling challenges with patience and intellectual or creative thinking, 
    along with developing applications and systems, offers an all-in-one package that I find compelling.`
  ],

  keywords: `Patient, dedicated and persistent`,

  situation: `I am currently working on personal projects, and plan to integrate every project into
        the website. This allows you to explore and interact with them, rather just reading
        about each project. `,

  education: `Bachelor's Degree in Computer Technology`,

  skills: skills,

  socialLinks: [
    {
      icon: ['fab', 'linkedin-in'],
      link: 'https://www.linkedin.com/in/joachim-tisl%C3%B8v-7074642b1/'
    },
    {
      icon: ['fab', 'instagram'],
      link: 'https://www.instagram.com/joachimtislov/'
    },
    { icon: ['fab', 'github'], link: 'https://github.com/JoachimTislov' },
    { icon: ['fab', 'facebook'], link: 'https://www.facebook.com/profile.php?id=100011419305331' }
  ],

  jobs: [
    'Full-Stack',
    'IT-Consultant',
    'Technology Integration Specialist',
    'Software Engineer',
    'Data Engineer',
    'Junior/Intern',
    'Application/Web Developer',
    'Database Administrator',
    'Developer'
  ],

  projects: {
    'Refactoring Macro Tracker': {
      name: 'Refactoring Macro Tracker',
      date: '02.08.2024 - 19.08.2024',
      intro: `Integrated the frontend into this website and configured the backend to ensure 
      compatibility with the hosting environment on render.com`,

      description: [
        `The fronted is reworked and integrated to the Vue application. The javascript is converted to typescript 
        and the architecture is largely improved. The code quality has improved, with reduced redundancy.`,

        `The backend on the other hand is barely modified. The old "authentication system" was scraped and I switched to a key/token based authentication system`,

        `New features are: a date system and more statistics. The date system consist of a start and end date,
          and presents the meals within the period.The statistics provide an overview of daily, total, recommended, and average macros.`
      ],
      tools: [
        //Frontend
        skills['Bootstrap'],
        skills['CSS'],
        skills['HTML'],
        skills['Typescript'],
        skills['Vue FrameWork'],

        // Backend
        skills['Python'],
        skills['Flask'],
        skills['SQLite']
      ],
      image: refactoredMacroTrackerImg,
      viewProjectLink: '/macro-tracker'
    },
    'Four in a row': {
      name: 'Four in a row',
      date: '20.06.2024 - 15.07.2024',
      githubLink: 'https://github.com/JoachimTislov/JTs-Portfolio/tree/main/src/Logic/FourInARow',
      intro: `During my summer holiday, my father and brother played four in a row. After hearing my brother lose
                for the 7th time, I thought; "Why not program a bot for him to play against?".`,
      description: [
        `The concept of building an intelligent bot initiated a month-long effort to engineer a sophisticated Four-in-a-Row algorithm. The intent of 
        creating such a bot, were to help my brother, but rather escalated into a far more better goal: `,

        `- Creating an intelligent bot combining both simple and advanced algorithms, making it unbeatable.`,

        `This is still ongoing, since it is in fact beatable. I am currently having issues with the core design of my algorithms;
                scan the board, check for three and two in a row, mark losing choices, filter out awful choices 
                and in the end determine the optimal choice among the remaining options.`,

        `That was the process in a nutshell. There are many more pieces to the puzzle.`
      ],
      tools: [
        //Frontend
        skills['Bootstrap'],
        skills['CSS'],
        skills['HTML'],
        skills['Typescript'],
        skills['Vue FrameWork']
      ],
      viewProjectLink: '/Four-in-a-row',
      image: fourInARowImg
    },
    'Image guesser': {
      name: 'Image guesser',
      date: '22.10.2023 - 05.12.2023',
      group_size: '5',
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
                 considering I did'nt have full control over the project and could'nt just implement everything; So I adapted my work in relation to the group.`
      ],
      tools: [
        //Frontend
        skills['Bootstrap'],
        skills['CSS'],
        skills['HTML'],
        skills['Javascript'],
        skills['C#'],
        skills['.NET'],
        skills['SQLite'],
        skills['Docker']
      ],
      image: imageGuesserImg
    },
    'Macro Tracker': {
      name: 'Macro Tracker',
      original: true,
      date: '08.04.2024 - 11.06.2024',
      githubLink: 'https://github.com/JoachimTislov/MacroTracker',
      group_size: '2',
      intro: `My fellow student and I aimed for excellence in creating a Macro Tracker. A simple website with; a profile, list over meals and ingredients, and a calender.`,
      description: [
        `I took responsibility for both backend and frontend development, while he focused on styling, 
                the website's layout and enable users to upload a profile picture.`,

        `The Macro Tracker includes an authentication system, personal meal and ingredient management, user profile, built in calender algorithms (since we could'nt use libraries) and a meal calendar. 
                We integrated the kassal.app API to enhance functionality.`,

        `I am considering expanding Macro Tracker with additional features, refactoring the whole code structure, and utilizing more tools. 
                We were in fact limited to the tools listed bellow since our teacher knowledge was limited.`,

        `It would be quite cool to publish the application as a standalone app, but since theres 
                multiple popular macro apps, the chance of me doing so, is quite small.`
      ],
      tools: [
        //Frontend
        skills['Bootstrap'],
        skills['CSS'],
        skills['HTML'],
        skills['Javascript'],
        skills['Vue FrameWork'],

        // Backend
        skills['Python'],
        skills['Flask'],
        skills['SQLite']
      ],
      image: macroTrackerImg,
      viewProjectLink: '/macro-tracker'
    }
  }
}
