export const QUESTION_TYPE = {
  TEXT: "text",
  STATEMENT: "statement",
  YES_NO: "yes_no",
  DATE: "date",
  NUMBER: "number",
  DROPDOWN: "dropdown",
  EMAIL: "email",
  MULTIPLE_CHOICE: "multiple_choice",
  WEBSITE: "website",
  LINEAR_SCALE: "linear_scale",
  RATING: "rating",
  // PHONE_NUMBER: "phone_number",
};

export const QUESTION_TYPES_OPTIONS = [
  {
    type: QUESTION_TYPE.TEXT,
    name: "Text",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.STATEMENT,
    name: "Statement",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.YES_NO,
    name: "Yes/No",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.DATE,
    name: "Date",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.NUMBER,
    name: "Number",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.DROPDOWN,
    name: "Dropdown",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.EMAIL,
    name: "Email",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    name: "Multiple Choice",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.WEBSITE,
    name: "Website",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.LINEAR_SCALE,
    name: "Linear Scale",
    description: "",
    image: "",
  },
  {
    type: QUESTION_TYPE.RATING,
    name: "Rating",
    description: "",
    image: "",
  },
  // {
  //   type: QUESTION_TYPE.PHONE_NUMBER,
  //   name: "Phone Number",
  //   description: "",
  //   image: "",
  // },
];

export const QUESTION_TYPE_DEFAULTS = [
  {
    type: QUESTION_TYPE.TEXT,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    answerPlaceholder: "Type your answer here...",
    isRequired: false,
    maxCharacters: null,
    answer: "",
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.STATEMENT,
    questionValue: "",
    questionPlaceholder: "Your statement comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    buttonText: "",
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.YES_NO,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    isRequired: false,
    answer: "",
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.DATE,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    isRequired: false,
    answer: null,
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.NUMBER,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    answerPlaceholder: "Type your answer here...",
    isRequired: false,
    min: null,
    max: null,
    answer: "",
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.DROPDOWN,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    isRequired: false,
    options: [],
    answer: "",
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.EMAIL,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    answerPlaceholder: "name@example.com",
    isRequired: false,
    answer: "",
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    isRequired: false,
    multipleSelectedAllowed: false,
    options: [],
    answer: [],
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.WEBSITE,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    answerPlaceholder: "https://",
    isRequired: false,
    answer: "",
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.LINEAR_SCALE,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    isRequired: false,
    answer: "",
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  {
    type: QUESTION_TYPE.RATING,
    questionValue: "",
    questionPlaceholder: "Your question comes here...",
    descriptionValue: "",
    descriptionPlaceholder: "Description (optional)",
    isRequired: false,
    answer: null,
    validationError: null,
    questionOptionsAnchorEl: null,
  },
  // {
  //   type: QUESTION_TYPE.PHONE_NUMBER,
  //   questionValue: "",
  //   questionPlaceholder: "Your question comes here...",
  //   descriptionValue: "",
  //   descriptionPlaceholder: "Description (optional)",
  //   answerPlaceholder: "Type your answer here...",
  //   isRequired: false,
  //   answer: "",
  //   validationError: null,
  //   questionOptionsAnchorEl: null,
  // },
];
