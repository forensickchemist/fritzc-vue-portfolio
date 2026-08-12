export const services = [
  'Frontend Dev',
  'Backend Dev',
  'Data Analytics & Dashboards',
  'Digital Systems',
  'Automation',
]

export const projects = [
  {
    title: 'E-commerce API Documentation',
    image: null,
    icon: /*'bi-filetype-json',*/ 'bi-braces',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Postman'],
    description:
      'Dynamic E-Commerce Workflow Management. The system features dynamic routes for order processing, real-time inventory updates, and secure user authentication. It also supports seamless automated order reporting and comprehensive product management. Documented Backend API published publicly using Postman.',
  },

  {
    title: 'Course Booking API Documentation',
    image: null,
    icon: /*'bi-braces'*/ 'bi-diagram-3',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Postman'],
    description:
      'RESTful API for managing course enrollments, featuring user registration, authentication, and retrieval of user details. Supports course creation, updates, archiving, activation, and student enrollment. Publicly documented using Postman.',
  },

  {
    title: 'Course Booking App',
    image: null,
    icon: 'bi-calendar-check',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'A MERN-stack course enrollment system featuring user registration, authentication, and profile management. Authenticated users can create, update, archive, and activate courses. The platform also allows users to browse available courses and enroll seamlessly.',
  },

  {
    title: 'E-commerce App',
    image: null,
    icon: 'bi-cart3',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'MERN E-Commerce Platform. The platform features dynamic product catalog with filtering and sorting, real-time search, seamless cart updates, secure checkout, and a comprehensive admin dashboard with real-time analytics and user management capabilities.',
  },

  {
    title: 'Airline Booking System Mockup',
    image: null,
    icon: 'bi-airplane',
    technologies: ['Figma', 'UI/UX Design'],
    description:
      'Side Project: Conceptual design showcasing an intuitive UI for flight search, seat selection, and booking confirmation, focusing on user experience and workflow efficiency.',
  },

  {
    title: 'Airline Booking System Prototype',
    image: null,
    icon: 'bi-ticket-perforated',
    technologies: ['Figma', 'UI/UX Design'],
    description:
      'Side Project: Interactive prototype simulating end-to-end airline booking functionalities, including flight search, reservation, payment processing, and real-time ticket management.',
  },

  {
    title: 'AWS Serverless Course',
    image: null,
    icon: 'bi-cloud',
    technologies: ['AWS', 'Serverless'],
    description:
      'Short course for AWS Serverless Course.',
  },

  {
    title: 'MySQL Course',
    image: null,
    icon: 'bi-database',
    technologies: ['MySQL', 'SQL'],
    description:
      'Short course for MySQL Course.',
  },

  {
    title: 'ASP.NET Course',
    image: null,
    icon: 'bi-filetype-cs',
    technologies: ['C#', 'ASP.NET'],
    description:
      'Short course for ASP.NET Course.',
  },
]

export const toolGroups = [
  {
    name: 'Front End',
    tools: [
      ['HTML', '/images/tools/HTML5.svg'],
      ['CSS', '/images/tools/CSS3.svg'],
      ['Bootstrap', '/images/tools/Bootstrap.svg'],
      ['Figma', '/images/tools/Figma.svg'],
      ['Javascript', '/images/tools/JavaScript.svg'],
      ['ReactJS', '/images/tools/React.svg'],
      ['VueJs','/images/tools/Vue.js.svg']
    ],
  },
  {
    name: 'Backend',
    tools: [
      ['NodeJS', '/images/tools/Node.js.svg'],
      ['MongoDB', '/images/tools/MongoDB.svg'],
      ['SQL', '/images/tools/SQL.png'],
      ['Python', '/images/tools/Python.svg'],
      ['Django', '/images/tools/Django.svg'],
      ['Postman', '/images/tools/Postman.svg'],
    ],
  },
  {
    name: 'Data Analysis',
    tools: [
      ['Jupyter Notebook', '/images/tools/Jupyter.svg'],
      ['Pandas', '/images/tools/Pandas.svg'],
      ['NumPy', '/images/tools/NumPy.svg'],
      ['MS Excel', '/images/tools/MS Excel.svg'],
      ['Tableau', '/images/tools/Tableau.svg'],
      ['Power BI', '/images/tools/PowerBI.svg'],
      ['SQL', '/images/tools/SQL.png'],
    ],
  },
  {
    name: 'AI',
    tools: [
      ['ChatGPT', '/images/tools/ChatGPT.png'],
      ['ClaudeAI', '/images/tools/ClaudeAI.png'],
      ['Google Stitch', '/images/tools/Google Stitch.jpg']
    ]
  },
  {
    name: 'Other Tools',
    tools: [
      ['VS Code', '/images/tools/VSCode.svg'],
      ['IntelliJ IDEA', '/images/tools/IntelliJ IDEA.svg'],
      ['Anaconda', '/images/tools/Anaconda.svg'],
      ['Github', '/images/tools/GitHub.svg'],
    ],
  },

]

export const socialLinks = [
  ['LinkedIn', 'https://www.linkedin.com/', '/images/tools/LinkedIn.svg'],
  ['GitHub', 'https://github.com/forensickchemist', '/images/tools/GitHub.svg'],
  ['Facebook', 'https://www.facebook.com/', '/images/tools/Facebook.svg'],
  ['Tableau Public', 'https://public.tableau.com/app/discover', '/images/tools/Tableau.svg'],
]

export const navigation = [
  ['HOME', '#landing'],
  ['MY PROJECTS', '#projects'],
  ['TOOLS', '#tools'],
  ['ABOUT', '#about'],
  ['CONTACT', '#contact'],
]
