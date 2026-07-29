// ============================================================
// Smart Course Planner — multi-major edition
// Data sourced from Purdue's published plan-of-study PDFs and
// department handbooks (First-Year Engineering + IE/ME/ECE/CS/
// ChE/CE). Approximate — always verify with myPurduePlan/advisor.
// ============================================================

const PROGRAMS = {

  ie: {
    label: 'Industrial Engineering, BSIE',
    school: 'School of Industrial Engineering',
    courses: [
      {id:'ENGR131',name:'Transforming Ideas to Innovation I',credits:2,term:1,cat:'fye',prereq:[],critical:true},
      {id:'MA161',name:'Calculus I',credits:5,term:1,cat:'fye',prereq:[],critical:true},
      {id:'CHM115',name:'General Chemistry',credits:4,term:1,cat:'fye',prereq:[]},
      {id:'COMM1',name:'Written / Oral Communication I',credits:3,term:1,cat:'elective',prereq:[]},
      {id:'ENGR132',name:'Transforming Ideas to Innovation II',credits:2,term:2,cat:'fye',prereq:['ENGR131'],critical:true},
      {id:'MA162',name:'Calculus II',credits:5,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'PHYS172',name:'Modern Mechanics',credits:4,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'COMM2',name:'Written / Oral Communication II',credits:3,term:2,cat:'elective',prereq:[]},
      {id:'CS159',name:'C Programming (FYE Selective)',credits:3,term:2,cat:'fye',prereq:[]},
      {id:'MA261',name:'Multivariate Calculus',credits:4,term:3,cat:'support',prereq:['MA162']},
      {id:'ME270',name:'Basic Mechanics I',credits:3,term:3,cat:'support',prereq:['PHYS172','MA162']},
      {id:'IE200',name:'Industrial Engineering Seminar',credits:1,term:3,cat:'major',prereq:[]},
      {id:'IE230',name:'Probability & Statistics in Engineering I',credits:3,term:3,cat:'major',prereq:['MA162']},
      {id:'IE343',name:'Engineering Economics',credits:3,term:3,cat:'major',prereq:[]},
      {id:'GE1',name:'General Education Elective I',credits:3,term:3,cat:'elective',prereq:[]},
      {id:'IE330',name:'Probability & Statistics in Engineering II',credits:3,term:4,cat:'major',prereq:['IE230']},
      {id:'MA265',name:'Linear Algebra',credits:3,term:4,cat:'support',prereq:['MA162']},
      {id:'ME200',name:'Thermodynamics I',credits:3,term:4,cat:'support',prereq:[]},
      {id:'NUCL273',name:'Mechanics of Materials',credits:3,term:4,cat:'support',prereq:['ME270']},
      {id:'PHYS241',name:'Electricity and Optics',credits:4,term:4,cat:'support',prereq:['PHYS172','MA162']},
      {id:'GE2',name:'General Education Elective II',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'IE335',name:'Operations Research – Optimization',credits:3,term:5,cat:'major',prereq:['MA265','IE230'],optimization:true},
      {id:'IE336',name:'Operations Research – Stochastic Models',credits:3,term:5,cat:'major',prereq:['IE330']},
      {id:'MA266',name:'Ordinary Differential Equations',credits:3,term:5,cat:'support',prereq:['MA162']},
      {id:'GE3',name:'General Education Elective III',credits:3,term:5,cat:'elective',prereq:[]},
      {id:'ECE200X',name:'Electrical Engineering Fundamentals I',credits:3,term:6,cat:'support',prereq:['PHYS241']},
      {id:'IE332',name:'Computing in Industrial Engineering',credits:3,term:6,cat:'major',prereq:['IE335']},
      {id:'IE370',name:'Manufacturing Processes I',credits:3,term:6,cat:'major',prereq:[]},
      {id:'IE383',name:'Integrated Production Systems I',credits:3,term:6,cat:'major',prereq:['IE335','IE336']},
      {id:'IE386',name:'Work Analysis and Design I',credits:3,term:6,cat:'major',prereq:['IE330']},
      {id:'GE4',name:'General Education Elective IV',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'IE474',name:'Industrial Control Systems',credits:3,term:7,cat:'major',prereq:['IE332']},
      {id:'IE486',name:'Work Analysis and Design II',credits:3,term:7,cat:'major',prereq:['IE386']},
      {id:'TE1',name:'Technical Elective I',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'TE2',name:'Technical Elective II',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'GE5',name:'General Education Elective V',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'IE431',name:'Industrial Engineering Design (Capstone)',credits:3,term:8,cat:'major',prereq:['IE383','IE386','IE474'],critical:true},
      {id:'TE3',name:'Technical Elective III',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'GE6',name:'General Education Elective VI',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'IETR1',name:'IE Technical Requirement I',credits:3,term:8,cat:'major',prereq:['IE370']},
      {id:'IETR2',name:'IE Technical Requirement II',credits:3,term:8,cat:'major',prereq:['IE370']},
    ]
  },

  me: {
    label: 'Mechanical Engineering, BSME',
    school: 'School of Mechanical Engineering',
    courses: [
      {id:'ENGR131',name:'Transforming Ideas to Innovation I',credits:2,term:1,cat:'fye',prereq:[],critical:true},
      {id:'MA161',name:'Calculus I',credits:5,term:1,cat:'fye',prereq:[],critical:true},
      {id:'CHM115',name:'General Chemistry',credits:4,term:1,cat:'fye',prereq:[]},
      {id:'COMM1',name:'Written / Oral Communication I',credits:3,term:1,cat:'elective',prereq:[]},
      {id:'ENGR132',name:'Transforming Ideas to Innovation II',credits:2,term:2,cat:'fye',prereq:['ENGR131'],critical:true},
      {id:'MA162',name:'Calculus II',credits:5,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'PHYS172',name:'Modern Mechanics',credits:4,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'COMM2',name:'Written / Oral Communication II',credits:3,term:2,cat:'elective',prereq:[]},
      {id:'CS159',name:'C Programming (FYE Selective)',credits:3,term:2,cat:'fye',prereq:[]},
      {id:'CGT163',name:'Graphical Communication & Spatial Analysis',credits:2,term:3,cat:'support',prereq:[]},
      {id:'MA261',name:'Multivariate Calculus',credits:4,term:3,cat:'support',prereq:['MA162']},
      {id:'ME200',name:'Thermodynamics I',credits:3,term:3,cat:'major',prereq:['CHM115','ENGR132'],critical:true},
      {id:'ME270',name:'Basic Mechanics I (Statics)',credits:3,term:3,cat:'major',prereq:['ENGR132','PHYS172'],critical:true},
      {id:'ME290',name:'ME Professional Seminar',credits:1,term:3,cat:'major',prereq:[]},
      {id:'PHYS241',name:'Electricity and Optics',credits:3,term:3,cat:'support',prereq:['PHYS172']},
      {id:'ECE201',name:'Linear Circuit Analysis',credits:3,term:4,cat:'support',prereq:['ENGR131','PHYS172']},
      {id:'ECE207',name:'Electronic Measurement Techniques',credits:1,term:4,cat:'support',prereq:['ECE201']},
      {id:'MA262',name:'Linear Algebra & Differential Equations',credits:4,term:4,cat:'support',prereq:['MA261']},
      {id:'ME263',name:'ME Design, Innovation & Entrepreneurship',credits:3,term:4,cat:'major',prereq:['ME200','ME270']},
      {id:'ME274',name:'Basic Mechanics II (Dynamics)',credits:3,term:4,cat:'major',prereq:['ME270']},
      {id:'EconSel',name:'Economics Selective (B/SS)',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'MA303',name:'Differential Equations for Engineers',credits:3,term:5,cat:'support',prereq:['MA262']},
      {id:'ME309',name:'Fluid Mechanics',credits:4,term:5,cat:'major',prereq:['ME263','ME274']},
      {id:'ME323',name:'Mechanics of Materials',credits:3,term:5,cat:'major',prereq:['ME270']},
      {id:'ME365',name:'Systems and Measurements',credits:3,term:5,cat:'major',prereq:['ECE201','ECE207','ME274']},
      {id:'WorldAffSel',name:'World Affairs & Cultures Selective',credits:3,term:5,cat:'elective',prereq:[]},
      {id:'ME352',name:'Machine Design I',credits:4,term:6,cat:'major',prereq:['ME263','ME274','ME323']},
      {id:'ME375',name:'System Modeling and Analysis',credits:3,term:6,cat:'major',prereq:['MA303','ME365']},
      {id:'MSE230',name:'Structure and Properties of Materials',credits:3,term:6,cat:'support',prereq:['CHM115','MA161']},
      {id:'GenEdII',name:'General Education Selective II',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'ProfSelI',name:'Professional Selective I',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'ME315',name:'Heat and Mass Transfer',credits:4,term:7,cat:'major',prereq:['MA303','ME309','ME365']},
      {id:'RestrictedSelI',name:'Restricted Selective I',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'ProfSelII',name:'Professional Selective II',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'GenEdIII',name:'General Education Selective III',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'FreeElective1',name:'Free Elective',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'ME463',name:'Engineering Design (Capstone)',credits:3,term:8,cat:'major',prereq:['ME315','ME352','ME375','MSE230'],critical:true},
      {id:'RestrictedSelII',name:'Restricted Selective II',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'ProfSelIII',name:'Professional Selective III',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'ProfSelIV',name:'Professional Selective IV',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'GenEdIV',name:'General Education Selective IV',credits:3,term:8,cat:'elective',prereq:[]},
    ]
  },

  ece: {
    label: 'Electrical Engineering, BSEE',
    school: 'Elmore Family School of Electrical & Computer Engineering',
    courses: [
      {id:'ENGR131',name:'Transforming Ideas to Innovation I',credits:2,term:1,cat:'fye',prereq:[],critical:true},
      {id:'MA161',name:'Calculus I',credits:5,term:1,cat:'fye',prereq:[],critical:true},
      {id:'CHM115',name:'General Chemistry',credits:4,term:1,cat:'fye',prereq:[]},
      {id:'PHYS172',name:'Modern Mechanics',credits:4,term:1,cat:'fye',prereq:['MA161'],critical:true},
      {id:'COMM1',name:'Oral Communication',credits:3,term:1,cat:'elective',prereq:[]},
      {id:'ENGR132',name:'Transforming Ideas to Innovation II',credits:2,term:2,cat:'fye',prereq:['ENGR131'],critical:true},
      {id:'MA162',name:'Calculus II',credits:5,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'CS159',name:'C Programming for Engineers',credits:3,term:2,cat:'fye',prereq:['ENGR131']},
      {id:'ECESci',name:'ECE Science Selective',credits:4,term:2,cat:'support',prereq:[]},
      {id:'COMM2',name:'First-Year Composition',credits:4,term:2,cat:'elective',prereq:[]},
      {id:'ECE200',name:'ECE Sophomore Seminar',credits:0,term:3,cat:'major',prereq:[]},
      {id:'ECE201',name:'Linear Circuit Analysis I',credits:3,term:3,cat:'major',prereq:['ENGR131','PHYS172','MA162'],critical:true},
      {id:'ECE207',name:'Electronic Measurement Techniques',credits:1,term:3,cat:'major',prereq:['ECE201']},
      {id:'MA261',name:'Multivariate Calculus',credits:4,term:3,cat:'support',prereq:['MA162']},
      {id:'PHYS272',name:'Electric & Magnetic Interactions',credits:4,term:3,cat:'support',prereq:['PHYS172','MA162']},
      {id:'FoundGenEd1',name:'Foundational General Education I',credits:3,term:3,cat:'elective',prereq:[]},
      {id:'ECE202',name:'Linear Circuit Analysis II',credits:3,term:4,cat:'major',prereq:['ECE201','MA261']},
      {id:'ECE208',name:'Electronic Devices & Design Lab',credits:1,term:4,cat:'major',prereq:['ECE207']},
      {id:'ECE255',name:'Electronic Circuit Analysis & Design',credits:3,term:4,cat:'major',prereq:['ECE201','MA261']},
      {id:'MA266',name:'Ordinary Differential Equations',credits:3,term:4,cat:'support',prereq:['MA261']},
      {id:'EngrBreadthSel',name:'Engineering Breadth Selective',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'FoundGenEd2',name:'Foundational General Education II',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'ECE270',name:'Introduction to Digital System Design',credits:4,term:5,cat:'major',prereq:['ECE201']},
      {id:'ECE301',name:'Signals and Systems',credits:3,term:5,cat:'major',prereq:['ECE202','MA266']},
      {id:'AdvEESel1',name:'Advanced EE Selective I',credits:3,term:5,cat:'major',prereq:[]},
      {id:'ECEElective1',name:'ECE Elective I',credits:1,term:5,cat:'major',prereq:[]},
      {id:'FoundGenEd3',name:'Foundational General Education III',credits:3,term:5,cat:'elective',prereq:[]},
      {id:'ComplimentaryEle1',name:'Complimentary Elective I',credits:2,term:5,cat:'elective',prereq:[]},
      {id:'ECE302',name:'Probabilistic Methods in ECE',credits:3,term:6,cat:'major',prereq:['MA266','ECE301']},
      {id:'ECE311',name:'Electric & Magnetic Fields',credits:3,term:6,cat:'major',prereq:['ECE201','PHYS272','MA266']},
      {id:'AdvEESel2',name:'Advanced EE Selective II',credits:3,term:6,cat:'major',prereq:[]},
      {id:'ECEElectiveLab1',name:'ECE Elective (Lab) I',credits:1,term:6,cat:'major',prereq:[]},
      {id:'MA265',name:'Linear Algebra',credits:3,term:6,cat:'support',prereq:['MA261']},
      {id:'ECEGenEd1',name:'ECE General Education Elective I',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'ECE400',name:'Professional Development & Career Guidance',credits:1,term:7,cat:'major',prereq:['ECE200']},
      {id:'ECE402',name:'Electrical Engineering Design Projects (Capstone)',credits:3,term:7,cat:'major',prereq:['ECE301','ECE302','ECE311'],critical:true},
      {id:'ECEElective2',name:'ECE Elective II',credits:3,term:7,cat:'major',prereq:[]},
      {id:'ECEGenEd2',name:'ECE General Education Elective II',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'ComplimentaryEle2',name:'Complimentary Elective II',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'AdvEESelLab',name:'Advanced EE Selective (w/ Lab)',credits:4,term:8,cat:'major',prereq:[]},
      {id:'ECEElectiveLab2',name:'ECE Elective (w/ Lab)',credits:4,term:8,cat:'major',prereq:[]},
      {id:'ECEGenEd3',name:'ECE General Education Elective III',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'ComplimentaryEle3',name:'Complimentary Elective III',credits:3,term:8,cat:'elective',prereq:[]},
    ]
  },

  cs: {
    label: 'Computer Science, BS',
    school: 'Department of Computer Science',
    courses: [
      {id:'CS180',name:'Problem Solving and Object-Oriented Programming',credits:4,term:1,cat:'major',prereq:[],critical:true},
      {id:'CS193',name:'Tools',credits:1,term:1,cat:'major',prereq:[]},
      {id:'MA161',name:'Calculus I',credits:5,term:1,cat:'fye',prereq:[],critical:true},
      {id:'COMM1',name:'Written / Oral Communication I',credits:3,term:1,cat:'elective',prereq:[]},
      {id:'GenEdSel1',name:'General Education Selective I',credits:3,term:1,cat:'elective',prereq:[]},
      {id:'CS182',name:'Foundations of Computer Science',credits:3,term:2,cat:'major',prereq:['CS180'],critical:true},
      {id:'CS240',name:'Programming in C',credits:3,term:2,cat:'major',prereq:['CS180'],critical:true},
      {id:'MA162',name:'Calculus II',credits:5,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'COMM2',name:'Written / Oral Communication II',credits:3,term:2,cat:'elective',prereq:[]},
      {id:'SciSel1',name:'Natural Science Selective',credits:4,term:2,cat:'support',prereq:[]},
      {id:'CS250',name:'Computer Architecture',credits:4,term:3,cat:'major',prereq:['CS240'],critical:true},
      {id:'CS251',name:'Data Structures and Algorithms',credits:3,term:3,cat:'major',prereq:['CS182','CS240'],critical:true},
      {id:'MA261',name:'Multivariate Calculus',credits:4,term:3,cat:'support',prereq:['MA162']},
      {id:'StatSel',name:'Statistics Selective',credits:3,term:3,cat:'support',prereq:['MA162']},
      {id:'GenEdSel2',name:'General Education Selective II',credits:3,term:3,cat:'elective',prereq:[]},
      {id:'CS252',name:'Systems Programming',credits:4,term:4,cat:'major',prereq:['CS250','CS251'],critical:true},
      {id:'MA265',name:'Linear Algebra',credits:3,term:4,cat:'support',prereq:['MA261']},
      {id:'TrackReq1',name:'Track Requirement I',credits:3,term:4,cat:'major',prereq:['CS251']},
      {id:'GenEdSel3',name:'General Education Selective III',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'GenEdSel4',name:'General Education Selective IV',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'TrackReq2',name:'Track Requirement II',credits:3,term:5,cat:'major',prereq:['CS251']},
      {id:'TrackReq3',name:'Track Requirement III',credits:3,term:5,cat:'major',prereq:['CS251']},
      {id:'CS291',name:'Sophomore Development Seminar',credits:1,term:5,cat:'major',prereq:[]},
      {id:'GenEdSel5',name:'General Education Selective V',credits:3,term:5,cat:'elective',prereq:[]},
      {id:'FreeElective1',name:'Free Elective I',credits:3,term:5,cat:'elective',prereq:[]},
      {id:'FreeElective2',name:'Free Elective II',credits:3,term:5,cat:'elective',prereq:[]},
      {id:'TrackReq4',name:'Track Requirement IV',credits:3,term:6,cat:'major',prereq:['TrackReq1']},
      {id:'TrackElective1',name:'Track Elective I',credits:3,term:6,cat:'major',prereq:['CS251']},
      {id:'TrackElective2',name:'Track Elective II',credits:3,term:6,cat:'major',prereq:['CS251']},
      {id:'GenEdSel6',name:'General Education Selective VI',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'FreeElective3',name:'Free Elective III',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'TrackElective3',name:'Track Elective III',credits:3,term:7,cat:'major',prereq:['CS251']},
      {id:'TrackElective4',name:'Track Elective IV',credits:3,term:7,cat:'major',prereq:['CS251']},
      {id:'GenEdSel7',name:'General Education Selective VII',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'FreeElective4',name:'Free Elective IV',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'FreeElective5',name:'Free Elective V',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'CapstoneElective',name:'Capstone / Advanced Elective',credits:3,term:8,cat:'major',prereq:['CS252'],critical:true},
      {id:'GenEdSel8',name:'General Education Selective VIII',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'FreeElective6',name:'Free Elective VI',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'FreeElective7',name:'Free Elective VII',credits:3,term:8,cat:'elective',prereq:[]},
    ]
  },

  che: {
    label: 'Chemical Engineering, BSChE',
    school: 'Davidson School of Chemical Engineering',
    courses: [
      {id:'ENGR131',name:'Transforming Ideas to Innovation I',credits:2,term:1,cat:'fye',prereq:[],critical:true},
      {id:'MA161',name:'Calculus I',credits:5,term:1,cat:'fye',prereq:[],critical:true},
      {id:'CHM115',name:'General Chemistry I',credits:4,term:1,cat:'fye',prereq:[]},
      {id:'COMM1',name:'Written / Oral Communication I',credits:3,term:1,cat:'elective',prereq:[]},
      {id:'ENGR132',name:'Transforming Ideas to Innovation II',credits:2,term:2,cat:'fye',prereq:['ENGR131'],critical:true},
      {id:'MA162',name:'Calculus II',credits:5,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'CHM116',name:'General Chemistry II',credits:4,term:2,cat:'fye',prereq:['CHM115'],critical:true},
      {id:'PHYS172',name:'Modern Mechanics',credits:4,term:2,cat:'fye',prereq:['MA161']},
      {id:'COMM2',name:'Written / Oral Communication II',credits:3,term:2,cat:'elective',prereq:[]},
      {id:'CHE200',name:'Chemical Engineering Seminar',credits:1,term:3,cat:'major',prereq:[]},
      {id:'CHE205',name:'Chemical Engineering Analysis',credits:4,term:3,cat:'major',prereq:['CHM116','PHYS172'],critical:true},
      {id:'MA261',name:'Multivariate Calculus',credits:4,term:3,cat:'support',prereq:['MA162']},
      {id:'CHM261',name:'Organic Chemistry I',credits:3,term:3,cat:'support',prereq:['CHM116']},
      {id:'CHM263',name:'Organic Chemistry Lab I',credits:1,term:3,cat:'support',prereq:['CHM261']},
      {id:'GenEdSel1',name:'General Education Selective I',credits:3,term:3,cat:'elective',prereq:[]},
      {id:'CHE211',name:'Chemical Process Analysis',credits:4,term:4,cat:'major',prereq:['CHE205','MA261'],critical:true},
      {id:'CHE320',name:'Chemical Engineering Thermodynamics',credits:3,term:4,cat:'major',prereq:['CHE205','MA261']},
      {id:'CHM262',name:'Organic Chemistry II',credits:3,term:4,cat:'support',prereq:['CHM261']},
      {id:'CHM264',name:'Organic Chemistry Lab II',credits:1,term:4,cat:'support',prereq:['CHM262']},
      {id:'MA265',name:'Linear Algebra (Math Selective I)',credits:3,term:4,cat:'support',prereq:['MA261']},
      {id:'GenEdSel2',name:'General Education Selective II',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'CHE306',name:'Staged Separations',credits:3,term:5,cat:'major',prereq:['CHE211']},
      {id:'CHE377',name:'Momentum Transfer',credits:4,term:5,cat:'major',prereq:['CHE211','MA266']},
      {id:'MA266',name:'Ordinary Differential Equations (Math Selective II)',credits:3,term:5,cat:'support',prereq:['MA261']},
      {id:'PHYS241',name:'Electricity and Optics',credits:3,term:5,cat:'support',prereq:['PHYS172','MA162']},
      {id:'BioSel',name:'Biology Selective',credits:3,term:5,cat:'support',prereq:[]},
      {id:'CHE300',name:'Chemical Engineering Seminar II',credits:1,term:6,cat:'major',prereq:['CHE200']},
      {id:'CHE348',name:'Chemical Engineering Laboratory I',credits:4,term:6,cat:'major',prereq:['CHE211','MA266']},
      {id:'CHE378',name:'Chemical Engineering Laboratory II',credits:4,term:6,cat:'major',prereq:['CHE211','CHE377']},
      {id:'CHM370',name:'Physical Chemistry',credits:3,term:6,cat:'support',prereq:['CHE211']},
      {id:'GenEdSel3',name:'General Education Selective III',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'CHE400',name:'Chemical Engineering Seminar III',credits:1,term:7,cat:'major',prereq:['CHE300']},
      {id:'CHE420',name:'Process Dynamics and Control',credits:3,term:7,cat:'major',prereq:['CHE377','CHE378','CHE348']},
      {id:'CHE435',name:'Chemical Reaction Engineering',credits:4,term:7,cat:'major',prereq:['CHE306','CHE320','CHE348','CHE378']},
      {id:'CHE456',name:'Heat and Mass Transfer',credits:3,term:7,cat:'major',prereq:['CHE377','CHE348','CHE378']},
      {id:'GenEdSel4',name:'General Education Selective IV',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'CHE450',name:'Process Design (Capstone)',credits:4,term:8,cat:'major',prereq:['CHE306','CHE378','CHE420','CHE456','CHE435'],critical:true},
      {id:'CHESelective',name:'Chemical Engineering Selective',credits:3,term:8,cat:'major',prereq:[]},
      {id:'GenEdSel5',name:'General Education Selective V',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'FreeElective',name:'Free Elective',credits:3,term:8,cat:'elective',prereq:[]},
    ]
  },

  ce: {
    label: 'Civil Engineering, BSCE',
    school: 'Lyles School of Civil & Construction Engineering',
    courses: [
      {id:'ENGR131',name:'Transforming Ideas to Innovation I',credits:2,term:1,cat:'fye',prereq:[],critical:true},
      {id:'MA161',name:'Calculus I',credits:5,term:1,cat:'fye',prereq:[],critical:true},
      {id:'CHM115',name:'General Chemistry',credits:4,term:1,cat:'fye',prereq:[]},
      {id:'COMM1',name:'Written / Oral Communication I',credits:3,term:1,cat:'elective',prereq:[]},
      {id:'ENGR132',name:'Transforming Ideas to Innovation II',credits:2,term:2,cat:'fye',prereq:['ENGR131'],critical:true},
      {id:'MA162',name:'Calculus II',credits:5,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'PHYS172',name:'Modern Mechanics',credits:4,term:2,cat:'fye',prereq:['MA161'],critical:true},
      {id:'COMM2',name:'Written / Oral Communication II',credits:3,term:2,cat:'elective',prereq:[]},
      {id:'CS159',name:'C Programming (FYE Selective)',credits:3,term:2,cat:'fye',prereq:[]},
      {id:'MA261',name:'Multivariate Calculus',credits:4,term:3,cat:'support',prereq:['MA162']},
      {id:'PHYS241',name:'Electricity and Optics',credits:3,term:3,cat:'support',prereq:['PHYS172','MA162']},
      {id:'BioSel',name:'Biology Selective',credits:4,term:3,cat:'support',prereq:[]},
      {id:'GenEdSel1',name:'General Education Selective I',credits:3,term:3,cat:'elective',prereq:[]},
      {id:'GenEdSel2',name:'General Education Selective II',credits:3,term:3,cat:'elective',prereq:[]},
      {id:'MA265',name:'Linear Algebra',credits:3,term:4,cat:'support',prereq:['MA261']},
      {id:'MA266',name:'Ordinary Differential Equations',credits:3,term:4,cat:'support',prereq:['MA261']},
      {id:'GenEdSel3',name:'General Education Selective III',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'GenEdSel4',name:'General Education Selective IV',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'FreeElective1',name:'Free Elective I',credits:3,term:4,cat:'elective',prereq:[]},
      {id:'CE203',name:'Principles & Practice of Geomatics',credits:4,term:5,cat:'major',prereq:['MA162'],critical:true},
      {id:'CE231',name:'Engineering Materials I',credits:3,term:5,cat:'major',prereq:['CHM115']},
      {id:'CE270',name:'Introduction to Structural Mechanics',credits:4,term:5,cat:'major',prereq:['PHYS172','MA261'],critical:true},
      {id:'CE292',name:'Contemporary Issues in Civil Engineering',credits:2,term:5,cat:'major',prereq:[]},
      {id:'CoreSTS',name:'Science, Technology & Society Selective',credits:3,term:5,cat:'elective',prereq:[]},
      {id:'CE331',name:'Engineering Materials II',credits:3,term:6,cat:'major',prereq:['CE231']},
      {id:'CE340',name:'Hydraulics',credits:3,term:6,cat:'major',prereq:['CE203']},
      {id:'CE343',name:'Elementary Hydraulics Lab',credits:1,term:6,cat:'major',prereq:['CE340']},
      {id:'CE392',name:'Technical Communication in CE',credits:2,term:6,cat:'major',prereq:[]},
      {id:'TechElective1',name:'Technical Elective I',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'TechElective2',name:'Technical Elective II',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'TechElective3',name:'Technical Elective III',credits:3,term:6,cat:'elective',prereq:[]},
      {id:'CE398',name:'Introduction to CE Systems Design',credits:3,term:7,cat:'major',prereq:['CE270','CE331','CE340']},
      {id:'TechElective4',name:'Technical Elective IV',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'TechElective5',name:'Technical Elective V',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'TechElective6',name:'Technical Elective VI',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'TechElective7',name:'Technical Elective VII',credits:3,term:7,cat:'elective',prereq:[]},
      {id:'CE498',name:'Civil Engineering Design Project (Capstone)',credits:3,term:8,cat:'major',prereq:['CE398'],critical:true},
      {id:'TechElective8',name:'Technical Elective VIII',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'TechElective9',name:'Technical Elective IX',credits:3,term:8,cat:'elective',prereq:[]},
      {id:'FreeElective2',name:'Free Elective II',credits:3,term:8,cat:'elective',prereq:[]},
    ]
  },

};

const GRADE_POINTS = {'A':4,'A-':3.67,'B+':3.33,'B':3,'B-':2.67,'C+':2.33,'C':2,'C-':1.67,'D':1,'F':0};
const TERM_START = {season:'Fall', year:2026}; // first semester

function termLabel(n){
  let seasonIdx = (n-1) % 2; // 0=Fall,1=Spring
  let yearOffset = Math.floor((n-1)/2);
  let season = seasonIdx===0 ? 'Fall' : 'Spring';
  let year = TERM_START.year + yearOffset + (seasonIdx===1 ? 1 : 0);
  return season+' '+year;
}

let state = { major:'ie', progress: {} };

const STORAGE_KEY = 'purdue-planner-state-v2';
const hasArtifactStorage = typeof window !== 'undefined' && !!window.storage;

function getProgress(){
  if(!state.progress[state.major]){ state.progress[state.major] = {completed:{}, grades:{}, inprogress:{}, predicted:{}, times:{}}; }
  const p = state.progress[state.major];
  if(!p.inprogress){ p.inprogress = {}; }
  if(!p.predicted){ p.predicted = {}; }
  return p;
}

function getCourses(){
  return PROGRAMS[state.major].courses;
}

async function loadState(){
  try{
    if(hasArtifactStorage){
      const res = await window.storage.get(STORAGE_KEY, false);
      if(res && res.value){ state = JSON.parse(res.value); }
    } else {
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){ state = JSON.parse(raw); }
    }
  }catch(e){ /* no saved state yet */ }
  if(!state.major || !PROGRAMS[state.major]){ state.major = 'ie'; }
  if(!state.progress){ state.progress = {}; }
  render();
}

let saveTimeout;
function saveState(){
  const statusEl = document.getElementById('saveStatus');
  if(statusEl) statusEl.textContent = 'saving…';
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async ()=>{
    try{
      if(hasArtifactStorage){
        await window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
      if(statusEl) statusEl.textContent = 'progress saved locally to this browser';
    }catch(e){
      if(statusEl) statusEl.textContent = 'save failed — progress may not persist';
    }
  }, 400);
}

function longestPaths(courses){
  const memo = {};
  function lp(id){
    if(memo[id]!==undefined) return memo[id];
    memo[id]=0; // guard cycles
    const dependents = courses.filter(c=>c.prereq.includes(id));
    let max=0;
    dependents.forEach(d=>{ max = Math.max(max, 1+lp(d.id)); });
    memo[id]=max;
    return max;
  }
  courses.forEach(c=>lp(c.id));
  return memo;
}

function buildSchedule(completedIds, maxCredits, courseList){
  const memo = longestPaths(courseList);
  let completed = new Set(completedIds);
  let remaining = courseList.filter(c=>!completed.has(c.id));
  let schedule = [];
  let term = 1;
  let guard = 0;
  while(remaining.length>0 && guard<40){
    guard++;
    let eligible = remaining.filter(c=>c.prereq.every(p=>completed.has(p)));
    if(eligible.length===0){ break; }
    eligible.sort((a,b)=> memo[b.id]-memo[a.id] || a.term-b.term);
    let bucket=[], sum=0;
    for(const c of eligible){
      if(sum + c.credits <= maxCredits){ bucket.push(c); sum += c.credits; }
    }
    if(bucket.length===0){ bucket=[eligible[0]]; sum=eligible[0].credits; }
    bucket.forEach(c=>completed.add(c.id));
    const bucketIds = new Set(bucket.map(c=>c.id));
    remaining = remaining.filter(c=>!bucketIds.has(c.id));
    schedule.push({term, courses:bucket, credits:sum});
    term++;
  }
  return schedule;
}

// Combinatorial lower bound on semesters needed, used to check whether the
// greedy schedule is provably optimal (no ILP solve required — this is the
// classic "relaxation bound" technique from scheduling theory).
function lowerBoundSemesters(remainingCourses, maxCredits){
  if(remainingCourses.length===0) return 0;
  const totalCredits = remainingCourses.reduce((s,c)=>s+c.credits,0);
  const boundByCredits = Math.ceil(totalCredits / maxCredits);
  const memo = longestPaths(remainingCourses);
  let maxDepth = 0;
  remainingCourses.forEach(c=>{ maxDepth = Math.max(maxDepth, memo[c.id]); });
  const boundByChain = maxDepth + 1; // longest prerequisite chain forces this many semesters minimum
  return Math.max(boundByCredits, boundByChain);
}

function catColor(cat){
  return {fye:'var(--gold)', major:'var(--ie)', support:'var(--science)', elective:'var(--elective)'}[cat] || 'var(--muted)';
}

function computeGPA(mode){
  const prog = getProgress();
  const courses = getCourses();
  let points=0, hours=0;
  courses.forEach(c=>{
    if(prog.completed[c.id] && prog.grades[c.id] && GRADE_POINTS[prog.grades[c.id]]!==undefined){
      points += GRADE_POINTS[prog.grades[c.id]] * c.credits;
      hours += c.credits;
    } else if(mode==='projected' && prog.inprogress[c.id] && prog.predicted[c.id] && GRADE_POINTS[prog.predicted[c.id]]!==undefined){
      points += GRADE_POINTS[prog.predicted[c.id]] * c.credits;
      hours += c.credits;
    }
  });
  return hours>0 ? (points/hours) : null;
}

function renderMajorSelector(){
  document.querySelectorAll('.major-btn').forEach(btn=>{
    const m = btn.getAttribute('data-major');
    btn.classList.toggle('active', m === state.major);
  });
  document.getElementById('programLabel').textContent = PROGRAMS[state.major].label;
  document.getElementById('programSchool').textContent = PROGRAMS[state.major].school;
}

const TT_DAYS = ['M','T','W','R','F'];
const TT_DAY_LABELS = {M:'Mon',T:'Tue',W:'Wed',R:'Thu',F:'Fri'};
const TT_START_HOUR = 8, TT_END_HOUR = 21; // 8:00am - 9:00pm
const TT_PX_PER_HOUR = 48;

function ttTimeToMinutes(t){
  if(!t) return null;
  const parts = t.split(':').map(Number);
  return parts[0]*60 + parts[1];
}

function getCourseMeetings(prog, id){
  let t = prog.times[id];
  if(!t){
    t = [];
    prog.times[id] = t; // must persist the reference so later pushes/edits actually stick
  } else if(!Array.isArray(t)){
    t = [t]; prog.times[id] = t; // migrate old single-block format
  }
  return t;
}

function renderTimetable(nextSemCourses, prog){
  const label = document.getElementById('ttSemesterLabel');
  if(!nextSemCourses || nextSemCourses.length===0){
    document.getElementById('ttCourseInputs').innerHTML = '<div class="tt-empty-msg">Nothing to schedule yet — check off courses in Currently Taking above, or complete requirements so the optimizer can suggest a next semester.</div>';
    document.getElementById('ttGrid').innerHTML = '';
    document.getElementById('ttConflicts').style.display = 'none';
    return;
  }

  if(!prog.times){ prog.times = {}; }

  const inputsEl = document.getElementById('ttCourseInputs');
  inputsEl.innerHTML = '';

  nextSemCourses.forEach(c=>{
    const meetings = getCourseMeetings(prog, c.id);
    if(meetings.length===0){ meetings.push({label:'', days:[], start:'', end:''}); }

    const group = document.createElement('div');
    group.className = 'tt-course-group';

    const header = document.createElement('div');
    header.className = 'tt-course-group-header';
    header.innerHTML = `<span class="cat-dot" style="background:${catColor(c.cat)}"></span><span class="tt-course-code">${c.id}</span>`;
    group.appendChild(header);

    meetings.forEach((m, idx)=>{
      const row = document.createElement('div');
      row.className = 'tt-meeting-row';
      row.innerHTML = `
        <input type="text" class="tt-meeting-label-input" data-course="${c.id}" data-idx="${idx}" placeholder="Lecture / Lab / Rec." value="${m.label||''}">
        <div class="tt-days">
          ${TT_DAYS.map(d=>`<button type="button" class="tt-day-btn ${m.days.includes(d)?'active':''}" data-day="${d}" data-course="${c.id}" data-idx="${idx}">${d}</button>`).join('')}
        </div>
        <input type="time" class="tt-time-input tt-start" data-course="${c.id}" data-idx="${idx}" value="${m.start||''}">
        <span style="color:var(--muted-dim);font-size:11px;">–</span>
        <input type="time" class="tt-time-input tt-end" data-course="${c.id}" data-idx="${idx}" value="${m.end||''}">
        ${meetings.length>1?`<button type="button" class="tt-remove-btn" data-course="${c.id}" data-idx="${idx}" title="Remove this meeting">×</button>`:''}
      `;
      group.appendChild(row);
    });

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'tt-add-btn';
    addBtn.setAttribute('data-course', c.id);
    addBtn.textContent = '+ Add meeting (e.g. Lab or Recitation)';
    group.appendChild(addBtn);

    inputsEl.appendChild(group);
  });

  inputsEl.querySelectorAll('.tt-day-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cid = btn.getAttribute('data-course');
      const idx = parseInt(btn.getAttribute('data-idx'),10);
      const day = btn.getAttribute('data-day');
      const meetings = getCourseMeetings(prog, cid);
      const m = meetings[idx];
      const dIdx = m.days.indexOf(day);
      if(dIdx>=0){ m.days.splice(dIdx,1); } else { m.days.push(day); }
      btn.classList.toggle('active');
      saveState();
      renderTimetableGrid(nextSemCourses, prog);
    });
  });
  inputsEl.querySelectorAll('.tt-start, .tt-end').forEach(inp=>{
    inp.addEventListener('change', ()=>{
      const cid = inp.getAttribute('data-course');
      const idx = parseInt(inp.getAttribute('data-idx'),10);
      const meetings = getCourseMeetings(prog, cid);
      if(inp.classList.contains('tt-start')){ meetings[idx].start = inp.value; }
      else { meetings[idx].end = inp.value; }
      saveState();
      renderTimetableGrid(nextSemCourses, prog);
    });
  });
  inputsEl.querySelectorAll('.tt-meeting-label-input').forEach(inp=>{
    inp.addEventListener('change', ()=>{
      const cid = inp.getAttribute('data-course');
      const idx = parseInt(inp.getAttribute('data-idx'),10);
      getCourseMeetings(prog, cid)[idx].label = inp.value;
      saveState();
    });
  });
  inputsEl.querySelectorAll('.tt-remove-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cid = btn.getAttribute('data-course');
      const idx = parseInt(btn.getAttribute('data-idx'),10);
      getCourseMeetings(prog, cid).splice(idx,1);
      saveState();
      renderTimetable(nextSemCourses, prog);
    });
  });
  inputsEl.querySelectorAll('.tt-add-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cid = btn.getAttribute('data-course');
      getCourseMeetings(prog, cid).push({label:'', days:[], start:'', end:''});
      saveState();
      renderTimetable(nextSemCourses, prog);
    });
  });

  renderTimetableGrid(nextSemCourses, prog);
}

function renderTimetableGrid(courses, prog){
  const grid = document.getElementById('ttGrid');
  const conflictsEl = document.getElementById('ttConflicts');
  const gridHeight = (TT_END_HOUR - TT_START_HOUR) * TT_PX_PER_HOUR;

  let html = '<div class="tt-grid-header"></div>';
  TT_DAYS.forEach(d=>{ html += `<div class="tt-grid-header">${TT_DAY_LABELS[d]}</div>`; });

  html += `<div class="tt-time-col" style="height:${gridHeight}px;">`;
  for(let h=TT_START_HOUR; h<TT_END_HOUR; h++){
    const label = (h%12===0?12:h%12) + (h>=12?'p':'a');
    html += `<div style="position:absolute;top:${(h-TT_START_HOUR)*TT_PX_PER_HOUR - 6}px;right:5px;font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--muted-dim);">${label}</div>`;
  }
  html += '</div>';

  const conflictMsgs = [];

  // flatten every course's meetings into a single list for grid placement
  const allMeetings = [];
  courses.forEach(c=>{
    getCourseMeetings(prog, c.id).forEach(m=>{
      if(m.days.length && m.start && m.end){ allMeetings.push({course:c, m}); }
    });
  });

  TT_DAYS.forEach(day=>{
    html += `<div class="tt-day-col" style="height:${gridHeight}px;">`;
    const blocks = allMeetings
      .filter(x=>x.m.days.includes(day))
      .map(x=>({course:x.course, m:x.m, conflict:false}));

    for(let i=0;i<blocks.length;i++){
      for(let j=i+1;j<blocks.length;j++){
        const s1 = ttTimeToMinutes(blocks[i].m.start), e1 = ttTimeToMinutes(blocks[i].m.end);
        const s2 = ttTimeToMinutes(blocks[j].m.start), e2 = ttTimeToMinutes(blocks[j].m.end);
        if(s1<e2 && s2<e1){
          blocks[i].conflict = true; blocks[j].conflict = true;
          const label1 = blocks[i].course.id + (blocks[i].m.label?` (${blocks[i].m.label})`:'');
          const label2 = blocks[j].course.id + (blocks[j].m.label?` (${blocks[j].m.label})`:'');
          conflictMsgs.push(`${label1} ↔ ${label2} on ${TT_DAY_LABELS[day]}`);
        }
      }
    }

    blocks.forEach(b=>{
      const startMin = ttTimeToMinutes(b.m.start) - TT_START_HOUR*60;
      const endMin = ttTimeToMinutes(b.m.end) - TT_START_HOUR*60;
      if(endMin<=startMin) return;
      const top = (startMin/60)*TT_PX_PER_HOUR;
      const height = Math.max(((endMin-startMin)/60)*TT_PX_PER_HOUR, 18);
      const color = catColor(b.course.cat);
      const sub = b.m.label ? b.m.label : (b.course.id);
      html += `<div class="tt-block ${b.conflict?'conflict':''}" style="top:${top}px;height:${height}px;background:color-mix(in srgb, ${color} 18%, var(--bg-panel));border-color:${color};">
        <b>${b.course.id}</b>${b.m.label?' <i>('+b.m.label+')</i>':''}<br>${b.m.start}–${b.m.end}
      </div>`;
    });
    html += '</div>';
  });

  grid.innerHTML = html;

  if(conflictMsgs.length>0){
    conflictsEl.innerHTML = '⚠ Time conflict: ' + conflictMsgs.join(' · ');
    conflictsEl.style.display = 'block';
  } else {
    conflictsEl.style.display = 'none';
  }
}

// ============================================================
// Semester calendar (official Purdue 2026-27 dates + projection)
// ============================================================
const TERM_DATES_BASE = {
  1: { // Fall 2026 — official
    classesStart:'2026-08-24', classesEnd:'2026-12-12',
    finalsStart:'2026-12-14', finalsEnd:'2026-12-19',
    breaks:[ {name:'Fall Break', start:'2026-10-12', end:'2026-10-13'},
             {name:'Thanksgiving Break', start:'2026-11-25', end:'2026-11-28'} ],
    confirmed:true
  },
  2: { // Spring 2027 — official
    classesStart:'2027-01-11', classesEnd:'2027-05-01',
    finalsStart:'2027-05-03', finalsEnd:'2027-05-08',
    breaks:[ {name:'Spring Break', start:'2027-03-15', end:'2027-03-20'} ],
    confirmed:true
  }
};

function pad2(n){ return String(n).padStart(2,'0'); }
function dateKey(d){ return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate()); }
function shiftDateStr(dateStr, days){
  const d = new Date(dateStr+'T00:00:00');
  d.setDate(d.getDate()+days);
  return dateKey(d);
}

function getTermDates(absTerm){
  if(TERM_DATES_BASE[absTerm]) return TERM_DATES_BASE[absTerm];
  const isFall = (absTerm % 2 === 1);
  const baseTerm = isFall ? 1 : 2;
  const base = TERM_DATES_BASE[baseTerm];
  const cyclesAhead = Math.round((absTerm - baseTerm) / 2);
  const shift = cyclesAhead * 371; // 53 weeks — keeps weekday, approximates a year
  return {
    classesStart: shiftDateStr(base.classesStart, shift),
    classesEnd: shiftDateStr(base.classesEnd, shift),
    finalsStart: shiftDateStr(base.finalsStart, shift),
    finalsEnd: shiftDateStr(base.finalsEnd, shift),
    breaks: base.breaks.map(b=>({name:b.name, start:shiftDateStr(b.start,shift), end:shiftDateStr(b.end,shift)})),
    confirmed:false
  };
}

function buildDayTypeMap(termDates){
  const map = {};
  function markRange(start,end,type){
    let d = new Date(start+'T00:00:00');
    const endD = new Date(end+'T00:00:00');
    while(d<=endD){ map[dateKey(d)] = type; d.setDate(d.getDate()+1); }
  }
  markRange(termDates.finalsStart, termDates.finalsEnd, 'finals');
  termDates.breaks.forEach(b=>markRange(b.start, b.end, 'break'));
  map[termDates.classesStart] = 'classstart';
  map[termDates.classesEnd] = 'classend';
  return map;
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderMonthGrid(year, monthIdx, dayTypeMap){
  const dim = new Date(year, monthIdx+1, 0).getDate();
  const firstDow = new Date(year, monthIdx, 1).getDay();
  let html = `<div class="cal-month"><div class="cal-month-title">${MONTH_NAMES[monthIdx]} ${year}</div><div class="cal-grid">`;
  ['S','M','T','W','T','F','S'].forEach(d=>{ html += `<div class="cal-dow">${d}</div>`; });
  for(let i=0;i<firstDow;i++){ html += '<div class="cal-day empty"></div>'; }
  for(let day=1; day<=dim; day++){
    const key = year+'-'+pad2(monthIdx+1)+'-'+pad2(day);
    const type = dayTypeMap[key] || '';
    html += `<div class="cal-day ${type}">${day}</div>`;
  }
  html += '</div></div>';
  return html;
}

let currentNextSemCourses = [];
let currentTermDates = null;

function renderCalendar(absTermNext){
  const badge = document.getElementById('calConfirmBadge');
  const kd = document.getElementById('calKeyDates');
  const monthsEl = document.getElementById('calMonths');

  if(!absTermNext){
    badge.textContent = ''; kd.innerHTML=''; monthsEl.innerHTML=''; currentTermDates=null;
    return;
  }

  const termDates = getTermDates(absTermNext);
  currentTermDates = termDates;

  badge.textContent = termDates.confirmed ? '✓ official dates' : '≈ projected dates';
  badge.className = 'cal-badge ' + (termDates.confirmed ? 'confirmed' : 'estimated');

  kd.innerHTML = `
    <span><span class="kd-dot" style="background:var(--complete)"></span>First day: ${termDates.classesStart}</span>
    <span><span class="kd-dot" style="background:var(--gold-bright)"></span>Last day of classes: ${termDates.classesEnd}</span>
    <span><span class="kd-dot" style="background:var(--danger)"></span>Finals: ${termDates.finalsStart} – ${termDates.finalsEnd}</span>
    ${termDates.breaks.map(b=>`<span><span class="kd-dot" style="background:var(--science)"></span>${b.name}: ${b.start} – ${b.end}</span>`).join('')}
  `;

  const dayTypeMap = buildDayTypeMap(termDates);
  const startD = new Date(termDates.classesStart+'T00:00:00');
  const endD = new Date(termDates.finalsEnd+'T00:00:00');
  let months = [];
  let cursor = new Date(startD.getFullYear(), startD.getMonth(), 1);
  while(cursor <= endD){
    months.push({year:cursor.getFullYear(), month:cursor.getMonth()});
    cursor.setMonth(cursor.getMonth()+1);
  }
  monthsEl.innerHTML = months.map(m=>renderMonthGrid(m.year, m.month, dayTypeMap)).join('');
}

// ---- .ics export ----
const ICS_DAY_MAP = {M:'MO',T:'TU',W:'WE',R:'TH',F:'FR'};
const JS_WEEKDAY = {M:1,T:2,W:3,R:4,F:5};

function nextOccurrence(startDateStr, jsWeekday){
  let d = new Date(startDateStr+'T00:00:00');
  while(d.getDay() !== jsWeekday){ d.setDate(d.getDate()+1); }
  return d;
}
function icsDateTime(d,h,m){
  return d.getFullYear()+pad2(d.getMonth()+1)+pad2(d.getDate())+'T'+pad2(h)+pad2(m)+'00';
}

function generateICS(courses, prog, termDates){
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Smart Course Planner//EN','CALSCALE:GREGORIAN'];
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
  const untilStr = termDates.classesEnd.replace(/-/g,'') + 'T235900Z';

  courses.forEach(c=>{
    const meetings = getCourseMeetings(prog, c.id);
    meetings.forEach((t, mi)=>{
      if(!t || !t.days || t.days.length===0 || !t.start || !t.end) return;
      const byday = t.days.map(d=>ICS_DAY_MAP[d]).join(',');
      const earliestDay = t.days.slice().sort((a,b)=>JS_WEEKDAY[a]-JS_WEEKDAY[b])[0];
      const dtstartDate = nextOccurrence(termDates.classesStart, JS_WEEKDAY[earliestDay]);
      const [sh,sm] = t.start.split(':').map(Number);
      const [eh,em] = t.end.split(':').map(Number);
      const summary = c.id + (t.label?(' ('+t.label+')'):'') + ' \u2014 ' + c.name.replace(/,/g,'');
      lines.push('BEGIN:VEVENT');
      lines.push('UID:'+c.id+'-'+mi+'-'+now.getTime()+'@smartcourseplanner');
      lines.push('DTSTAMP:'+dtstamp);
      lines.push('DTSTART:'+icsDateTime(dtstartDate,sh,sm));
      lines.push('DTEND:'+icsDateTime(dtstartDate,eh,em));
      lines.push('RRULE:FREQ=WEEKLY;BYDAY='+byday+';UNTIL='+untilStr);
      lines.push('SUMMARY:'+summary);
      lines.push('END:VEVENT');
    });
  });

  function addAllDay(name, dateStr){
    lines.push('BEGIN:VEVENT');
    lines.push('UID:'+name.replace(/\s/g,'')+'-'+dateStr+'@smartcourseplanner');
    lines.push('DTSTAMP:'+dtstamp);
    lines.push('DTSTART;VALUE=DATE:'+dateStr.replace(/-/g,''));
    lines.push('SUMMARY:'+name);
    lines.push('END:VEVENT');
  }
  addAllDay('First Day of Classes', termDates.classesStart);
  addAllDay('Last Day of Classes', termDates.classesEnd);
  addAllDay('Final Exams Begin', termDates.finalsStart);
  termDates.breaks.forEach(b=>addAllDay(b.name, b.start));

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function renderCurrentlyTaking(courses, prog){
  const listEl = document.getElementById('currentCourseList');
  const emptyEl = document.getElementById('currentEmptyMsg');
  const completedOnly = new Set(Object.keys(prog.completed).filter(id=>prog.completed[id]));

  const eligible = courses.filter(c=>
    !prog.completed[c.id] && !prog.inprogress[c.id] &&
    c.prereq.every(p=>completedOnly.has(p))
  );

  const taking = courses.filter(c=>prog.inprogress[c.id]);

  listEl.innerHTML = '';

  if(taking.length>0){
    const groupLabel = document.createElement('div');
    groupLabel.className = 'current-group-label';
    groupLabel.textContent = 'TAKING NOW';
    listEl.appendChild(groupLabel);
    taking.forEach(c=>{
      listEl.appendChild(buildCurrentRow(c, prog, true));
    });
  }

  if(eligible.length>0){
    const groupLabel2 = document.createElement('div');
    groupLabel2.className = 'current-group-label';
    groupLabel2.textContent = 'ELIGIBLE TO ADD (prerequisites met)';
    listEl.appendChild(groupLabel2);
    eligible.forEach(c=>{
      listEl.appendChild(buildCurrentRow(c, prog, false));
    });
  }

  emptyEl.style.display = (taking.length===0 && eligible.length===0) ? 'block' : 'none';

  listEl.querySelectorAll('input[type=checkbox]').forEach(cb=>{
    cb.addEventListener('change', e=>{
      const id = e.target.getAttribute('data-id');
      const p = getProgress();
      p.inprogress[id] = e.target.checked;
      if(!e.target.checked){ delete p.predicted[id]; }
      saveState();
      render();
    });
  });
  listEl.querySelectorAll('select.predicted-grade').forEach(sel=>{
    sel.addEventListener('change', e=>{
      const id = e.target.getAttribute('data-id');
      getProgress().predicted[id] = e.target.value;
      saveState();
      render();
    });
  });
}

function buildCurrentRow(c, prog, isTaking){
  const row = document.createElement('div');
  row.className = 'current-course-row';
  const pred = prog.predicted[c.id] || '';
  row.innerHTML = `
    <input type="checkbox" data-id="${c.id}" ${isTaking?'checked':''}>
    <span class="cat-dot" style="background:${catColor(c.cat)}"></span>
    <span class="current-course-code">${c.id}</span>
    <span class="current-course-name">${c.name}</span>
    <span class="current-course-credits">${c.credits} cr</span>
    ${isTaking?`<select class="predicted-grade" data-id="${c.id}">
      <option value="">predicted grade…</option>
      ${Object.keys(GRADE_POINTS).map(g=>`<option value="${g}" ${pred===g?'selected':''}>${g}</option>`).join('')}
    </select>`:''}
  `;
  return row;
}

function render(){
  renderMajorSelector();

  const courses = getCourses();
  const prog = getProgress();
  const totalCredits = courses.reduce((s,c)=>s+c.credits,0);

  const capInput = document.getElementById('creditCap');
  const maxCredits = parseInt(capInput.value,10);
  document.getElementById('creditCapVal').textContent = maxCredits;

  const completedIds = Object.keys(prog.completed).filter(id=>prog.completed[id]);
  const inprogressIds = Object.keys(prog.inprogress).filter(id=>prog.inprogress[id]);
  const satisfiedIds = completedIds.concat(inprogressIds);
  const schedule = buildSchedule(satisfiedIds, maxCredits, courses);

  const completedCredits = courses.filter(c=>prog.completed[c.id]).reduce((s,c)=>s+c.credits,0);
  const inProgressCredits = courses.filter(c=>prog.inprogress[c.id]).reduce((s,c)=>s+c.credits,0);
  document.getElementById('totalCreditsLabel').textContent = totalCredits + ' cr';
  document.getElementById('statCompleted').textContent = completedCredits;
  document.getElementById('statCompletedSub').textContent = 'of '+totalCredits+' total';
  document.getElementById('statInProgress').textContent = inProgressCredits;
  document.getElementById('statInProgressSub').textContent = inprogressIds.length + ' course'+(inprogressIds.length===1?'':'s')+' this semester';
  document.getElementById('statRemaining').textContent = (totalCredits - completedCredits - inProgressCredits);
  document.getElementById('statSemesters').textContent = schedule.length;

  let maxCompletedTerm = 0;
  courses.forEach(c=>{ if(prog.completed[c.id] || prog.inprogress[c.id]) maxCompletedTerm = Math.max(maxCompletedTerm, c.term); });
  let absoluteGradTerm = maxCompletedTerm + schedule.length;
  document.getElementById('statGrad').textContent = (schedule.length===0 && satisfiedIds.length===courses.length) ? '✓ Complete' : termLabel(absoluteGradTerm);

  const gpa = computeGPA('actual');
  const projGpa = computeGPA('projected');
  document.getElementById('statGPA').textContent = gpa===null ? '—' : gpa.toFixed(2);
  document.getElementById('statGPASub').textContent = gpa===null ? 'no grades entered' : 'based on completed courses';
  document.getElementById('statProjGPA').textContent = projGpa===null ? '—' : projGpa.toFixed(2);
  document.getElementById('statProjGPASub').textContent = projGpa===null ? 'add predicted grades below' : 'incl. predicted grades this semester';

  renderCurrentlyTaking(courses, prog);

  // ---- optimality verification (lower bound technique) ----
  const remainingCourses = courses.filter(c=>!prog.completed[c.id] && !prog.inprogress[c.id]);
  const lb = lowerBoundSemesters(remainingCourses, maxCredits);
  const gap = schedule.length - lb;
  const badge = document.getElementById('optimalityBadge');
  if(remainingCourses.length===0){
    badge.innerHTML = '';
  } else if(gap<=0){
    badge.innerHTML = '<span class="opt-badge opt-good">✓ Provably optimal — matches the combinatorial lower bound ('+lb+' semester'+(lb===1?'':'s')+')</span>';
  } else {
    badge.innerHTML = '<span class="opt-badge opt-gap">Greedy: '+schedule.length+' sem · Lower bound: '+lb+' sem · gap: '+gap+' — true optimum is NP-hard to compute exactly at this scale, but the greedy result is within '+gap+' semester'+(gap===1?'':'s')+' of the best any scheduler could theoretically do</span>';
  }

  const grid = document.getElementById('semgrid');
  grid.innerHTML = '';

  if(schedule.length===0){
    const done = document.createElement('div');
    done.style.gridColumn='1/-1';
    done.style.padding='30px';
    done.style.textAlign='center';
    done.style.color='var(--muted)';
    done.textContent = '✓ All requirements marked complete.';
    grid.appendChild(done);
  }

  schedule.forEach(sem=>{
    const absTerm = maxCompletedTerm + sem.term;
    const card = document.createElement('div');
    card.className = 'semcard';
    const over = sem.credits > maxCredits;
    card.innerHTML = `
      <div class="semcard-head">
        <div class="semcard-title">${termLabel(absTerm)}</div>
        <div class="semcard-credits ${over?'over':''}">${sem.credits} cr</div>
      </div>
      <div class="courselist" data-term="${sem.term}"></div>
    `;
    const list = card.querySelector('.courselist');
    sem.courses.sort((a,b)=>a.term-b.term).forEach(c=>{
      const row = document.createElement('div');
      row.className='course-row';
      const checked = !!prog.completed[c.id];
      const grade = prog.grades[c.id] || '';
      row.innerHTML = `
        <input type="checkbox" data-id="${c.id}" ${checked?'checked':''}>
        <div class="course-main">
          <div class="course-top">
            <span class="cat-dot" style="background:${catColor(c.cat)}"></span>
            <span class="course-code">${c.id}</span>
            ${c.critical?'<span class="badge crit">critical</span>':''}
            ${c.optimization?'<span class="badge opt">optimization</span>':''}
          </div>
          <div class="course-name ${checked?'done':''}">${c.name}</div>
          <div class="course-meta-row">
            <span class="course-credits">${c.credits} cr</span>
            ${checked?`<select class="grade" data-id="${c.id}">
              <option value="">grade…</option>
              ${Object.keys(GRADE_POINTS).map(g=>`<option value="${g}" ${grade===g?'selected':''}>${g}</option>`).join('')}
            </select>`:''}
          </div>
        </div>
      `;
      list.appendChild(row);
    });
    grid.appendChild(card);
  });

  grid.querySelectorAll('input[type=checkbox]').forEach(cb=>{
    cb.addEventListener('change', e=>{
      const id = e.target.getAttribute('data-id');
      const p = getProgress();
      p.completed[id] = e.target.checked;
      if(!e.target.checked){ delete p.grades[id]; }
      saveState();
      render();
    });
  });
  grid.querySelectorAll('select.grade').forEach(sel=>{
    sel.addEventListener('change', e=>{
      const id = e.target.getAttribute('data-id');
      getProgress().grades[id] = e.target.value;
      saveState();
      render();
    });
  });

  // ---- weekly timetable + semester calendar ----
  // Prefer the student's actual Currently Taking courses; fall back to the
  // optimizer's next suggested semester if nothing is marked in-progress yet.
  const takingCourses = courses.filter(c=>prog.inprogress[c.id]);
  if(takingCourses.length>0){
    currentNextSemCourses = takingCourses;
    document.getElementById('ttSemesterLabel').textContent = termLabel(maxCompletedTerm) + ' · your courses';
    renderTimetable(currentNextSemCourses, prog);
    renderCalendar(maxCompletedTerm);
  } else if(schedule.length>0){
    const absTermNext = maxCompletedTerm + schedule[0].term;
    currentNextSemCourses = schedule[0].courses;
    document.getElementById('ttSemesterLabel').textContent = termLabel(absTermNext) + ' · suggested';
    renderTimetable(currentNextSemCourses, prog);
    renderCalendar(absTermNext);
  } else {
    currentNextSemCourses = [];
    renderTimetable([], prog);
    renderCalendar(null);
  }
}

function initPlanner(){
  document.getElementById('creditCap').addEventListener('input', render);
  document.getElementById('calExportBtn').addEventListener('click', ()=>{
    if(!currentTermDates || currentNextSemCourses.length===0){
      alert('Nothing to export yet — set at least one course\'s days/time in the timetable above first.');
      return;
    }
    const prog = getProgress();
    const ics = generateICS(currentNextSemCourses, prog, currentTermDates);
    const blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.major + '-next-semester.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  document.querySelectorAll('.major-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const m = btn.getAttribute('data-major');
      if(m === state.major) return;
      state.major = m;
      saveState();
      render();
    });
  });
  document.getElementById('resetBtn').addEventListener('click', ()=>{
    if(confirm('Clear all completed courses and grades for the current major? This cannot be undone.')){
      state.progress[state.major] = {completed:{}, grades:{}, inprogress:{}, predicted:{}, times:{}};
      saveState();
      render();
    }
  });
  loadState();
}
