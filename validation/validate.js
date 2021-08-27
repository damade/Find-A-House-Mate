const Joi = require("joi");

//VALIDATION
const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .min(6)
      .required()
      .regex(/^([\w]{3,})+\s+([\w\s]{3,})+$/i),

    state: Joi.string().required().valid("Abia", "Adamawa", "Abuja", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
      "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
      "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
      "Zamfara"),
    
    address: Joi.string().required(),

    email: Joi.string().min(6).email().required(),

    password: Joi.string().min(4).required(),

    phoneNumber: Joi.string().min(11).required(),

  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    loginEmail: Joi.string().min(6).email().required(),

    loginPassword: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};

const addHouseOwnerValidation = (data) => {
  const schema = Joi.object({
    gender: Joi.string().required().valid("Male", "Female"),
    tribe: Joi.string().required().valid("Yoruba", "Igbo","Hausa","Others"),
    religion: Joi.string().required().valid("Christianity", "Islamic","Others"),
    duration: Joi.string().required().valid("Three Months", "Six Months", "A Year", "Two Years"),
    music: Joi.string().required().valid("Afro beat","Pop","Reggae","Others"),
    personality: Joi.string().required().valid("Introvert","Extrovert","Others"),
    state: Joi.string().required().valid("Abia", "Adamawa", "Abuja", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
      "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
      "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
      "Zamfara"),
    comment: Joi.string().allow(""),
  });
  return schema.validate(data);
};

const addHouseFinderValidation = (data) => {
  const schema = Joi.object({
    genderf: Joi.string().required().valid("Male", "Female"),
    tribef: Joi.string().required().valid("Yoruba", "Igbo","Hausa","Others"),
    religionf: Joi.string().required().valid("Christianity", "Islamic","Others"),
    durationf: Joi.string().required().valid("Three Months", "Six Months", "A Year", "Two Years"),
    musicf: Joi.string().required().valid("Afro beat","Pop","Reggae","Others"),
    personalityf: Joi.string().required().valid("Introvert","Extrovert","Others"),
    statef: Joi.string().required().valid("Abia", "Adamawa", "Abuja", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
      "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
      "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
      "Zamfara"),
    commentf: Joi.string().allow(""),
  });
  return schema.validate(data);
};

const houseInfoValidation = (data) => {
  const schema = Joi.object({
    address: Joi.string().required().trim(),
    houseType: Joi.string().required().valid("Bungalow", "Duplex","Room and Parlour","One Bedroom Flat",
    "Two Bedroom Flat","Three Bedroom Flat"),
    description: Joi.string().required().trim(),
  });
  return schema.validate(data);
};

const stateValidation = (data) => {
  const schema = Joi.object({
    state: Joi.string().required().valid("Abia", "Adamawa", "Abuja", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
      "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
      "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
      "Zamfara"),
  });
  return schema.validate(data);
};



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addHouseOwnerValidation = addHouseOwnerValidation;
module.exports.addHouseFinderValidation = addHouseFinderValidation;
module.exports.houseInfoValidation = houseInfoValidation;
module.exports.stateValidation = stateValidation;