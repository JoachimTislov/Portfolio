export const projects = [
    {
        name: 'Macro Tracker', 
        githubLink: 'https://github.com/JoachimTislov/MacroTracker', 
        description: [
            `During a two-month development period, my fellow student and I aimed for excellence in creating a Macro Tracker
            I took responsibility for both backend and frontend development, while he focused on styling, 
            the website's structure and the setup of a profile picture for users on their profile.`, 
            
            `This Macro Tracker includes an authentication system, personal meal and ingredient management, user profile, in built calender algorithms (since we could'nt use libraries) and a meal calendar. 
            We integrated the kassal.app API to enhance functionality. The technology stack includes: flask, flask login, vue js and python, enabling robust functionality and a smooth user experience.`,
            
            `Looking ahead, i am planning to expand 'Macro Tracker' with additional features and refactoring the whole code structure, utilizing more tools. 
            We were in fact limited to the tools listed bellow since our teacher knowledge was limited, and that was understandable.  
            My goal is to publish the application as a standalone app, reaching a broader audience and providing enhanced dietary tracking capabilities.`
        ], 
        tools: {
            frontend: [
                {name: 'Bootstrap', icon: ['fab', 'bootstrap'], link: 'https://getbootstrap.com/'},
                {name: 'CSS', icon: ['fab', 'css3'], link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'},
                {name: 'HTML', icon: ['fab', 'html5'], link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'},
                {name: 'Javascript', icon: ['fab', 'js'], link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
                {name: 'Vue FrameWork', icon: ['fab', 'vuejs'], link: 'https://vuejs.org/guide/introduction.html'},
            ],

            backend: [
                {name: 'Python', icon: ['fab', 'python'], link: 'https://www.python.org/'},
                {name: 'Flask', icon: ['fas', 'flask'], link: 'https://flask.palletsprojects.com/en/3.0.x/'},
                {name: 'SQLite', icon:  ['fas','database'], link: 'https://www.sqlite.org/docs.html'},
            ]
        }, 
        imageLink: '/MacroTracker.png', 
        routerLink: '/MacroTracker'
    }
]