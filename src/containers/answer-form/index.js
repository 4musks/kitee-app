import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import QuestionBox from "../../components/QuestionBox";
import Spinner from "../../components/Spinner";
import CannotAccessForm from "../../components/CannotAccessForm";
import { SubmitButton } from "../../components/CustomButton";
import ThankYouBox from "../../components/ThankYouBox";
import { QUESTION_TYPE } from "../../enums/Questions";
import { validate } from "./helper";
import { isNumberValid } from "../../utils/common";
import { getPublishedForm } from "../../api";
import "./styles.css";

const AnswerFormContainer = (props) => {
  const { isPreviewMode = false } = props;

  const formRef = window.location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);

  const [responseRef, setResponseRef] = useState("");

  const [questions, setQuestions] = useState([]);

  const [shouldShowSubmitButton, setShouldShowSubmitButton] = useState(true);

  const [shouldShowThankYouBlock, setShouldShowThankYouBlock] = useState(false);

  const [shouldShowCannotAccessForm, setShouldShowCannotAccessForm] =
    useState(false);

  // const [customMetadata, setCustomMetadata] = useState({
  //   title: "",
  //   description: "",
  // });

  const validateAnswers = () => {
    const newQuestions = [];

    for (let i = 0; i < questions.length; i += 1) {
      const question = validate(questions[i]);

      newQuestions.push(question);
    }

    setQuestions([...newQuestions]);

    return !newQuestions.some((elem) => !!elem.validationError);
  };

  const handleSubmit = async () => {
    // validate

    if (!validateAnswers()) {
      // setShouldShowSubmitButton(false);
      return;
    }

    if (!isPreviewMode) {
      setIsLoading(true);
      // console.log("submit response");

      // TODO: post response

      // console.log("complete");
      // TODO: post complete event
      setIsLoading(false);
    }

    setShouldShowThankYouBlock(true);
  };

  const handleAnswerChange = async (
    questionId,
    questionType,
    answer,
    optionIndex = null // for multiple_choice
  ) => {
    // console.log(
    //   `handleAnswerChange =>
    // questionId,
    // questionType,
    // answer,
    // optionIndex = null // for multiple_choice
    // `,
    //   {
    //     questionId,
    //     questionType,
    //     answer,
    //     optionIndex,
    //   }
    // );

    const questionIndex = questions.findIndex((elem) => elem.id === questionId);

    const newQuestions = [...questions];

    if (questionType === QUESTION_TYPE.MULTIPLE_CHOICE) {
      const newOptions = [...questions[questionIndex].options];

      newOptions[optionIndex].checked = !newOptions[optionIndex].checked;

      newQuestions[questionIndex].options = [...newOptions];

      const answers = [];

      newOptions.map((elem) => {
        if (elem.checked) {
          answers.push(elem.value);
        }
      });

      newQuestions[questionIndex].answer = [...answers];
    }

    if (questionType === QUESTION_TYPE.NUMBER && !isNumberValid(answer)) {
      return;
    }

    newQuestions[questionIndex].answer = answer;

    setQuestions(newQuestions);
  };

  useEffect(() => {
    setIsLoading(true);

    if (!isPreviewMode) {
      const getPublishedFormHandler = async () => {
        const response = await getPublishedForm({ formRef });

        if (response && response.success && response.data) {
          setQuestions(response.data.questions);
          setResponseRef(nanoid());

          // TODO: post open event
        } else {
          setShouldShowCannotAccessForm(true);
        }
      };

      getPublishedFormHandler();
    } else {
      setQuestions(props.questions);
    }

    setTimeout(() => setIsLoading(false), 1000);

    if (!formRef) {
      setShouldShowCannotAccessForm(true);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="answer-form-root-container">
          {shouldShowCannotAccessForm ? (
            <CannotAccessForm />
          ) : shouldShowThankYouBlock ? (
            <div className="question-box-thank-you-container">
              <ThankYouBox />
            </div>
          ) : (
            <div className="answer-form-root-container">
              <div className="answer-form-container">
                {questions.map((question) => (
                  <QuestionBox
                    key={question.id}
                    id={question.id}
                    type={question.type}
                    number={question.number}
                    isRequired={question.isRequired}
                    questionValue={question.questionValue}
                    descriptionValue={question.descriptionValue}
                    answer={question.answer}
                    answerPlaceholder={question.answerPlaceholder}
                    handleAnswerChange={(value, optionIndex = null) =>
                      handleAnswerChange(
                        question.id,
                        question.type,
                        value,
                        optionIndex
                      )
                    }
                    answerable
                    optionsList={question.options}
                    validationError={question.validationError}
                  />
                ))}

                {shouldShowSubmitButton && (
                  <div className="answer-form-submit-button-container">
                    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

AnswerFormContainer.propTypes = {
  isPreviewMode: PropTypes.bool,
  isMobilePreviewMode: PropTypes.bool,
  questions: PropTypes.array,
};

export default AnswerFormContainer;
