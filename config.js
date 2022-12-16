const BASE_URL = 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001';

export const API = {
  LOGIN : `${BASE_URL}/login`,
  SENTIMENT: `${BASE_URL}/sentiment`,
  UPLOAD: `${BASE_URL}/upload`,
  CHECKNUM: `${BASE_URL}/checkNum`,
  RESET: `${BASE_URL}/Reset`,
  REGISTER: `${BASE_URL}/register`,
  OVERLAP: `${BASE_URL}/overlap`,
  FACE: `${BASE_URL}/face`,
  WRITE: `${BASE_URL}/write`,
  MYDIARY: `${BASE_URL}/myDiary`,
  DIARYINFO: `${BASE_URL}/diaryInfo`,
  DELETE: `${BASE_URL}/diaryDelete`,
  ALBUM: `${BASE_URL}/album`,
  SCORE: `${BASE_URL}/userScore`,
  PIE: `${BASE_URL}/count`,
  BAR: `${BASE_URL}/chart/bar`,
  CONTRIBUTION: `${BASE_URL}/chart/contribution`,
};