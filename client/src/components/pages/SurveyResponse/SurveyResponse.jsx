import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


const SurveyResponse = () => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('userName');
  const answer = searchParams.get('answer');
  const occupationName = searchParams.get('occupationName');

  useEffect(() => {
    const sendSurveyResponse = async () => {
      try {
        await axios.post('http://localhost:3000/survey-response', {
          userName: userName,
          answer: answer,
          occupationName: occupationName,
        });
        console.log('Survey response sent');
      } catch (error) {
        console.error('Failed to send survey response:', error);
      }
    };

    if (userName) {
      sendSurveyResponse();
    }
  }, [userName, answer, occupationName]);

  return (
    <div className='h-screen w-screen bg-[#eff8ff] flex items-center justify-center'>
      <div className="text-center px-6 bg-[#f4f4fa] p-5 rounded-lg">
        <h1 className="text-4xl font-bold text-[#090467] mb-4">
          Thank you{userName ? `, ${userName}` : ''}!
        </h1>
        <p className="text-gray-600 text-lg">
          We appreciate your response to the survey.
        </p>
        <p className="text-gray-500 text-md mt-2">
          You may now close this page.
        </p>
      </div>
    </div>

  );
};

export default SurveyResponse;
