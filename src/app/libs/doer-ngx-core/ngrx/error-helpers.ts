const fixEmptyMsg = (msg: string) => msg ? msg + ' ' : '';
const getUnknownErrorMessage = (msg: string) => (e: any) => fixEmptyMsg(msg) + (e['code'] ? ` Код ошибки ${e['code']}` : '');

export const getErrorMessage = (httpErrorMsg: string, unknowErrMsg: string) =>
  getUnknownErrorMessage(unknowErrMsg);
