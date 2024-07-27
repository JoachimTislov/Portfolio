import macroTrackerImg from '@/assets/images/MacroTracker.png'
import imageGuesserImg from '@/assets/images/image-guesser.png'

import githubLogo from '@/assets/images/github.png'
import linkendIn from '@/assets/images/linkedin.png'
import instagram from '@/assets/images/instagram.png'
import facebook from '@/assets/images/facebook.png'
import { skills } from './skills'

export const personalData = {

    name: "Joachim",
    surname: "Tisløv",

    email: 'joachim.tislov@gmail.com',

    about: [
        `I am a 22 year old male from Sandnes, live with my Alaskan husky - Leo.
        Played football for over 14 years, which provided me with extensive team-building skills.
        I love sports, being active, and taking on challenges.`,
                
        `That is part of the reason why programming sparked my interests. Tackling challenges with patience and 
        intellectual thinking, developing applications and systems - an all-in-one package deal.`,
        
        `Technology has been my passion since i got access to it, leading me to pursue
        a bachelor's degree in Computer Technology. `
    ],

    situation: 

        `I am currently working on personal projects, and plan to integrate every project into
        the website. This allows you to interact with and explore them, instead of just reading
        about each project. `,

    education: `Bachelor's Degree in Computer Technology`,

    skills: skills,

    socialLinks: [
        { img: githubLogo, link: 'https://github.com/JoachimTislov'},
        { img: linkendIn, link: 'https://www.linkedin.com/in/joachim-tisl%C3%B8v-7074642b1/'},
        { img: instagram, link: 'https://www.instagram.com/joachimtislov/'},  
        { img: facebook, link: 'https://www.facebook.com/profile.php?id=100011419305331'}
    ],

    jobs: ['Full-Stack', 'IT-Consultant', 'Technology Integration Specialist', 'Software Engineer', 'Data Engineer', 'Junior/Intern', 'Application/Web Developer', 'Database Administrator', 'Developer'],

    projects: [
        {
            name: 'Macro Tracker', 
            githubLink: 'https://github.com/JoachimTislov/MacroTracker', 
            description: [
                `During a two-month development period, my fellow student and I aimed for excellence in creating a Macro Tracker.
                I took responsibility for both backend and frontend development, while he focused on styling, 
                the website's layout and enable users to upload a profile picture.`, 
                
                `This Macro Tracker includes an authentication system, personal meal and ingredient management, user profile, built in calender algorithms (since we could'nt use libraries) and a meal calendar. 
                We integrated the kassal.app API to enhance functionality.`,
                
                `I am considering expanding Macro Tracker with additional features, refactoring the whole code structure, and utilizing more tools. 
                We were in fact limited to the tools listed bellow since our teacher knowledge was limited.`,
                
                `It would be quite cool to publish the application as a standalone app, but since theres 
                multiple popular macro apps, the chance of me doing so is small.`
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
                skills['SQLite'],
            ], 
            imageLink: macroTrackerImg
            //routerLink: '/MacroTracker'
        },
        {
            name: 'Image guesser',
            description: [

                `I and four other people developed a game with the objective of guessing an image. The roles of the game consisted of an Oracle which could either be AI or
                a person, and the rest were guessers. The game is straightforward: the Oracle of the game reveals parts of the image and the guessers
                write their guesses in the chat until a player guesses correctly.`,

                `The website's structure is composed of an authentication system, primarily to identify players and distinguish them as different individuals.
                Then we have the join and create lobby alternatives, players can join public lobbies or create their own lobby which features customizable options including the Oracle, 
                image choice, amount of rounds, game mode and more.`,
                
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
                skills['Docker'],
            ],
            imageLink: imageGuesserImg
        },
        {
            name: 'Four in a row',
            githubLink: 'https://github.com/JoachimTislov/JTs-Portfolio/tree/main/src/Logic/FourInARow',
            description: [

                `During my summer holiday, my father and brother played four in a row, and after hearing my brother loose
                for the 7th time, I thought, why not create a bot which he can play against.`,

                `This is what sparked the one-month development of a fairly complex four in a row bot.
                The intent of creating such a bot, were to help my brother, but rather escalated into a far more better goal: `,
                
                `- Creating an intelligent bot combining both simple and advanced algorithms, making it unbeatable.`,
                
                `This is still ongoing, since it is in fact beatable. I am currently having issues with the core design of my algorithms;
                scan the board, check for three and two in a row, mark losing choices, filter out awful choices 
                and in the end determine the optimal choice among the remaining options.`,

                `That was the process in a nutshell. There are many more pieces to the puzzle.`,
            ], 
            tools: [
                //Frontend
                skills['Bootstrap'],
                skills['CSS'],
                skills['HTML'],
                skills['Typescript'],
                skills['Vue FrameWork'],
            ],
            routerLink: '/Four-in-a-row'
        }
    ]
}




