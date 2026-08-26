// Complete NCDC Syllabus Tutorial Data
// O-Level (S.1 - S.4) and A-Level (S.5 - S.6)

const tutorials = [
  // ============================================
  // O-LEVEL SECTION 1: COMPUTER BASICS & ICT TOOLS
  // ============================================
  {
    id: 's1-001', level: 's1', title: 'Identifying ICT Tools',
    description: 'Learn to identify common ICT tools and their uses in everyday life.',
    topic: 'computer-basics', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['tools','hardware','identification'], prerequisites: [],
    url: 'o-level/computer-basics/identifying-ict-tools.html'
  },
  {
    id: 's1-002', level: 's1', title: 'What Does Each ICT Device Do?',
    description: 'Understand the specific functions of different ICT devices.',
    topic: 'computer-basics', difficulty: 'beginner', practical: false, time: '3 min',
    tags: ['devices','functions'], prerequisites: ['Identifying ICT Tools'],
    url: 'o-level/computer-basics/ict-device-functions.html'
  },
  {
    id: 's1-003', level: 's1', title: 'Input, Output, Storage & Processing Devices',
    description: 'Understand the four main categories of computer hardware and their functions.',
    topic: 'hardware', difficulty: 'beginner', practical: false, time: '5 min',
    tags: ['hardware','input','output','storage','processing'], prerequisites: ['Identifying ICT Tools'],
    url: 'o-level/computer-basics/input-output-storage.html'
  },
  {
    id: 's1-004', level: 's1', title: 'The Information Processing Cycle',
    description: 'Learn how data becomes information through the processing cycle.',
    topic: 'computer-basics', difficulty: 'beginner', practical: false, time: '4 min',
    tags: ['processing','data','information'], prerequisites: ['Input, Output, Storage & Processing Devices'],
    url: 'o-level/computer-basics/information-processing-cycle.html'
  },
  {
    id: 's1-005', level: 's1', title: 'ICT Tools in Different Fields',
    description: 'Explore how ICT tools are used in education, healthcare, business, and more.',
    topic: 'computer-basics', difficulty: 'beginner', practical: false, time: '4 min',
    tags: ['applications','fields','real-world'], prerequisites: ['Identifying ICT Tools'],
    url: 'o-level/computer-basics/ict-tools-fields.html'
  },
  {
    id: 's1-006', level: 's1', title: 'Safe Use of ICT Equipment',
    description: 'Learn proper handling and safety procedures for ICT equipment.',
    topic: 'computer-basics', difficulty: 'beginner', practical: true, time: '3 min',
    tags: ['safety','equipment','handling'], prerequisites: [],
    url: 'o-level/computer-basics/safe-use-ict.html'
  },
  {
    id: 's1-007', level: 's1', title: 'Computer Laboratory Rules',
    description: 'Essential safety and conduct rules for using a computer laboratory.',
    topic: 'computer-basics', difficulty: 'beginner', practical: false, time: '3 min',
    tags: ['safety','lab','rules'], prerequisites: [],
    url: 'o-level/computer-basics/lab-rules.html'
  },

  // ============================================
  // O-LEVEL SECTION 2: HARDWARE & SYSTEM STARTUP
  // ============================================
  {
    id: 's2-001', level: 's2', title: 'Inside a Computer: What Is Each Component?',
    description: 'Explore the internal components of a computer and what each one does.',
    topic: 'hardware', difficulty: 'beginner', practical: true, time: '6 min',
    tags: ['hardware','components','cpu','ram'], prerequisites: ['Input, Output, Storage & Processing Devices'],
    url: 'o-level/hardware/inside-a-computer.html'
  },
  {
    id: 's2-002', level: 's2', title: 'CPU, RAM and Storage Explained',
    description: 'Understanding the core components that make a computer work.',
    topic: 'hardware', difficulty: 'beginner', practical: false, time: '5 min',
    tags: ['cpu','ram','storage','memory'], prerequisites: ['Inside a Computer: What Is Each Component?'],
    url: 'o-level/hardware/cpu-ram-storage.html'
  },
  {
    id: 's2-003', level: 's2', title: 'Connecting Computer Components',
    description: 'Learn how to properly connect various hardware components.',
    topic: 'hardware', difficulty: 'beginner', practical: true, time: '5 min',
    tags: ['connections','setup','cables'], prerequisites: ['Inside a Computer: What Is Each Component?'],
    url: 'o-level/hardware/connecting-components.html'
  },
  {
    id: 's2-004', level: 's2', title: 'How to Assemble a Computer',
    description: 'Step-by-step guide to building a computer from parts.',
    topic: 'hardware', difficulty: 'advanced', practical: true, time: '10 min',
    tags: ['assembly','building','hardware'], prerequisites: ['Connecting Computer Components'],
    url: 'o-level/hardware/assemble-computer.html'
  },
  {
    id: 's2-005', level: 's2', title: 'Connecting a Monitor, Keyboard & Mouse',
    description: 'Step-by-step guide to connecting basic peripherals to a computer.',
    topic: 'hardware', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['peripherals','connections','setup'], prerequisites: ['Inside a Computer: What Is Each Component?'],
    url: 'o-level/hardware/connecting-peripherals.html'
  },
  {
    id: 's2-006', level: 's2', title: 'Connecting Printers and Scanners',
    description: 'How to connect and set up printers and scanners on a computer.',
    topic: 'hardware', difficulty: 'intermediate', practical: true, time: '5 min',
    tags: ['printers','scanners','peripherals'], prerequisites: ['Connecting a Monitor, Keyboard & Mouse'],
    url: 'o-level/hardware/connecting-printers-scanners.html'
  },
  {
    id: 's2-007', level: 's2', title: 'How to Start a Computer Correctly',
    description: 'Proper boot-up procedures to avoid system errors.',
    topic: 'hardware', difficulty: 'beginner', practical: true, time: '3 min',
    tags: ['startup','boot','power'], prerequisites: [],
    url: 'o-level/hardware/start-computer.html'
  },
  {
    id: 's2-008', level: 's2', title: 'How to Shut Down a Computer Correctly',
    description: 'Proper shutdown procedures to prevent data loss and system damage.',
    topic: 'hardware', difficulty: 'beginner', practical: true, time: '3 min',
    tags: ['shutdown','power','safety'], prerequisites: ['How to Start a Computer Correctly'],
    url: 'o-level/hardware/shutdown-computer.html'
  },
  {
    id: 's2-009', level: 's2', title: 'Computer Peripheral Devices',
    description: 'Understanding different types of peripheral devices and their uses.',
    topic: 'hardware', difficulty: 'beginner', practical: false, time: '4 min',
    tags: ['peripherals','devices','input','output'], prerequisites: ['Connecting a Monitor, Keyboard & Mouse'],
    url: 'o-level/hardware/peripheral-devices.html'
  },
  {
    id: 's2-010', level: 's2', title: 'Finding Computer Specifications',
    description: 'How to check your computer\'s hardware and software specifications.',
    topic: 'hardware', difficulty: 'intermediate', practical: true, time: '5 min',
    tags: ['specs','system','information'], prerequisites: ['Inside a Computer: What Is Each Component?'],
    url: 'o-level/hardware/finding-specs.html'
  },
  {
    id: 's2-011', level: 's2', title: 'Basic Hardware Troubleshooting',
    description: 'Common hardware problems and how to fix them.',
    topic: 'hardware', difficulty: 'intermediate', practical: true, time: '6 min',
    tags: ['troubleshooting','hardware','problems'], prerequisites: ['Finding Computer Specifications'],
    url: 'o-level/hardware/hardware-troubleshooting.html'
  },

  // ============================================
  // O-LEVEL SECTION 3: WORD PROCESSING
  // ============================================
  {
    id: 's3-001', level: 's3', title: 'Creating Your First Document',
    description: 'Open a word processor, type text, and save your first document.',
    topic: 'word-processing', difficulty: 'beginner', practical: true, time: '5 min',
    tags: ['word','document','saving'], prerequisites: ['Connecting a Monitor, Keyboard & Mouse'],
    url: 'o-level/word-processing/first-document.html'
  },
  {
    id: 's3-002', level: 's3', title: 'Typing and Editing Text',
    description: 'Learn basic text entry, selection, and editing techniques.',
    topic: 'word-processing', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['word','typing','editing'], prerequisites: ['Creating Your First Document'],
    url: 'o-level/word-processing/typing-editing.html'
  },
  {
    id: 's3-003', level: 's3', title: 'Selecting and Moving Text',
    description: 'How to select, copy, cut, and paste text efficiently.',
    topic: 'word-processing', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['word','selection','cut','copy','paste'], prerequisites: ['Typing and Editing Text'],
    url: 'o-level/word-processing/selecting-moving-text.html'
  },
  {
    id: 's3-004', level: 's3', title: 'Font Formatting',
    description: 'Change font type, size, color, and style to make documents look professional.',
    topic: 'word-processing', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['word','formatting','font'], prerequisites: ['Selecting and Moving Text'],
    url: 'o-level/word-processing/font-formatting.html'
  },
  {
    id: 's3-005', level: 's3', title: 'Paragraph Formatting',
    description: 'Align text, set spacing, and format paragraphs effectively.',
    topic: 'word-processing', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['word','paragraphs','alignment','spacing'], prerequisites: ['Font Formatting'],
    url: 'o-level/word-processing/paragraph-formatting.html'
  },
  {
    id: 's3-006', level: 's3', title: 'Page Setup',
    description: 'Configure margins, orientation, and page size for your documents.',
    topic: 'word-processing', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['word','page','margins','orientation'], prerequisites: ['Paragraph Formatting'],
    url: 'o-level/word-processing/page-setup.html'
  },
  {
    id: 's3-007', level: 's3', title: 'Tables in Word',
    description: 'Create and format tables to present data clearly.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '5 min',
    tags: ['word','tables','data'], prerequisites: ['Page Setup'],
    url: 'o-level/word-processing/tables.html'
  },
  {
    id: 's3-008', level: 's3', title: 'Images in Documents',
    description: 'Insert and position images in your documents.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '4 min',
    tags: ['word','images','pictures'], prerequisites: ['Tables in Word'],
    url: 'o-level/word-processing/images.html'
  },
  {
    id: 's3-009', level: 's3', title: 'Text Wrapping',
    description: 'Control how text flows around images and objects.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '4 min',
    tags: ['word','wrapping','images'], prerequisites: ['Images in Documents'],
    url: 'o-level/word-processing/text-wrapping.html'
  },
  {
    id: 's3-010', level: 's3', title: 'Headers and Footers',
    description: 'Add consistent headers and footers to your documents.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '4 min',
    tags: ['word','headers','footers'], prerequisites: ['Page Setup'],
    url: 'o-level/word-processing/headers-footers.html'
  },
  {
    id: 's3-011', level: 's3', title: 'Page Numbers',
    description: 'Add page numbers to your documents in various formats.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '3 min',
    tags: ['word','page numbers'], prerequisites: ['Headers and Footers'],
    url: 'o-level/word-processing/page-numbers.html'
  },
  {
    id: 's3-012', level: 's3', title: 'Columns in Word',
    description: 'Create newsletter-style columns for your documents.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '4 min',
    tags: ['word','columns','layout'], prerequisites: ['Page Setup'],
    url: 'o-level/word-processing/columns.html'
  },
  {
    id: 's3-013', level: 's3', title: 'Footnotes and Endnotes',
    description: 'Add academic references using footnotes and endnotes.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '4 min',
    tags: ['word','footnotes','references'], prerequisites: ['Page Numbers'],
    url: 'o-level/word-processing/footnotes-endnotes.html'
  },
  {
    id: 's3-014', level: 's3', title: 'Watermarks',
    description: 'Add confidentiality or draft watermarks to documents.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '3 min',
    tags: ['word','watermarks'], prerequisites: ['Page Setup'],
    url: 'o-level/word-processing/watermarks.html'
  },
  {
    id: 's3-015', level: 's3', title: 'Table of Contents',
    description: 'Automatically generate a table of contents for long documents.',
    topic: 'word-processing', difficulty: 'advanced', practical: true, time: '6 min',
    tags: ['word','toc','headings'], prerequisites: ['Font Formatting','Paragraph Formatting'],
    url: 'o-level/word-processing/table-of-contents.html'
  },
  {
    id: 's3-016', level: 's3', title: 'Lists of Figures and Tables',
    description: 'Create automatic lists of figures and tables in your document.',
    topic: 'word-processing', difficulty: 'advanced', practical: true, time: '5 min',
    tags: ['word','figures','tables','lists'], prerequisites: ['Table of Contents','Images in Documents'],
    url: 'o-level/word-processing/lists-figures-tables.html'
  },
  {
    id: 's3-017', level: 's3', title: 'Password-Protecting Documents',
    description: 'Secure your documents with password protection.',
    topic: 'word-processing', difficulty: 'intermediate', practical: true, time: '3 min',
    tags: ['word','security','passwords'], prerequisites: ['Creating Your First Document'],
    url: 'o-level/word-processing/password-protect.html'
  },
  {
    id: 's3-018', level: 's3', title: 'Mail Merge — Step by Step',
    description: 'Create personalized letters and envelopes for multiple recipients.',
    topic: 'word-processing', difficulty: 'advanced', practical: true, time: '8 min',
    tags: ['word','mail-merge','personalization'], prerequisites: ['Tables in Word'],
    url: 'o-level/word-processing/mail-merge.html'
  },
  {
    id: 's3-019', level: 's3', title: 'Creating a School Magazine',
    description: 'Combine all your Word skills to create a professional school magazine.',
    topic: 'word-processing', difficulty: 'advanced', practical: true, time: '12 min',
    tags: ['word','magazine','project'], prerequisites: ['Columns in Word','Images in Documents','Table of Contents'],
    url: 'o-level/word-processing/school-magazine.html'
  },

  // ============================================
  // O-LEVEL SECTION 4: SPREADSHEETS
  // ============================================
  {
    id: 's4-001', level: 's4', title: 'Entering Data in Excel',
    description: 'Learn to enter and organize data in Excel spreadsheets.',
    topic: 'spreadsheets', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['excel','data-entry','spreadsheets'], prerequisites: ['Connecting a Monitor, Keyboard & Mouse'],
    url: 'o-level/spreadsheets/entering-data.html'
  },
  {
    id: 's4-002', level: 's4', title: 'Cell Formatting in Excel',
    description: 'Format cells to make your data clear and professional.',
    topic: 'spreadsheets', difficulty: 'beginner', practical: true, time: '4 min',
    tags: ['excel','formatting','cells'], prerequisites: ['Entering Data in Excel'],
    url: 'o-level/spreadsheets/cell-formatting.html'
  },
  {
    id: 's4-003', level: 's4', title: 'Basic Formulas in Excel',
    description: 'Write your first formulas for addition, subtraction, and more.',
    topic: 'spreadsheets', difficulty: 'beginner', practical: true, time: '5 min',
    tags: ['excel','formulas','calculations'], prerequisites: ['Entering Data in Excel'],
    url: 'o-level/spreadsheets/basic-formulas.html'
  },
  {
    id: 's4-004', level: 's4', title: 'SUM Function in Excel',
    description: 'Use the SUM function to quickly add up numbers.',
    topic: 'spreadsheets', difficulty: 'beginner', practical: true, time: '3 min',
    tags: ['excel','sum','functions'], prerequisites: ['Basic Formulas in Excel'],
    url: 'o-level/spreadsheets/sum-function.html'
  },
  {
    id: 's4-005', level: 's4', title: 'AVERAGE Function in Excel',
    description: 'Calculate averages quickly with the AVERAGE function.',
    topic: 'spreadsheets', difficulty: 'beginner', practical: true, time: '3 min',
    tags: ['excel','average','functions'], prerequisites: ['SUM Function in Excel'],
    url: 'o-level/spreadsheets/average-function.html'
  },
  {
    id: 's4-006', level: 's4', title: 'MIN & MAX Functions in Excel',
    description: 'Find the smallest and largest values in your data.',
    topic: 'spreadsheets', difficulty: 'beginner', practical: true, time: '3 min',
    tags: ['excel','min','max','functions'], prerequisites: ['AVERAGE Function in Excel'],
    url: 'o-level/spreadsheets/min-max.html'
  },
  {
    id: 's4-007', level: 's4', title: 'COUNT Function in Excel',
    description: 'Count the number of entries in your data range.',
    topic: 'spreadsheets', difficulty: 'beginner', practical: true
